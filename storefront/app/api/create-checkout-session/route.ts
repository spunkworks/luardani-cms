import Stripe from 'stripe'

const CMS_URL = process.env.PAYLOAD_API_URL || 'https://luardani-cms.vercel.app'
const ALLOWED_ORIGINS = new Set([
  'https://luardani.com',
  'https://www.luardani.com',
  'https://luardani.nl',
  'https://www.luardani.nl',
  'http://localhost:3000',
])

function normalizeCart(items: unknown) {
  if (!Array.isArray(items)) return []
  return items
    .map((item) => {
      const entry = item as { id?: unknown; quantity?: unknown }
      return {
        id: Number(entry.id),
        quantity: Math.max(1, Math.min(Number(entry.quantity) || 1, 99)),
      }
    })
    .filter((item) => Number.isInteger(item.id))
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ message: 'Stripe is not configured yet.' }, { status: 503 })
  }

  const body = await request.json().catch(() => ({}))
  const cart = normalizeCart((body as { items?: unknown }).items)
  if (!cart.length) {
    return Response.json({ message: 'Cart is empty.' }, { status: 400 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

    const lineItems = cart.map((item) => {
      const product = products.find((entry: { id: number }) => Number(entry.id) === item.id)
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

    const requestOrigin = request.headers.get('origin') || 'https://luardani.com'
    const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : 'https://luardani.com'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
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

    return Response.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed.'
    return Response.json({ message }, { status: 400 })
  }
}
