import { headers } from 'next/headers'
import type { Metadata } from 'next'
import {
  CATEGORY_EDITS,
  ROUTE_CATEGORIES,
  ROUTE_PRODUCT_SLUGS,
  getProducts,
  localProduct,
  pathForProduct,
  productImage,
  productsForCategory,
  type Locale,
} from './storefront-data'

function localeFromHost(host: string | null): Locale {
  return host?.endsWith('.nl') ? 'nl' : 'en'
}

function siteUrl(locale: Locale) {
  return locale === 'nl' ? 'https://luardani.nl' : 'https://luardani.com'
}

export async function storefrontMetadata(slug?: string[]): Promise<Metadata> {
  const requestHeaders = await headers()
  const locale = localeFromHost(requestHeaders.get('host'))
  const origin = siteUrl(locale)
  const categoryKey = ROUTE_CATEGORIES[slug?.[0] || ''] || 'bags'
  const category = CATEGORY_EDITS.find((item) => item.key === categoryKey) || CATEGORY_EDITS[0]
  const routeProductSlug = slug?.[1] ? ROUTE_PRODUCT_SLUGS[slug[1]] || slug[1] : null

  if (routeProductSlug) {
    const products = productsForCategory(await getProducts(), categoryKey)
    const product = products.find((item) => item.slug === routeProductSlug)
    if (product) {
      const displayProduct = localProduct(product, locale)
      const image = productImage(displayProduct)
      const title = `${displayProduct.name} | Luardani`
      const description = displayProduct.description || (locale === 'nl' ? 'Premium no-size accessoire van Luardani.' : 'Premium no-size accessory by Luardani.')
      const url = `${origin}${pathForProduct(product)}`
      const imageUrl = image?.startsWith('/') ? `${origin}${image}` : image

      return {
        title,
        description,
        alternates: {
          canonical: url,
        },
        openGraph: {
          title,
          description,
          url,
          siteName: 'Luardani',
          images: imageUrl ? [{ url: imageUrl, alt: displayProduct.name }] : undefined,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: imageUrl ? [imageUrl] : undefined,
        },
      }
    }
  }

  const isHome = !slug?.[0]
  const title = isHome
    ? locale === 'nl'
      ? 'Luardani | Premium accessoires voor vrouwen'
      : "Luardani | Premium Women's Accessories"
    : `${locale === 'nl' ? category.labelNl : category.label} | Luardani`
  const description = isHome
    ? locale === 'nl'
      ? 'Premium no-size accessoires voor vrouwen: lederwaren, zijde, sieraden en reisaccessoires met rustige stijl.'
      : 'Premium no-size accessories for women: leather goods, silk pieces, jewelry, and travel essentials with a quiet luxury feel.'
    : locale === 'nl'
    ? category.textNl
    : category.text
  const path = slug?.[0] ? `/${slug[0]}` : '/'

  return {
    title,
    description,
    alternates: {
      canonical: `${origin}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${origin}${path}`,
      siteName: 'Luardani',
      images: [{ url: `${origin}/assets/luardani/hero-tote-clear.jpg`, alt: 'Luardani' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${origin}/assets/luardani/hero-tote-clear.jpg`],
    },
  }
}

