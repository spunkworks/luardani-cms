export type Locale = 'en' | 'nl'
export type CategoryKey = 'bags' | 'silk' | 'jewelry' | 'gifts' | 'travel' | 'drops'

export type Product = {
  id: number
  name: string
  slug: string
  description?: string
  price?: number
  currency?: string
  inventory?: number
  saleType?: string
  productType?: string
  interestCount?: number
  threshold?: number
  externalImage?: string
  material?: string
  dimensions?: string
  care?: string
  editionSize?: string
  image?: { url?: string }
}

export const CMS_URL = 'https://luardani-cms.vercel.app'

export const CATEGORY_EDITS = [
  {
    key: 'bags',
    label: 'Everyday Bags',
    labelNl: 'Tassen voor elke dag',
    text: 'Leather pieces for workdays, dinners, and errands.',
    textNl: 'Leren tassen en pouches voor werk, diner en dagelijks gebruik.',
    image: 'assets/luardani/marrakech-tote.jpg',
  },
  {
    key: 'silk',
    label: 'Silk Layers',
    labelNl: 'Zijden lagen',
    text: 'Anatolian Silk that dresses up simple outfits.',
    textNl: 'Anatolische zijde die eenvoudige outfits mooier maakt.',
    image: 'assets/luardani/noor-silk-square.jpg',
  },
  {
    key: 'jewelry',
    label: 'Daily Jewelry',
    labelNl: 'Sieraden voor elke dag',
    text: 'Warm gold-toned details for every day.',
    textNl: 'Warme goudkleurige details voor elke dag.',
    image: 'assets/luardani/amira-hoops.jpg',
  },
  {
    key: 'gifts',
    label: 'Gifts',
    labelNl: 'Cadeaus',
    text: 'No-size pieces that are easy to give.',
    textNl: 'No-size accessoires die makkelijk cadeau te geven zijn.',
    image: 'assets/luardani/medina-slipper.jpg',
  },
  {
    key: 'travel',
    label: 'Travel & Tech',
    labelNl: 'Reis & tech',
    text: 'Organised pieces for movement and daily order.',
    textNl: 'Slimme accessoires voor onderweg, werk en reizen.',
    image: 'assets/luardani/tadelakt-pouch.jpg',
  },
  {
    key: 'drops',
    label: 'Next Drops',
    labelNl: 'Volgende productrondes',
    text: 'Concepts customers can help move forward.',
    textNl: 'Concepten die we maken bij voldoende interesse.',
    image: 'assets/luardani/lalla-ring-set.jpg',
  },
] as const

export const CATEGORY_ROUTES: Record<CategoryKey, string> = {
  bags: 'bags',
  silk: 'silk',
  jewelry: 'jewelry',
  gifts: 'gifts',
  travel: 'travel',
  drops: 'drops',
}

export const ROUTE_CATEGORIES = Object.fromEntries(
  Object.entries(CATEGORY_ROUTES).map(([key, value]) => [value, key]),
) as Record<string, CategoryKey>

export const CATEGORY_PRODUCT_SLUGS: Record<CategoryKey, string[]> = {
  bags: ['toscana-handbag', 'riad-mini-bag', 'tadelakt-pouch'],
  silk: ['silk-scarf', 'kasbah-silk-wrap'],
  jewelry: ['zayna-cuff', 'amira-hoops', 'lalla-ring-set'],
  gifts: ['leather-cardholder', 'silk-scarf', 'amira-hoops', 'nomad-key-case'],
  travel: ['tadelakt-pouch', 'nomad-key-case', 'catania-sunglasses', 'leather-cardholder'],
  drops: ['toscana-handbag', 'leather-slippers', 'catania-sunglasses', 'kasbah-silk-wrap', 'lalla-ring-set'],
}

export const PRODUCT_ROUTE_SLUGS: Record<string, string> = {
  'leather-cardholder': 'safi-cardholder',
  'toscana-handbag': 'marrakech-tote',
  'silk-scarf': 'noor-silk-square',
  'leather-slippers': 'medina-slipper',
  'catania-sunglasses': 'atlas-sunglasses',
  'riad-mini-bag': 'riad-mini-bag',
  'tadelakt-pouch': 'tadelakt-pouch',
  'zayna-cuff': 'zayna-cuff',
  'amira-hoops': 'amira-hoops',
  'lalla-ring-set': 'lalla-ring-set',
  'kasbah-silk-wrap': 'kasbah-silk-wrap',
  'nomad-key-case': 'nomad-key-case',
}

export const ROUTE_PRODUCT_SLUGS = Object.fromEntries(
  Object.entries(PRODUCT_ROUTE_SLUGS).map(([productSlug, routeSlug]) => [routeSlug, productSlug]),
) as Record<string, string>

export const PRODUCT_ASSETS: Record<string, string[]> = {
  'leather-cardholder': ['assets/luardani/safi-cardholder.jpg', 'assets/luardani/safi-cardholder-detail.jpg'],
  'toscana-handbag': ['assets/luardani/marrakech-tote.jpg', 'assets/luardani/marrakech-tote-detail.jpg'],
  'silk-scarf': ['assets/luardani/noor-silk-square.jpg', 'assets/luardani/noor-silk-square-detail.jpg'],
  'leather-slippers': ['assets/luardani/medina-slipper.jpg', 'assets/luardani/medina-slipper-detail.jpg'],
  'catania-sunglasses': ['assets/luardani/atlas-sunglass.jpg', 'assets/luardani/atlas-sunglass-detail.jpg'],
  'riad-mini-bag': ['assets/luardani/riad-mini-bag.jpg', 'assets/luardani/riad-mini-bag-detail.jpg'],
  'tadelakt-pouch': ['assets/luardani/tadelakt-pouch.jpg', 'assets/luardani/tadelakt-pouch-detail.jpg'],
  'zayna-cuff': ['assets/luardani/zayna-cuff.jpg', 'assets/luardani/zayna-cuff-detail.jpg'],
  'amira-hoops': ['assets/luardani/amira-hoops.jpg', 'assets/luardani/amira-hoops-detail.jpg'],
  'lalla-ring-set': ['assets/luardani/lalla-ring-set.jpg', 'assets/luardani/lalla-ring-set-detail.jpg'],
  'kasbah-silk-wrap': ['assets/luardani/kasbah-silk-wrap.jpg', 'assets/luardani/kasbah-silk-wrap-detail.jpg'],
  'nomad-key-case': ['assets/luardani/nomad-key-case.jpg', 'assets/luardani/nomad-key-case-detail.jpg'],
}

export const PRODUCT_NL: Record<string, Partial<Product>> = {
  'leather-cardholder': {
    name: 'De Safi Cardholder',
    description: "Een compacte kaarthouder van Marokkaans afgewerkt generfd leer, gemaakt voor dagelijks gebruik zonder zichtbare logo's.",
  },
  'toscana-handbag': {
    name: 'De Marrakech Tote',
    description: 'Een gestructureerde leren tote van Marokkaans leer, gekozen om haar vorm, dagelijks gemak en warme uitstraling.',
  },
  'silk-scarf': {
    name: 'De Noor Zijden Sjaal',
    description: 'Een vierkante sjaal van Anatolische zijde met een zachte valling, ontworpen voor reizen, diners en dagelijks gebruik.',
  },
  'leather-slippers': {
    name: 'De Medina Slipper',
    description: 'Zachte leren slippers van Marokkaans leer, gemaakt voor thuis, op reis en rustige momenten tussendoor.',
  },
  'catania-sunglasses': {
    name: 'De Atlas Zonnebril',
    description: 'Een moderne zonnebril met warme lenzen, gemaakt als no-size accessoire voor dagelijks gebruik en reizen.',
  },
  'riad-mini-bag': {
    name: 'De Riad Mini Bag',
    description: 'Een compacte Marokkaanse leren avondtas met een strak handvat en een rustige, architecturale vorm.',
  },
  'tadelakt-pouch': {
    name: 'De Tadelakt Pouch',
    description: 'Een zachte Marokkaanse leren pouch voor telefoon, sleutels, kaarten en de kleine objecten van de dag.',
  },
  'zayna-cuff': {
    name: 'De Zayna Cuff',
    description: 'Een sculpturale goudkleurige cuff met zachte randen, gemaakt als rustig accent bij een minimalistische outfit.',
  },
  'amira-hoops': {
    name: 'De Amira Hoops',
    description: 'Fijne goudkleurige hoops met een rustige ronde lijn, ontworpen voor elke dag.',
  },
  'lalla-ring-set': {
    name: 'De Lalla Ring Set',
    description: 'Een set slanke ringen in warme goudtinten, samen of los te dragen.',
  },
  'kasbah-silk-wrap': {
    name: 'De Kasbah Zijden Wrap',
    description: 'Een ruime wrap van Anatolische zijde voor reizen, avonden buiten en momenten waarop je iets zachts bij je wilt hebben.',
  },
  'nomad-key-case': {
    name: 'De Nomad Key Case',
    description: 'Een kleine key case van Marokkaans generfd leer die sleutels en kleine essentials netjes bij elkaar houdt.',
  },
}

export const PRODUCT_NL_DETAILS: Record<string, Partial<Product>> = {
  'leather-cardholder': { material: 'Marokkaans generfd leer met zachte satijnglans', dimensions: '10 x 7 cm, zes kaartsleuven', editionSize: 'Kleine oplage', care: 'Afnemen met een zachte doek' },
  'toscana-handbag': { material: 'Marokkaans volnerfleer met warm goudkleurig beslag', dimensions: '32 x 24 x 12 cm, met uitneembare pouch', editionSize: 'Kleine oplage van 24', care: 'Droog bewaren en de tas opvullen wanneer je haar niet gebruikt' },
  'silk-scarf': { material: 'Anatolische zijde met zachte twillstructuur', dimensions: '90 x 90 cm', editionSize: 'Seizoenseditie', care: 'Chemisch reinigen aanbevolen' },
  'leather-slippers': { material: 'Zacht Marokkaans leer', dimensions: 'Instapmodel met open hiel', editionSize: 'Oplage op basis van interesse', care: 'Droog houden en voorzichtig reinigen' },
  'catania-sunglasses': { material: 'Acetaatlook montuur met warme lenzen', dimensions: 'Medium frame, no-size accessoire', editionSize: 'Kleine oplage', care: 'Bewaren in etui' },
  'riad-mini-bag': { material: 'Marokkaans leer met gestructureerde finish', dimensions: '18 x 12 x 6 cm', editionSize: 'Kleine oplage', care: 'Afnemen met een droge doek' },
  'tadelakt-pouch': { material: 'Zacht Marokkaans leer', dimensions: '20 x 13 cm', editionSize: 'Doorlopende kleine oplage', care: 'Niet langdurig blootstellen aan vocht' },
  'zayna-cuff': { material: 'Goudkleurige finish op gepolijst metaal', dimensions: 'Open cuff, licht verstelbaar', editionSize: 'Kleine oplage', care: 'Contact met parfum en water vermijden' },
  'amira-hoops': { material: 'Goudkleurige finish op licht metaal', dimensions: 'Diameter 24 mm', editionSize: 'Kleine oplage', care: 'Droog bewaren' },
  'lalla-ring-set': { material: 'Warme goudkleurige finish', dimensions: 'Set van drie ringen', editionSize: 'Conceptoplage', care: 'Afdoen bij water en sporten' },
  'kasbah-silk-wrap': { material: 'Anatolische zijde met vloeiende valling', dimensions: '180 x 65 cm', editionSize: 'Oplage op basis van interesse', care: 'Chemisch reinigen aanbevolen' },
  'nomad-key-case': { material: 'Marokkaans generfd leer', dimensions: '10 x 6 cm', editionSize: 'Kleine oplage', care: 'Afnemen met een zachte doek' },
}

export const LABELS = {
  en: {
    navLegacy: 'Legacy',
    navCollection: 'Collection',
    navPhilosophy: 'Philosophy',
    cart: 'Cart',
    announcement: 'Luardani - premium no-size accessories for women',
    heroTitle: 'Premium accessories for everyday style.',
    heroTagline: 'No-size leather goods, silk pieces, jewelry, and travel essentials for women who want calm, polished pieces without logo noise.',
    shopCollection: 'Shop the collection',
    roots: 'Our roots',
    proofOne: 'No sizing stress',
    proofTwo: 'Gift friendly',
    proofThree: 'Small-batch mindset',
    categories: 'Shop by category',
    browseCollection: 'Shop the edit',
    collectionLabel: 'The Collection',
    productsInCategory: 'pieces in this category',
    productInCategory: 'piece in this category',
    ready: 'Ready to ship',
    preorder: 'Pre-order',
    conceptSample: 'Concept',
    noSizeEdit: 'No-size edit',
    onDemand: 'Register interest',
    available: 'available',
    soldOut: 'Sold out',
    details: 'Details',
    add: 'Add',
    joinRun: 'Register interest',
    production: 'Production interest',
  },
  nl: {
    navLegacy: 'Roots',
    navCollection: 'Collectie',
    navPhilosophy: 'Filosofie',
    cart: 'Winkelmand',
    announcement: 'Luardani - premium no-size accessoires voor vrouwen',
    heroTitle: 'Premium accessoires voor elke dag.',
    heroTagline: 'No-size lederwaren, zijde, sieraden en reisaccessoires voor vrouwen die houden van rustige stijl, mooie materialen en dagelijks gemak.',
    shopCollection: 'Bekijk de collectie',
    roots: 'Onze roots',
    proofOne: 'Geen maatstress',
    proofTwo: 'Cadeauwaardig',
    proofThree: 'Kleine oplages',
    categories: 'Categorieën',
    browseCollection: 'Bekijk de collectie',
    collectionLabel: 'De collectie',
    productsInCategory: 'producten in deze categorie',
    productInCategory: 'product in deze categorie',
    ready: 'Direct te koop',
    preorder: 'Pre-order',
    conceptSample: 'Concept',
    noSizeEdit: 'No-size accessoire',
    onDemand: 'Interesse achterlaten',
    available: 'beschikbaar',
    soldOut: 'Uitverkocht',
    details: 'Details',
    add: 'Toevoegen',
    joinRun: 'Laat interesse achter',
    production: 'Interesse voor productie',
  },
} as const

export async function getProducts() {
  try {
    const response = await fetch(`${CMS_URL}/api/products?where[status][equals]=published&limit=100&sort=createdAt`, {
      next: { revalidate: 60 },
    })
    if (!response.ok) throw new Error('CMS unavailable')
    const data = await response.json()
    return (data.docs || []) as Product[]
  } catch {
    return []
  }
}

export function localProduct(product: Product, locale: Locale) {
  if (locale !== 'nl') return product
  return { ...product, ...(PRODUCT_NL[product.slug] || {}), ...(PRODUCT_NL_DETAILS[product.slug] || {}) }
}

export function productImage(product: Product) {
  const local = PRODUCT_ASSETS[product.slug]?.[0]
  const image = local || (product.image?.url ? `${CMS_URL}${product.image.url}` : product.externalImage)
  if (image?.startsWith('assets/')) return `/${image}`
  return image || ''
}

export function productTypeLabel(product: Product, locale: Locale) {
  const labels = LABELS[locale]
  return ({
    'ready-to-ship': labels.ready,
    'pre-order': labels.preorder,
    'archive-sample': labels.conceptSample,
  } as Record<string, string>)[product.productType || ''] || labels.noSizeEdit
}

export function isOnDemand(product: Product) {
  return product.saleType === 'on-demand'
}

export function productionProgress(product: Product) {
  const interest = Number(product.interestCount)
  const threshold = Number(product.threshold)
  if (Number.isFinite(interest) && Number.isFinite(threshold) && threshold > 0) {
    return Math.min(100, Math.max(1, Math.round((interest / threshold) * 100)))
  }
  return Math.min(88, Math.max(34, 72 - (Number(product.inventory) || 0)))
}

export function formatMoney(amount = 0, currency = 'eur', locale: Locale) {
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', { style: 'currency', currency }).format(amount / 100)
}

export function productsForCategory(products: Product[], key: CategoryKey) {
  const slugs = CATEGORY_PRODUCT_SLUGS[key] || []
  return products.filter((product) => slugs.includes(product.slug))
}

export function categoryForProduct(product: Product) {
  return CATEGORY_EDITS.find((category) => CATEGORY_PRODUCT_SLUGS[category.key].includes(product.slug))
}

export function pathForCategory(key: CategoryKey) {
  return `/${CATEGORY_ROUTES[key] || CATEGORY_ROUTES.bags}`
}

export function pathForProduct(product: Product) {
  const category = categoryForProduct(product)
  return `${pathForCategory(category?.key || 'bags')}/${PRODUCT_ROUTE_SLUGS[product.slug] || product.slug}`
}
