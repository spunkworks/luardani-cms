import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: ['https://luardani.com/sitemap.xml', 'https://luardani.nl/sitemap.xml'],
  }
}
