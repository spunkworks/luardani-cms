import type { MetadataRoute } from 'next'
import {
  CATEGORY_EDITS,
  getProducts,
  pathForCategory,
  pathForProduct,
  productsForCategory,
} from './lib/storefront-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const origins = ['https://luardani.com', 'https://luardani.nl']
  const paths = new Set<string>(['/'])

  for (const category of CATEGORY_EDITS) {
    paths.add(pathForCategory(category.key))
    for (const product of productsForCategory(products, category.key)) {
      paths.add(pathForProduct(product))
    }
  }

  return origins.flatMap((origin) =>
    [...paths].map((path) => ({
      url: `${origin}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '/' ? 'weekly' : 'daily',
      priority: path === '/' ? 1 : path.split('/').length > 2 ? 0.8 : 0.9,
    })),
  )
}
