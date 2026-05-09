import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    defaultColumns: ['customerEmail', 'status', 'total', 'createdAt'],
    useAsTitle: 'customerEmail',
  },
  access: {
    create: () => false,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Refunded', value: 'refunded' },
      ],
      required: true,
    },
    {
      name: 'fulfillmentStatus',
      type: 'select',
      defaultValue: 'unfulfilled',
      options: [
        { label: 'Unfulfilled', value: 'unfulfilled' },
        { label: 'Processing', value: 'processing' },
        { label: 'Fulfilled', value: 'fulfilled' },
        { label: 'Canceled', value: 'canceled' },
      ],
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
    },
    {
      name: 'stripeCheckoutSessionId',
      type: 'text',
      unique: true,
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
    },
    {
      name: 'shippingAddress',
      type: 'json',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          required: true,
        },
        {
          name: 'unitPrice',
          type: 'number',
          min: 0,
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'eur',
      options: [{ label: 'EUR', value: 'eur' }],
      required: true,
    },
  ],
}
