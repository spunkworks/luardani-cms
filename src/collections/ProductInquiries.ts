import type { CollectionConfig } from 'payload'

export const ProductInquiries: CollectionConfig = {
  slug: 'product-inquiries',
  admin: {
    defaultColumns: ['product', 'email', 'status', 'createdAt'],
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'luardani-storefront',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Contacted', value: 'contacted' },
      ],
      required: true,
    },
  ],
}
