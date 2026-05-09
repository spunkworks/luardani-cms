import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    defaultColumns: ['name', 'status', 'price', 'inventory'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'productType',
      type: 'select',
      defaultValue: 'ready-to-ship',
      options: [
        { label: 'Ready to ship', value: 'ready-to-ship' },
        { label: 'Patron pre-order', value: 'pre-order' },
        { label: 'Archive sample', value: 'archive-sample' },
      ],
      required: true,
    },
    {
      name: 'saleType',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'On-Demand', value: 'on-demand' },
      ],
      required: true,
      admin: {
        description: 'Standard products can be purchased. On-Demand products collect patron interest before production.',
      },
    },
    {
      name: 'interestCount',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Number of patrons who have expressed interest.',
      },
    },
    {
      name: 'threshold',
      type: 'number',
      defaultValue: 50,
      min: 1,
      admin: {
        description: 'Patron interest threshold required before production.',
      },
    },
    {
      name: 'materialStory',
      type: 'richText',
      admin: {
        description: 'Editorial sourcing story: Morocco, Turkey, Anatolian Silk, Aegean Cotton, Mediterranean Heritage.',
      },
    },
    {
      name: 'material',
      type: 'text',
      admin: {
        description: 'Primary material note shown on product detail.',
      },
    },
    {
      name: 'dimensions',
      type: 'text',
      admin: {
        description: 'Short size/dimensions note.',
      },
    },
    {
      name: 'craftNote',
      type: 'textarea',
      admin: {
        description: 'Maison-style product detail copy.',
      },
    },
    {
      name: 'care',
      type: 'textarea',
      admin: {
        description: 'Care guidance shown in product detail.',
      },
    },
    {
      name: 'editionSize',
      type: 'text',
      admin: {
        description: 'Limited edition or batch note.',
      },
    },
    {
      name: 'productionCommitment',
      type: 'number',
      min: 0,
      max: 100,
      admin: {
        description: 'Progress percentage for demand-driven pieces.',
      },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Price in cents, e.g. 18900 for EUR 189.',
      },
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
    {
      name: 'inventory',
      type: 'number',
      defaultValue: 0,
      min: 0,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'externalImage',
      type: 'text',
      admin: {
        description: 'Optional image URL used until a media upload is added.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
        description: 'Optional Stripe Price ID. If empty, checkout uses inline price data.',
      },
    },
  ],
}
