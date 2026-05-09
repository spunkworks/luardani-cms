import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

type CartItem = {
  id: number
  quantity: number
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

const parseCart = (value: unknown): CartItem[] => {
  if (typeof value !== 'string') return []

  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((item) => ({
        id: Number(item.id),
        quantity: Math.max(1, Number(item.quantity) || 1),
      }))
      .filter((item) => Number.isInteger(item.id))
  } catch {
    return []
  }
}

const getStringId = (value: unknown) => {
  if (!value) return undefined
  if (typeof value === 'string') return value
  if (typeof value === 'object' && 'id' in value && typeof value.id === 'string') return value.id
  return undefined
}

async function markOrderCanceled(session: Stripe.Checkout.Session) {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'orders',
    limit: 1,
    overrideAccess: true,
    where: {
      stripeCheckoutSessionId: {
        equals: session.id,
      },
    },
  })

  if (existing.totalDocs === 0) return

  await payload.update({
    collection: 'orders',
    id: existing.docs[0].id,
    overrideAccess: true,
    data: {
      status: 'canceled',
      fulfillmentStatus: 'canceled',
    },
  })
}

async function fulfillCheckout(sessionId: string) {
  if (!stripe) throw new Error('Stripe is not configured')

  const payload = await getPayload({ config })
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  })

  if (session.payment_status === 'unpaid') return

  const existing = await payload.find({
    collection: 'orders',
    limit: 1,
    overrideAccess: true,
    where: {
      stripeCheckoutSessionId: {
        equals: session.id,
      },
    },
  })

  const cart = parseCart(session.metadata?.cart)
  const orderItems = []
  let total = 0

  for (const item of cart) {
    const product = await payload.findByID({
      collection: 'products',
      id: item.id,
      overrideAccess: true,
    })

    if (!product) continue

    orderItems.push({
      product: product.id,
      name: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
    })
    total += product.price * item.quantity
  }

  const orderData = {
    status: 'paid' as const,
    fulfillmentStatus: 'processing' as const,
    customerEmail: session.customer_details?.email || session.customer_email || undefined,
    stripeCheckoutSessionId: session.id,
    stripeCustomerId: getStringId(session.customer),
    stripePaymentIntentId: getStringId(session.payment_intent),
    shippingAddress: session.customer_details?.address
      ? { ...session.customer_details.address }
      : undefined,
    items: orderItems,
    total: session.amount_total || total,
    currency: 'eur' as const,
  }

  const alreadyPaid = existing.docs[0]?.status === 'paid'

  if (existing.totalDocs > 0) {
    await payload.update({
      collection: 'orders',
      id: existing.docs[0].id,
      overrideAccess: true,
      data: orderData,
    })
  } else {
    await payload.create({
      collection: 'orders',
      overrideAccess: true,
      data: orderData,
    })
  }

  if (alreadyPaid) return

  for (const item of cart) {
    const product = await payload.findByID({
      collection: 'products',
      id: item.id,
      overrideAccess: true,
    })

    if (!product) continue

    await payload.update({
      collection: 'products',
      id: product.id,
      overrideAccess: true,
      data: {
        inventory: Math.max(0, (product.inventory || 0) - item.quantity),
      },
    })
  }
}

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ message: 'Stripe webhook is not configured.' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ message: 'Missing Stripe signature.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook payload.'
    return NextResponse.json({ message }, { status: 400 })
  }

  try {
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object as Stripe.Checkout.Session
      await fulfillCheckout(session.id)
    }

    if (
      event.type === 'checkout.session.expired' ||
      event.type === 'checkout.session.async_payment_failed'
    ) {
      const session = event.data.object as Stripe.Checkout.Session
      await markOrderCanceled(session)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook handling failed.'
    return NextResponse.json({ message }, { status: 500 })
  }
}
