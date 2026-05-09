import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Maison Luardani',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'A Moroccan family Maison for the luxury nomad.',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      defaultValue:
        'Luardani bridges Moroccan heritage and modern minimalism through no-size essentials: leather goods, Anatolian Silk, Aegean Cotton, sculptural jewellery, and objects made with time rather than volume.',
      required: true,
    },
    {
      name: 'story',
      type: 'richText',
      required: true,
    },
    {
      name: 'sourcingTitle',
      type: 'text',
      defaultValue: 'The Modern Silk Road',
      required: true,
    },
    {
      name: 'sourcingCopy',
      type: 'textarea',
      defaultValue:
        'Our production between Morocco and Turkey is a strategic choice for quality: Morocco for leather, craft, and family heritage; Turkey for Anatolian Silk, Aegean Cotton, and refined textile finishing.',
      required: true,
    },
  ],
}
