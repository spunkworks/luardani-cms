const Stripe = require('stripe')

const CMS_URL = process.env.PAYLOAD_API_URL || 'https://luardani-cms.vercel.app'
const ALLOWED_ORIGINS = new Set([
  'https://luardani.com',
  'https://www.luardani.com',
  'https://luardani.nl',
  'https://www.luardani.nl',
  'http://localhost:3000',
])

function normalizeCart(items) {
  if (!Array.isArray(items)) return []
  return items
    .map((item) => ({
      id: Number(item.id),
      quantity: Math.max(1, Math.min(Number(item.quantity) || 1, 99)),
    }))
    .filter((item) => Number.isInteger(item.id))
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ message: 'Stripe is not configured yet.' })
  }

  const cart = normalizeCart(req.body && req.body.items)
  if (!cart.length) {
    return res.status(400).json({ message: 'Cart is empty.' })
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const ids = cart.map((item) => item.id)
    const params = new URLSearchParams()
    params.set('limit', '100')
    params.set('where[id][in]', ids.join(','))
    params.set('where[status][equals]', 'published')

    const cmsRes = await fetch(`${CMS_URL}/api/products?${params.toString()}`)
    if (!cmsRes.ok) throw new Error('Could not load products from CMS.')
    const data = await cmsRes.json()
    const products = data.docs || []

    const line_items = cart.map((item) => {
      const product = products.find((entry) => Number(entry.id) === item.id)
      if (!product) throw new Error('A product in your cart is no longer available.')
      if (product.saleType === 'on-demand') {
        throw new Error(`${product.name} is on-demand. Please express interest instead of checking out.`)
      }
      if (product.inventory < item.quantity) throw new Error(`${product.name} has limited stock.`)

      if (product.stripePriceId) {
        return {
          price: product.stripePriceId,
          quantity: item.quantity,
        }
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: product.currency || 'eur',
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description: product.description,
            images: product.externalImage ? [product.externalImage] : undefined,
            metadata: {
              payloadProductId: String(product.id),
            },
          },
        },
      }
    })

    const requestOrigin = req.headers.origin || 'https://luardani.com'
    const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : 'https://luardani.com'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel.html`,
      customer_creation: 'always',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['NL', 'BE', 'DE', 'FR', 'IT', 'ES', 'PT', 'IE', 'LU', 'AT'],
      },
      payment_intent_data: {
        metadata: {
          source: 'luardani-storefront',
          cart: JSON.stringify(cart),
        },
      },
      metadata: {
        source: 'luardani-storefront',
        cart: JSON.stringify(cart),
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Checkout failed.' })
  }
}
