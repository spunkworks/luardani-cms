const CMS_URL = 'https://luardani-cms.vercel.app'
const LOCALE = window.location.hostname.endsWith('.nl') || new URLSearchParams(window.location.search).get('lang') === 'nl' ? 'nl' : 'en'
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Leather Cardholder',
    slug: 'leather-cardholder',
    description: 'A compact no-size essential in grained leather, made for daily movement and quiet ceremony.',
    price: 18900,
    currency: 'eur',
    inventory: 20,
    externalImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    alt: 'Luxury leather cardholder',
  },
  {
    id: 2,
    name: 'Leather Tote',
    slug: 'toscana-handbag',
    description: 'A structured full-grain leather tote selected for proportion, utility, and daily presence.',
    price: 34900,
    currency: 'eur',
    inventory: 12,
    externalImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    alt: 'Brown leather tote bag',
  },
]

let products = []
let cart = JSON.parse(localStorage.getItem('luardani-cart') || '[]')
let interestLog = JSON.parse(localStorage.getItem('luardani-interest') || '{}')
let selectedCategoryKey = 'bags'
let pendingProductSlug = null
const SHARE_URL = LOCALE === 'nl' ? 'https://luardani.nl/?ref=friend' : 'https://luardani.com/?ref=friend'
const SHARE_TEXT = LOCALE === 'nl'
  ? 'Luardani - premium no-size accessoires voor vrouwen. Kijk mee welke kleine oplage als volgende verschijnt.'
  : 'Luardani - premium no-size accessories for women. Help choose the next small-batch drop.'

const COPY = {
  en: {
    ready: 'Ready to ship',
    preorder: 'Pre-order',
    conceptSample: 'Concept',
    noSizeEdit: 'No-size edit',
    production: 'Production interest',
    onDemand: 'Register interest',
    available: 'available',
    soldOut: 'Sold out',
    details: 'Details',
    add: 'Add',
    joinRun: 'Register interest',
    maison: 'Luardani',
    shareLabel: 'Share',
    sharePiece: 'Share this piece',
    emailLabel: 'Email',
    inquiryNote: 'Note',
    inquiryPlaceholder: 'Optional: tell us why this piece fits your wardrobe',
    expressInterest: 'Register interest',
    close: 'Close',
    material: 'Material',
    dimensions: 'Dimensions',
    edition: 'Edition',
    care: 'Care',
    selectedPiece: 'piece in this category',
    selectedPieces: 'pieces in this category',
  },
  nl: {
    title: 'Luardani - Premium accessoires voor vrouwen',
    description: 'Luardani maakt premium no-size accessoires voor vrouwen: lederwaren, zijde, sieraden en reisaccessoires, geïnspireerd door de Marokkaanse familienaam van Fatima.',
    navLegacy: 'Roots',
    navCollection: 'Collectie',
    navPhilosophy: 'Filosofie',
    cart: 'Winkelmand',
    announcement: 'Luardani - premium no-size accessoires voor vrouwen',
    heroEyebrow: 'Luardani',
    heroTitle: 'Premium accessoires voor elke dag.',
    heroTagline: 'No-size lederwaren, zijde, sieraden en reisaccessoires voor vrouwen die houden van rustige stijl, mooie materialen en dagelijks gemak.',
    shopCollection: 'Bekijk de collectie',
    roots: 'Onze roots',
    noteLabel: 'Waarom no-size',
    noteText: 'Makkelijker kopen, makkelijker cadeau geven, minder retourgedoe.',
    proofOne: 'Geen maatstress',
    proofTwo: 'Cadeauwaardig',
    proofThree: 'Kleine oplages',
    stripWomenTitle: 'Voor vrouwen',
    stripWomenText: 'Rustige accessoires die passen bij dagelijkse outfits.',
    stripNoSizeTitle: 'No-size',
    stripNoSizeText: 'Geen maatkeuze nodig: duidelijke afmetingen vervangen maattabellen.',
    stripBatchTitle: 'Kleine oplages',
    stripBatchText: 'We maken liever kleine oplages op basis van echte interesse.',
    introLabel: 'De naam, de roots',
    introTitle: "Luardani is Fatima's Marokkaanse familienaam.",
    introText: 'Daarom voelt het merk vanaf het begin persoonlijk. We bouwen aan no-size accessoires: lederwaren, zijde, sieraden en reisitems die modern voelen zonder hun roots te verliezen.',
    maison1Title: 'Familienaam, modern ritme',
    maison1Text: 'Luardani begint dichtbij huis: een Marokkaanse familienaam, vertaald naar rustige accessoires voor het echte leven.',
    maison2Title: 'No-size, minder twijfel',
    maison2Text: 'Geen maten, geen pasvormstress. Elk product heeft duidelijke afmetingen, materiaalinformatie en een helder gebruiksmoment.',
    maison3Title: 'Kleine oplages, minder verspilling',
    maison3Text: 'We luisteren liever naar klanten en produceren zorgvuldig, dan dat we voorraad maken die niemand nodig heeft.',
    collectionLabel: 'De collectie',
    collectionTitle: 'Kies een categorie',
    collectionIntro: 'Begin met een categorie. Elke selectie opent direct producten, zodat mobiel browsen rustig en overzichtelijk blijft.',
    chooseCategory: 'Kies een categorie om de producten te bekijken.',
    selectedPiece: 'product in deze categorie',
    selectedPieces: 'producten in deze categorie',
    promiseLabel: 'Onze belofte',
    promiseTitle: 'Gemaakt om door te geven.',
    promiseText1: 'Luardani verbindt Marokkaanse familieroots met een rustige, moderne manier van dragen. Onze accessoires zijn makkelijk te gebruiken, mooi om cadeau te geven en gemaakt voor dagelijks leven.',
    promiseText2: 'We focussen op no-size accessoires omdat kopen eenvoudiger wordt, retouren kunnen afnemen en er meer aandacht naar materiaal en afwerking gaat.',
    enterCollection: 'Bekijk de collectie',
    secureCheckout: 'Veilige Stripe checkout',
    secureCheckoutText: 'Kaartbetalingen lopen via Stripe in een beveiligde checkout.',
    rarity: 'Productie op basis van interesse',
    rarityText: 'On-demand producten gaan pas richting productie wanneer er genoeg interesse is.',
    noSize: 'No-size accessoires',
    noSizeText: 'Bij elk product zie je afmetingen, materiaal en onderhoud voordat je koopt.',
    deliveryLabel: 'Levering',
    deliveryTitle: 'Duidelijk voor checkout.',
    deliveryText: 'Beschikbare producten tonen voorraad op de productkaart. Bij producten op aanvraag kun je interesse achterlaten in plaats van direct afrekenen.',
    materialsLabel: 'Materialen',
    materialsTitle: 'Premium herkomst, praktisch onderhoud.',
    materialsText: 'Op de productpagina vind je materiaal, afwerking, afmetingen en onderhoud voordat je beslist.',
    socialFirst: 'Social proof',
    followRelease: 'Gemaakt om te ontdekken, te bewaren en te delen.',
    familyOwned: 'Familie-eigendom',
    familyOwnedText: 'Gebouwd rond de Marokkaanse familienaam van Fatima, niet rond een verzonnen label.',
    currentEdit: 'Gemaakt om te delen',
    currentEditText: 'Ontworpen voor ontdekking via Instagram, Pinterest en gedeelde productlinks.',
    lessWaste: 'Interesse als signaal',
    lessWasteText: 'Bij producten op aanvraag helpt klantinteresse bepalen wat echt in productie gaat.',
    privateInvitation: 'Deel Luardani',
    shareHeading: 'Help mee bepalen wat we maken.',
    shareText: 'Deel Luardani met iemand met goede smaak. Elk bezoek en elk bewaard product helpt ons zien waar echt interesse voor is.',
    shareButton: 'Deel Luardani',
    copyInvite: 'Kopieer uitnodiging',
    updates: 'Updates',
    newsletterTitle: 'Krijg als eerste toegang tot kleine oplages en nieuwe productrondes.',
    emailPlaceholder: 'E-mailadres',
    joinFamily: 'Krijg vroege toegang',
    cartLabel: 'Winkelmand',
    cartTitle: 'Jouw winkelmand',
    total: 'Totaal',
    checkout: 'Afrekenen',
    copyright: 'Alle rechten voorbehouden.',
    pieces: 'producten',
    piece: 'product',
    ready: 'Direct te koop',
    preorder: 'Pre-order',
    conceptSample: 'Concept',
    noSizeEdit: 'No-size accessoire',
    production: 'Interesse voor productie',
    onDemand: 'Interesse achterlaten',
    available: 'beschikbaar',
    soldOut: 'Uitverkocht',
    details: 'Details',
    add: 'Toevoegen',
    joinRun: 'Laat interesse achter',
    maison: 'Luardani',
    material: 'Materiaal',
    dimensions: 'Afmetingen',
    edition: 'Editie',
    care: 'Onderhoud',
    shareLabel: 'Delen',
    sharePiece: 'Deel dit product',
    emailLabel: 'E-mail',
    inquiryNote: 'Bericht',
    inquiryPlaceholder: 'Optioneel: vertel waarom dit product bij je past',
    expressInterest: 'Laat interesse achter',
    close: 'Sluiten',
    inquirySubmitting: 'Je interesse wordt verzonden...',
    inquiryReceived: 'Je interesse is ontvangen. We nemen contact op zodra deze productieronde opent.',
    inquiryPreview: 'Je interesse is genoteerd in deze preview.',
    cartEmpty: 'Je winkelmand is leeg.',
    addFirst: 'Voeg eerst een product toe aan je winkelmand.',
    preparingCheckout: 'Veilige checkout wordt voorbereid...',
    newsletterEmpty: 'Vul een e-mailadres in voor updates.',
    newsletterSuccess: 'Je staat op de lijst. We mailen zodra er vroege toegang of een nieuwe productronde opent.',
    inviteCopied: 'Uitnodigingslink gekopieerd.',
    inviteShared: 'Uitnodiging gedeeld.',
    shareCancelled: 'Delen is geannuleerd.',
  },
}

const PRODUCT_NL = {
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

const PRODUCT_NL_DETAILS = {
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

const PRODUCT_ASSETS = {
  'leather-cardholder': ['assets/luardani/safi-cardholder-lifestyle.jpg', 'assets/luardani/leather-emboss-detail.jpg', 'assets/luardani/safi-cardholder-detail.jpg'],
  'toscana-handbag': ['assets/luardani/marrakech-tote-lifestyle.jpg', 'assets/luardani/leather-emboss-detail.jpg', 'assets/luardani/marrakech-tote-detail.jpg'],
  'silk-scarf': ['assets/luardani/noor-silk-square-lifestyle.jpg', 'assets/luardani/noor-silk-square-detail.jpg'],
  'leather-slippers': ['assets/luardani/medina-slipper-lifestyle.jpg', 'assets/luardani/medina-slipper-detail.jpg'],
  'catania-sunglasses': ['assets/luardani/atlas-sunglass-lifestyle.jpg', 'assets/luardani/atlas-sunglass-detail.jpg'],
  'riad-mini-bag': ['assets/luardani/riad-mini-bag-lifestyle.jpg', 'assets/luardani/leather-emboss-detail.jpg', 'assets/luardani/riad-mini-bag-detail.jpg'],
  'tadelakt-pouch': ['assets/luardani/tadelakt-pouch-lifestyle.jpg', 'assets/luardani/tadelakt-pouch-detail.jpg'],
  'zayna-cuff': ['assets/luardani/amira-hoops-lifestyle.jpg', 'assets/luardani/zayna-cuff-detail.jpg'],
  'amira-hoops': ['assets/luardani/amira-hoops-lifestyle.jpg', 'assets/luardani/amira-hoops-detail.jpg'],
  'lalla-ring-set': ['assets/luardani/lalla-ring-set.jpg', 'assets/luardani/lalla-ring-set-detail.jpg'],
  'kasbah-silk-wrap': ['assets/luardani/kasbah-silk-wrap-lifestyle.jpg', 'assets/luardani/kasbah-silk-wrap-detail.jpg'],
  'nomad-key-case': ['assets/luardani/nomad-key-case.jpg', 'assets/luardani/nomad-key-case-detail.jpg'],
}

const CATEGORY_EDITS = [
  {
    key: 'bags',
    label: 'Everyday Bags',
    labelNl: 'Tassen voor elke dag',
    text: 'Leather pieces for workdays, dinners, and errands.',
    textNl: 'Leren tassen en pouches voor werk, diner en dagelijks gebruik.',
    image: 'assets/luardani/marrakech-tote-lifestyle.jpg',
  },
  {
    key: 'silk',
    label: 'Silk Layers',
    labelNl: 'Zijden lagen',
    text: 'Anatolian Silk that dresses up simple outfits.',
    textNl: 'Anatolische zijde die eenvoudige outfits mooier maakt.',
    image: 'assets/luardani/noor-silk-square-lifestyle.jpg',
  },
  {
    key: 'jewelry',
    label: 'Daily Jewelry',
    labelNl: 'Sieraden voor elke dag',
    text: 'Warm gold-toned details for every day.',
    textNl: 'Warme goudkleurige details voor elke dag.',
    image: 'assets/luardani/amira-hoops-lifestyle.jpg',
  },
  {
    key: 'gifts',
    label: 'Gifts',
    labelNl: 'Cadeaus',
    text: 'No-size pieces that are easy to give.',
    textNl: 'No-size accessoires die makkelijk cadeau te geven zijn.',
    image: 'assets/luardani/medina-slipper-lifestyle.jpg',
  },
  {
    key: 'travel',
    label: 'Travel & Tech',
    labelNl: 'Reis & tech',
    text: 'Organised pieces for movement and daily order.',
    textNl: 'Slimme accessoires voor onderweg, werk en reizen.',
    image: 'assets/luardani/tadelakt-pouch-lifestyle.jpg',
  },
  {
    key: 'drops',
    label: 'Next Drops',
    labelNl: 'Volgende productrondes',
    text: 'Concepts customers can help move forward.',
    textNl: 'Concepten die we maken bij voldoende interesse.',
    image: 'assets/luardani/lalla-ring-set.jpg',
  },
]

const CATEGORY_PRODUCT_SLUGS = {
  bags: ['toscana-handbag', 'riad-mini-bag', 'tadelakt-pouch'],
  silk: ['silk-scarf', 'kasbah-silk-wrap'],
  jewelry: ['zayna-cuff', 'amira-hoops', 'lalla-ring-set'],
  gifts: ['leather-cardholder', 'silk-scarf', 'amira-hoops', 'nomad-key-case'],
  travel: ['tadelakt-pouch', 'nomad-key-case', 'catania-sunglasses', 'leather-cardholder'],
  drops: ['toscana-handbag', 'leather-slippers', 'catania-sunglasses', 'kasbah-silk-wrap', 'lalla-ring-set'],
}

const CATEGORY_ROUTES = {
  bags: 'bags',
  silk: 'silk',
  jewelry: 'jewelry',
  gifts: 'gifts',
  travel: 'travel',
  drops: 'drops',
}

const ROUTE_CATEGORIES = Object.fromEntries(Object.entries(CATEGORY_ROUTES).map(([key, value]) => [value, key]))
const PRODUCT_ROUTE_SLUGS = {
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
const ROUTE_PRODUCT_SLUGS = Object.fromEntries(Object.entries(PRODUCT_ROUTE_SLUGS).map(([productSlug, routeSlug]) => [routeSlug, productSlug]))

const t = (key) => COPY[LOCALE]?.[key] || key
const cleanTone = (value = '') => String(value)
  .replace(/patron piece/gi, 'limited piece')
  .replace(/patron commitment/gi, 'customer interest')
  .replace(/patron batch/gi, 'small batch')
  .replace(/\bpatrons\b/gi, 'customers')
  .replace(/\bpatron\b/gi, 'customer')

const dutchMaterialStory = (product) => {
  if (!isOnDemand(product)) {
    return 'Een no-size accessoire met duidelijke afmetingen, materiaalinformatie en onderhoudsadvies, zodat je met minder twijfel koopt.'
  }
  return 'Dit product gaat niet automatisch in productie. We verzamelen eerst interesse, zodat we alleen een kleine oplage maken wanneer genoeg klanten het echt willen.'
}

const localProduct = (product) => {
  const cleaned = {
    ...product,
    name: cleanTone(product.name || ''),
    description: cleanTone(product.description || ''),
    material: cleanTone(product.material || ''),
    dimensions: cleanTone(product.dimensions || ''),
    care: cleanTone(product.care || ''),
    craftNote: cleanTone(product.craftNote || ''),
    editionSize: cleanTone(product.editionSize || ''),
  }
  if (LOCALE !== 'nl') return cleaned
  return { ...cleaned, ...(PRODUCT_NL[product.slug] || {}), ...(PRODUCT_NL_DETAILS[product.slug] || {}) }
}
const localizedUrl = (locale) => {
  const host = locale === 'nl' ? 'https://luardani.nl' : 'https://luardani.com'
  return `${host}${window.location.pathname}${window.location.search}${window.location.hash}`
}

const formatMoney = (amount, currency = 'eur') =>
  new Intl.NumberFormat(LOCALE === 'nl' ? 'nl-NL' : 'en-US', { style: 'currency', currency }).format((amount || 0) / 100)

const escapeHTML = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])

const escapeAttribute = (value = '') => escapeHTML(value).replace(/`/g, '&#96;')

const productImage = (product) => {
  const local = PRODUCT_ASSETS[product.slug]?.[0]
  const image = local || (product.image && product.image.url ? `${CMS_URL}${product.image.url}` : product.externalImage)
  if (image?.startsWith('assets/')) return `/${image}`
  return /^https?:\/\//.test(image || '') ? image : ''
}

const productGallery = (product) => {
  const assets = PRODUCT_ASSETS[product.slug]
  if (assets) return assets.map((asset) => `/${asset}`)
  return [productImage(product)].filter(Boolean)
}

const productTypeLabel = (type = '') => ({
  'ready-to-ship': t('ready'),
  'pre-order': t('preorder'),
  'archive-sample': t('conceptSample'),
})[type] || t('noSizeEdit')

const isOnDemand = (product) => product.saleType === 'on-demand'
const selectedCategory = () => CATEGORY_EDITS.find((category) => category.key === selectedCategoryKey)
const productsForCategory = (key) => {
  const slugs = CATEGORY_PRODUCT_SLUGS[key] || []
  return products.filter((product) => slugs.includes(product.slug))
}
const categoryForProduct = (product) => CATEGORY_EDITS.find((category) => (CATEGORY_PRODUCT_SLUGS[category.key] || []).includes(product.slug))
const pathForCategory = (key) => `/${CATEGORY_ROUTES[key] || CATEGORY_ROUTES.bags}`
const pathForProduct = (product) => {
  const category = categoryForProduct(product)
  return `${pathForCategory(category?.key || selectedCategoryKey)}/${PRODUCT_ROUTE_SLUGS[product.slug] || product.slug}`
}

function applyRouteFromPath() {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const categoryKey = ROUTE_CATEGORIES[parts[0]]
  selectedCategoryKey = categoryKey || 'bags'
  pendingProductSlug = categoryKey && parts[1] ? (ROUTE_PRODUCT_SLUGS[parts[1]] || parts[1]) : null
}

function pushShopPath(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path)
    updateLanguageLinks()
  }
}

const productionProgress = (product) => {
  const interest = Number(product.interestCount)
  const threshold = Number(product.threshold)
  if (Number.isFinite(interest) && Number.isFinite(threshold) && threshold > 0) {
    return Math.min(100, Math.max(1, Math.round((interest / threshold) * 100)))
  }
  const value = Number(product.productionCommitment || product.collectionProgress || product.progress)
  if (Number.isFinite(value) && value > 0) return Math.min(100, Math.max(1, value))
  return Math.min(88, Math.max(34, 72 - (Number(product.inventory) || 0)))
}

const detailRows = (product) => [
  ['Material', product.material],
  ['Dimensions', product.dimensions],
  ['Edition', product.editionSize],
  ['Care', product.care],
].filter(([, value]) => value)

const productHighlights = (product) => {
  const rows = []
  if (product.material) rows.push([t('material'), cleanTone(product.material)])
  if (product.dimensions) rows.push([t('dimensions'), cleanTone(product.dimensions)])
  if (!rows.length) {
    rows.push([
      LOCALE === 'nl' ? 'Gebruik' : 'Use',
      isOnDemand(product)
        ? (LOCALE === 'nl' ? 'Interesse tonen voor productie' : 'Register interest before production')
        : (LOCALE === 'nl' ? 'Direct te bestellen' : 'Ready to order'),
    ])
  }
  return rows.slice(0, 2)
}

const plainTextFromRichText = (value) => {
  if (!value || !value.root || !Array.isArray(value.root.children)) return ''
  return value.root.children
    .map((node) => (node.children || []).map((child) => child.text || '').join(''))
    .filter(Boolean)
    .join('\n\n')
}

async function copyToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value)
    return
  }

  const input = document.createElement('textarea')
  input.value = value
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

async function shareLuardani(messageEl) {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Luardani',
        text: SHARE_TEXT,
        url: SHARE_URL,
      })
      if (messageEl) messageEl.textContent = LOCALE === 'nl' ? t('inviteShared') : 'Invitation shared.'
      return
    }

    await copyToClipboard(`${SHARE_TEXT} ${SHARE_URL}`)
    if (messageEl) messageEl.textContent = LOCALE === 'nl' ? t('inviteCopied') : 'Invitation link copied.'
  } catch (error) {
    if (messageEl) messageEl.textContent = LOCALE === 'nl' ? t('shareCancelled') : 'Share was cancelled.'
  }
}

async function shareProduct(product, messageEl) {
  const origin = LOCALE === 'nl' ? 'https://luardani.nl' : 'https://luardani.com'
  const url = `${origin}${pathForProduct(product)}?ref=friend`
  const text = LOCALE === 'nl'
    ? `Ik dacht dat je ${product.name} van Luardani mooi zou vinden - een no-size accessoire met Marokkaanse roots.`
    : `I thought you might like ${product.name} from Luardani - a no-size accessory with Moroccan roots.`
  try {
    if (navigator.share) {
      await navigator.share({ title: product.name, text, url })
      if (messageEl) messageEl.textContent = LOCALE === 'nl' ? 'Product gedeeld.' : 'Piece shared.'
      return
    }
    await copyToClipboard(`${text} ${url}`)
    if (messageEl) messageEl.textContent = LOCALE === 'nl' ? 'Productlink gekopieerd.' : 'Piece link copied.'
  } catch (error) {
    if (messageEl) messageEl.textContent = LOCALE === 'nl' ? 'Delen is geannuleerd.' : 'Share was cancelled.'
  }
}

async function loadProducts() {
  try {
    const res = await fetch('/api/products?where[status][equals]=published&limit=100&sort=createdAt')
    if (!res.ok) throw new Error('CMS unavailable')
    const data = await res.json()
    products = data.docs || []
  } catch (error) {
    products = FALLBACK_PRODUCTS
  }

  renderProducts()
}

function renderProducts() {
  const section = document.getElementById('products')
  const grid = document.getElementById('productsGrid')
  const count = document.getElementById('productsCount')
  const title = document.getElementById('productsTitle')
  const intro = document.getElementById('productsIntro')
  const category = selectedCategory()

  if (!products.length) {
    grid.innerHTML = `<p class="empty">${LOCALE === 'nl' ? 'De collectie wordt voorbereid.' : 'The collection is being prepared.'}</p>`
    count.textContent = LOCALE === 'nl' ? '0 producten' : '0 pieces'
    return
  }

  section?.classList.remove('products--empty')
  const visibleProducts = productsForCategory(category.key)
  const categoryLabel = LOCALE === 'nl' ? category.labelNl : category.label
  title.textContent = categoryLabel
  intro.textContent = LOCALE === 'nl' ? category.textNl : category.text
  count.textContent = LOCALE === 'nl'
    ? `${visibleProducts.length} ${visibleProducts.length === 1 ? t('selectedPiece') : t('selectedPieces')}`
    : `${visibleProducts.length} piece${visibleProducts.length === 1 ? '' : 's'} in this category`

  if (!visibleProducts.length) {
    grid.innerHTML = `<p class="empty">${escapeHTML(LOCALE === 'nl' ? 'Deze categorie wordt voorbereid.' : 'This category is being prepared.')}</p>`
    return
  }

  grid.innerHTML = visibleProducts.map((sourceProduct) => {
    const product = localProduct(sourceProduct)
    const progress = productionProgress(product)
    const onDemand = isOnDemand(product)
    return `
    <article class="product-card fade-in" aria-label="${escapeAttribute(product.name)}">
      <div class="product-card__image-wrap">
        <img src="${escapeAttribute(productImage(product))}" alt="${escapeAttribute(product.alt || product.name)}" loading="lazy">
        <span class="product-card__badge">${escapeHTML(productTypeLabel(product.productType))}</span>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${escapeHTML(product.name)}</h3>
        <p class="product-card__desc">${escapeHTML(product.description)}</p>
        <div class="product-card__meta">
          <p class="product-card__price">${formatMoney(product.price, product.currency)}</p>
          <p class="product-card__stock">${onDemand ? t('onDemand') : product.inventory > 0 ? `${product.inventory} ${t('available')}` : t('soldOut')}</p>
        </div>
        ${onDemand ? `<p class="product-card__note">${escapeHTML(LOCALE === 'nl' ? 'Nog niet afrekenen: laat je e-mail achter als je interesse hebt in deze productieronde.' : 'Not ready for checkout: leave your email to support this production run.')}</p>` : `<p class="product-card__note">${escapeHTML(LOCALE === 'nl' ? 'Veilig afrekenen via Stripe.' : 'Ready for secure Stripe checkout.')}</p>`}
        <div class="product-card__progress" aria-label="Production Commitment ${progress}%">
          <div>
            <span>${escapeHTML(t('production'))}</span>
            <strong>${progress}%</strong>
          </div>
          <i style="--progress:${progress}%"></i>
        </div>
        <div class="product-card__actions">
          <button class="product-card__details" type="button" data-details-id="${product.id}">${escapeHTML(t('details'))}</button>
          <button class="product-card__buy" type="button" ${onDemand ? `data-interest-id="${product.id}"` : `data-product-id="${product.id}"`} ${!onDemand && product.inventory < 1 ? 'disabled' : ''}>${onDemand ? escapeHTML(t('joinRun')) : escapeHTML(t('add'))}</button>
        </div>
      </div>
    </article>
  `}).join('')

  document.querySelectorAll('[data-details-id]').forEach((button) => {
    button.addEventListener('click', () => openProductModal(Number(button.dataset.detailsId)))
  })
  document.querySelectorAll('[data-product-id]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.productId)))
  })
  document.querySelectorAll('[data-interest-id]').forEach((button) => {
    button.addEventListener('click', () => openProductModal(Number(button.dataset.interestId), true))
  })
  observeFadeIns()

  if (pendingProductSlug) {
    const product = visibleProducts.find((item) => item.slug === pendingProductSlug)
    pendingProductSlug = null
    if (product) openProductModal(Number(product.id), isOnDemand(product), false)
  }
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid')
  if (!grid) return

  grid.innerHTML = CATEGORY_EDITS.map((category) => `
    <article class="category-card fade-in">
      <a href="${escapeAttribute(pathForCategory(category.key))}" data-category-key="${escapeAttribute(category.key)}" class="${category.key === selectedCategoryKey ? 'active' : ''}" aria-label="${escapeAttribute(category.label)}">
        <img src="${escapeAttribute(category.image.startsWith('assets/') ? `/${category.image}` : category.image)}" alt="${escapeAttribute(category.label)} product edit" loading="lazy">
        <span>${escapeHTML(LOCALE === 'nl' ? category.labelNl : category.label)}</span>
        <p>${escapeHTML(LOCALE === 'nl' ? category.textNl : category.text)}</p>
      </a>
    </article>
  `).join('')

  grid.querySelectorAll('[data-category-key]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      selectedCategoryKey = link.dataset.categoryKey
      pendingProductSlug = null
      pushShopPath(pathForCategory(selectedCategoryKey))
      renderCategories()
      renderProducts()
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

function openProductModal(productId, showInterest = false, updatePath = true) {
  const sourceProduct = products.find((item) => Number(item.id) === productId)
  if (!sourceProduct) return
  const product = localProduct(sourceProduct)
  if (updatePath) pushShopPath(pathForProduct(sourceProduct))

  const modal = document.getElementById('productModal')
  const panel = document.getElementById('productModalPanel')
  const progress = productionProgress(product)
  const onDemand = isOnDemand(product)
  const materialStory = LOCALE === 'nl' ? dutchMaterialStory(product) : cleanTone(plainTextFromRichText(product.materialStory))
  const gallery = productGallery(product)
  const detailImages = gallery.slice(1)
  panel.innerHTML = `
    <button class="modal-close" type="button" data-modal-close aria-label="Close product details">x</button>
    <div class="modal-product">
      <div class="modal-product__image">
        <img src="${escapeAttribute(gallery[0])}" alt="${escapeAttribute(product.alt || product.name)}">
        ${detailImages.length ? `
          <div class="modal-product__gallery" aria-label="Product detail images">
            ${detailImages.map((image, index) => `
              <img src="${escapeAttribute(image)}" alt="${escapeAttribute(`${product.name} detail ${index + 1}`)}">
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="modal-product__copy">
        <p class="section-label">${escapeHTML(t('maison'))}</p>
        <h2>${escapeHTML(product.name)}</h2>
        <span class="modal-product__price">${formatMoney(product.price, product.currency)}</span>
        <p>${escapeHTML(product.description)}</p>
        ${product.craftNote && LOCALE !== 'nl' ? `<p>${escapeHTML(cleanTone(product.craftNote))}</p>` : ''}
        ${materialStory ? `<p class="modal-product__story">${escapeHTML(materialStory)}</p>` : ''}
        <p>${onDemand ? LOCALE === 'nl' ? `${product.interestCount || 0} mensen hebben interesse getoond. Bij ${product.threshold || 50} gaan we deze productieronde beoordelen.` : `${product.interestCount || 0} customer requests recorded toward a production threshold of ${product.threshold || 50}.` : product.inventory > 0 ? LOCALE === 'nl' ? `${product.inventory} stuks beschikbaar.` : `${product.inventory} pieces currently available.` : LOCALE === 'nl' ? t('soldOut') : 'This piece is currently sold out.'}</p>
        <div class="product-card__progress product-card__progress--modal" aria-label="Production Commitment ${progress}%">
          <div>
            <span>${escapeHTML(t('production'))}</span>
            <strong>${progress}%</strong>
          </div>
          <i style="--progress:${progress}%"></i>
        </div>
        <dl class="modal-product__details">
          ${detailRows(product).map(([label, value]) => `
            <div>
              <dt>${escapeHTML(t(label.toLowerCase()))}</dt>
              <dd>${escapeHTML(cleanTone(value))}</dd>
            </div>
          `).join('')}
        </dl>
        ${onDemand ? `
          <details class="interest-disclosure">
            <summary class="product-card__buy">${escapeHTML(t('expressInterest'))}</summary>
            <form class="interest-form" data-interest-form="${product.id}">
              <label>
                <span>${escapeHTML(t('emailLabel'))}</span>
                <input type="email" name="email" placeholder="you@example.com" required>
              </label>
              <label>
                <span>${escapeHTML(t('inquiryNote'))}</span>
                <textarea name="note" rows="3" placeholder="${escapeAttribute(t('inquiryPlaceholder'))}"></textarea>
              </label>
              <button class="product-card__buy" type="submit">${escapeHTML(t('expressInterest'))}</button>
              <p class="interest-form__message" role="status">${interestLog[product.id] ? escapeHTML(t('inquiryPreview')) : ''}</p>
            </form>
          </details>
        ` : `
        <div class="modal-product__actions">
          <button class="product-card__buy" type="button" data-modal-add="${product.id}" ${product.inventory < 1 ? 'disabled' : ''}>${escapeHTML(t('add'))}</button>
          <button class="product-card__details" type="button" data-modal-close>${escapeHTML(t('close'))}</button>
        </div>
        `}
        <details class="product-share" aria-label="Share this piece">
          <summary>${escapeHTML(t('sharePiece'))}</summary>
          <div>
            <button class="product-card__details" type="button" data-product-share="${product.id}">${escapeHTML(t('shareLabel'))}</button>
            <a class="product-card__details" href="https://wa.me/?text=${encodeURIComponent(`I thought you might like ${product.name} from Luardani. ${window.location.origin}${pathForProduct(sourceProduct)}?ref=friend`)}" target="_blank" rel="noopener">WhatsApp</a>
            <a class="product-card__details" href="https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`${window.location.origin}${pathForProduct(sourceProduct)}?ref=friend`)}&media=${encodeURIComponent(productImage(product))}&description=${encodeURIComponent(product.name)}" target="_blank" rel="noopener">Pinterest</a>
          </div>
          <p class="share-message" role="status"></p>
        </details>
        ${onDemand ? `<div class="modal-product__actions"><button class="product-card__details" type="button" data-modal-close>${escapeHTML(t('close'))}</button></div>` : ''}
      </div>
    </div>
  `
  modal.classList.add('open')
  modal.setAttribute('aria-hidden', 'false')
  panel.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', closeProductModal)
  })
  const interestForm = panel.querySelector('[data-interest-form]')
  if (interestForm) {
    interestForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const id = Number(interestForm.dataset.interestForm)
      const email = interestForm.querySelector('input[name="email"]').value.trim()
      const note = interestForm.querySelector('textarea[name="note"]').value.trim()
      const message = interestForm.querySelector('.interest-form__message')
      if (!email) return
      message.textContent = t('inquirySubmitting')
      fetch(`${CMS_URL}/api/product-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: id,
          email,
          note,
          source: 'luardani-storefront',
          status: 'new',
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Inquiry could not be submitted.')
          interestLog[id] = { email, date: new Date().toISOString() }
          localStorage.setItem('luardani-interest', JSON.stringify(interestLog))
          message.textContent = t('inquiryReceived')
          interestForm.reset()
        })
        .catch((error) => {
          message.textContent = error.message
        })
    })
  }
  const productShare = panel.querySelector('[data-product-share]')
  if (productShare) {
    productShare.addEventListener('click', () => {
      shareProduct(product, panel.querySelector('.product-share .share-message'))
    })
  }
  const addButton = panel.querySelector('[data-modal-add]')
  if (addButton) {
    addButton.addEventListener('click', () => {
      addToCart(product.id)
      closeProductModal()
    })
  }
}

function closeProductModal(updatePath = true) {
  document.getElementById('productModal').classList.remove('open')
  document.getElementById('productModal').setAttribute('aria-hidden', 'true')
  if (updatePath && selectedCategoryKey && ROUTE_CATEGORIES[window.location.pathname.split('/').filter(Boolean)[0]]) {
    pushShopPath(pathForCategory(selectedCategoryKey))
  }
}

function saveCart() {
  localStorage.setItem('luardani-cart', JSON.stringify(cart))
  renderCart()
}

function normalizeActiveCart() {
  const nextCart = []

  cart.forEach((item) => {
    const product = products.find((entry) => Number(entry.id) === Number(item.id))
    if (!product || isOnDemand(product)) return

    const inventory = Number(product.inventory) || 0
    const quantity = Math.max(1, Math.min(Number(item.quantity) || 1, inventory || 1))
    if (inventory < 1) return

    const existing = nextCart.find((entry) => Number(entry.id) === Number(product.id))
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, inventory)
    } else {
      nextCart.push({ id: product.id, quantity })
    }
  })

  const changed = JSON.stringify(nextCart) !== JSON.stringify(cart)
  cart = nextCart
  if (changed) localStorage.setItem('luardani-cart', JSON.stringify(cart))
}

function addToCart(productId) {
  const product = products.find((item) => Number(item.id) === productId)
  if (!product) return
  if (isOnDemand(product)) {
    openProductModal(productId, true)
    return
  }
  const existing = cart.find((item) => Number(item.id) === productId)
  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, product.inventory || 99)
  } else {
    cart.push({ id: product.id, quantity: 1 })
  }
  saveCart()
  openCart()
}

function changeQuantity(productId, delta) {
  const product = products.find((item) => Number(item.id) === productId)
  const item = cart.find((entry) => Number(entry.id) === productId)
  if (!item || !product || isOnDemand(product)) return
  item.quantity += delta
  if (item.quantity <= 0) cart = cart.filter((entry) => Number(entry.id) !== productId)
  if (item.quantity > product.inventory) item.quantity = product.inventory
  saveCart()
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems')
  const totalEl = document.getElementById('cartTotal')
  normalizeActiveCart()

  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById('cartCount').textContent = count

  if (!cart.length) {
    itemsEl.innerHTML = `<p class="empty">${escapeHTML(t('cartEmpty'))}</p>`
    totalEl.textContent = formatMoney(0)
    return
  }

  let total = 0
  itemsEl.innerHTML = cart.map((item) => {
    const sourceProduct = products.find((entry) => Number(entry.id) === Number(item.id))
    if (!sourceProduct || isOnDemand(sourceProduct)) return ''
    const product = localProduct(sourceProduct)
    total += sourceProduct.price * item.quantity
    return `
      <div class="cart-item">
        <img src="${escapeAttribute(productImage(product))}" alt="${escapeAttribute(product.alt || product.name)}">
        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <p>${formatMoney(product.price, product.currency)}</p>
          <div class="cart-item__controls">
            <button type="button" data-qty-id="${product.id}" data-delta="-1">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-qty-id="${product.id}" data-delta="1">+</button>
          </div>
        </div>
      </div>
    `
  }).join('')

  totalEl.textContent = formatMoney(total)
  document.querySelectorAll('[data-qty-id]').forEach((button) => {
    button.addEventListener('click', () => changeQuantity(Number(button.dataset.qtyId), Number(button.dataset.delta)))
  })
}

function openCart() {
  document.getElementById('cart').classList.add('open')
  document.getElementById('cart').setAttribute('aria-hidden', 'false')
}

function closeCart() {
  document.getElementById('cart').classList.remove('open')
  document.getElementById('cart').setAttribute('aria-hidden', 'true')
}

async function checkout() {
  const message = document.getElementById('cartMessage')
  const button = document.getElementById('checkoutButton')
  normalizeActiveCart()
  localStorage.setItem('luardani-cart', JSON.stringify(cart))
  if (!cart.length) {
    message.textContent = t('addFirst')
    renderCart()
    return
  }

  button.disabled = true
  message.textContent = t('preparingCheckout')
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Checkout is not available yet.')
    window.location.href = data.url
  } catch (error) {
    message.textContent = error.message
    button.disabled = false
  }
}

function observeFadeIns() {
  const els = document.querySelectorAll('.fade-in')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.16 })
  els.forEach((el) => observer.observe(el))
}

function setText(selector, value) {
  const el = document.querySelector(selector)
  if (el) el.textContent = value
}

function applyLocale() {
  if (LOCALE !== 'nl') return

  document.documentElement.lang = 'nl'
  document.title = t('title')
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) metaDescription.setAttribute('content', t('description'))

  setText('.announcement', t('announcement'))
  setText('.nav__links a[href="#legacy"]', t('navLegacy'))
  setText('.nav__links a[href="#products"]', t('navCollection'))
  setText('.nav__links a[href="#philosophy"]', t('navPhilosophy'))
  document.querySelectorAll('.cart-button').forEach((button) => {
    const count = document.getElementById('cartCount')?.textContent || '0'
    button.innerHTML = `${t('cart')} <span id="cartCount">${count}</span>`
  })

  setText('.hero .eyebrow', t('heroEyebrow'))
  setText('.hero__title', t('heroTitle'))
  setText('.hero__tagline', t('heroTagline'))
  setText('.hero__actions .btn--solid', t('shopCollection'))
  setText('.hero__actions .btn--ghost', t('roots'))
  setText('.hero__proof span:nth-child(1)', t('proofOne'))
  setText('.hero__proof span:nth-child(2)', t('proofTwo'))
  setText('.hero__proof span:nth-child(3)', t('proofThree'))
  setText('.hero__note span', t('noteLabel'))
  setText('.hero__note strong', t('noteText'))

  setText('.conversion-strip__grid div:nth-child(1) strong', t('stripWomenTitle'))
  setText('.conversion-strip__grid div:nth-child(1) span', t('stripWomenText'))
  setText('.conversion-strip__grid div:nth-child(2) strong', t('stripNoSizeTitle'))
  setText('.conversion-strip__grid div:nth-child(2) span', t('stripNoSizeText'))
  setText('.conversion-strip__grid div:nth-child(3) strong', t('stripBatchTitle'))
  setText('.conversion-strip__grid div:nth-child(3) span', t('stripBatchText'))

  setText('.intro .section-label', t('introLabel'))
  setText('.intro h2', t('introTitle'))
  setText('.intro p:last-child', t('introText'))
  setText('.maison__panel:nth-child(1) h2', t('maison1Title'))
  setText('.maison__panel:nth-child(1) p', t('maison1Text'))
  setText('.maison__panel:nth-child(2) h2', t('maison2Title'))
  setText('.maison__panel:nth-child(2) p', t('maison2Text'))
  setText('.maison__panel:nth-child(3) h2', t('maison3Title'))
  setText('.maison__panel:nth-child(3) p', t('maison3Text'))

  setText('.products .section-label', t('collectionLabel'))
  setText('.products .section-title', t('collectionTitle'))
  setText('.products .section-intro', t('collectionIntro'))
  setText('.categories .section-label', 'Categorieën')
  setText('.categories .section-title', 'Bekijk de collectie')
  setText('.atelier__copy .section-label', t('promiseLabel'))
  setText('.atelier__copy .section-title', t('promiseTitle'))
  setText('.atelier__copy p:nth-of-type(2)', t('promiseText1'))
  setText('.atelier__copy p:nth-of-type(3)', t('promiseText2'))
  setText('.atelier__copy .text-link', t('enterCollection'))

  setText('.assurance__grid div:nth-child(1) strong', t('secureCheckout'))
  setText('.assurance__grid div:nth-child(1) p', t('secureCheckoutText'))
  setText('.assurance__grid div:nth-child(2) strong', t('rarity'))
  setText('.assurance__grid div:nth-child(2) p', t('rarityText'))
  setText('.assurance__grid div:nth-child(3) strong', t('noSize'))
  setText('.assurance__grid div:nth-child(3) p', t('noSizeText'))
  setText('.purchase-notes article:nth-child(1) .section-label', t('deliveryLabel'))
  setText('.purchase-notes article:nth-child(1) h2', t('deliveryTitle'))
  setText('.purchase-notes article:nth-child(1) p:last-child', t('deliveryText'))
  setText('.purchase-notes article:nth-child(2) .section-label', t('materialsLabel'))
  setText('.purchase-notes article:nth-child(2) h2', t('materialsTitle'))
  setText('.purchase-notes article:nth-child(2) p:last-child', t('materialsText'))
  setText('.social-proof__intro .section-label', t('socialFirst'))
  setText('.social-proof__intro h2', t('followRelease'))
  setText('.social-proof__items p:nth-child(1) span', t('familyOwned'))
  document.querySelector('.social-proof__items p:nth-child(1)')?.lastChild && (document.querySelector('.social-proof__items p:nth-child(1)').lastChild.textContent = ` ${t('familyOwnedText')}`)
  setText('.social-proof__items p:nth-child(2) span', t('currentEdit'))
  document.querySelector('.social-proof__items p:nth-child(2)')?.lastChild && (document.querySelector('.social-proof__items p:nth-child(2)').lastChild.textContent = ` ${t('currentEditText')}`)
  setText('.social-proof__items p:nth-child(3) span', t('lessWaste'))
  document.querySelector('.social-proof__items p:nth-child(3)')?.lastChild && (document.querySelector('.social-proof__items p:nth-child(3)').lastChild.textContent = ` ${t('lessWasteText')}`)

  setText('.invitation .section-label', t('privateInvitation'))
  setText('.invitation h2', t('shareHeading'))
  setText('.invitation p:not(.section-label)', t('shareText'))
  setText('#nativeShareButton', t('shareButton'))
  setText('#copyShareButton', t('copyInvite'))
  setText('.newsletter .section-label', t('updates'))
  setText('.newsletter h2', t('newsletterTitle'))
  document.querySelector('.newsletter__form input')?.setAttribute('placeholder', t('emailPlaceholder'))
  document.querySelector('.newsletter__form input')?.setAttribute('aria-label', t('emailPlaceholder'))
  setText('.newsletter__form button', t('joinFamily'))

  setText('.cart__header .section-label', t('cartLabel'))
  setText('.cart__header h2', t('cartTitle'))
  setText('.cart__total span', t('total'))
  setText('#checkoutButton', t('checkout'))
  setText('.footer__inner p', `(c) 2026 Luardani. ${t('copyright')}`)
}

function updateLanguageLinks() {
  document.querySelectorAll('[data-language-link]').forEach((link) => {
    const locale = link.dataset.languageLink
    link.href = localizedUrl(locale)
    link.classList.toggle('active', locale === LOCALE)
    if (locale === LOCALE) link.setAttribute('aria-current', 'true')
    else link.removeAttribute('aria-current')
  })
}

async function initStorefront() {
  applyRouteFromPath()
  updateLanguageLinks()
  applyLocale()
  renderCategories()
  document.getElementById('cartButton').addEventListener('click', openCart)
  document.getElementById('cartClose').addEventListener('click', closeCart)
  document.getElementById('cart').addEventListener('click', (event) => {
    if (event.target.id === 'cart') closeCart()
  })
  document.getElementById('productModalBackdrop').addEventListener('click', closeProductModal)
  document.querySelector('.newsletter__form').addEventListener('submit', (event) => {
    event.preventDefault()
    const input = event.currentTarget.querySelector('input[type="email"]')
    const message = document.getElementById('newsletterMessage')
    if (!input.value.trim()) {
      message.textContent = t('newsletterEmpty')
      input.focus()
      return
    }
    message.textContent = t('newsletterSuccess')
    event.currentTarget.reset()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCart()
      closeProductModal()
    }
  })
  document.getElementById('checkoutButton').addEventListener('click', checkout)
  document.getElementById('nativeShareButton').addEventListener('click', () => {
    shareLuardani(document.getElementById('shareMessage'))
  })
  document.getElementById('copyShareButton').addEventListener('click', async () => {
    const message = document.getElementById('shareMessage')
    await copyToClipboard(`${SHARE_TEXT} ${SHARE_URL}`)
    message.textContent = LOCALE === 'nl' ? t('inviteCopied') : 'Invitation link copied.'
  })
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40)
  })
  window.addEventListener('popstate', () => {
    applyRouteFromPath()
    const routeHasProduct = Boolean(pendingProductSlug)
    renderCategories()
    renderProducts()
    if (!routeHasProduct) closeProductModal(false)
  })
  await loadProducts()
  renderCart()
  observeFadeIns()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStorefront)
} else {
  initStorefront()
}


