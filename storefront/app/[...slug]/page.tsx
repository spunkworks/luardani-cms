import { StorefrontPage } from '../storefront-page'
import { storefrontMetadata } from '../lib/seo'

type Props = {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return storefrontMetadata(slug)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <StorefrontPage slug={slug} />
}
