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
const SHARE_URL = LOCALE === 'nl' ? 'https://luardani.nl/?ref=friend' : 'https://luardani.com/?ref=friend'
const SHARE_TEXT = LOCALE === 'nl'
  ? 'Luardani - moderne no-size essentials met Marokkaanse roots, gemaakt voor dagelijks gebruik.'
  : 'Luardani - modern no-size essentials with Moroccan roots, made for everyday movement.'

const COPY = {
  nl: {
    title: 'Luardani - Moderne essentials met Marokkaanse roots',
    description: 'Luardani is een modern accessoiresmerk voor vrouwen rond Fatima’s Marokkaanse familienaam, met no-size lederwaren, zijde, sieraden en travel essentials.',
    navLegacy: 'Erfenis',
    navCollection: 'Collectie',
    navPhilosophy: 'Filosofie',
    cart: 'Tas',
    announcement: 'Luardani - moderne no-size essentials',
    heroEyebrow: 'Luardani',
    heroTitle: 'Moderne essentials, geworteld in familie.',
    heroTagline: 'Lederwaren, zijde, sieraden en travel essentials voor vrouwen die houden van rustige stijl, warme materialen en dagelijks gemak.',
    shopCollection: 'Shop de collectie',
    roots: 'Onze roots',
    noteLabel: 'Kleine batches',
    noteText: 'Gebruiksvriendelijke stukken, met zorg gemaakt en minder verspilling.',
    introLabel: 'De naam, de roots',
    introTitle: 'Luardani is Fatima’s Marokkaanse familienaam.',
    introText: 'Daarom voelt het merk vanaf het begin persoonlijk. We bouwen rond bruikbare no-size stukken: lederwaren, zijde, sieraden en travel objects die modern voelen zonder hun roots te verliezen.',
    maison1Title: 'Familienaam, modern ritme',
    maison1Text: 'Luardani begint dichtbij huis: een Marokkaanse familienaam, vertaald naar clean everyday pieces voor het echte leven.',
    maison2Title: 'De no-size filosofie',
    maison2Text: 'Wij richten ons op essentials die je leven aanvullen, niet je maten: lederwaren, vloeiende zijde en sculpturale sieraden.',
    maison3Title: 'Kleine batches, minder waste',
    maison3Text: 'We testen liever vraag, luisteren naar klanten en produceren zorgvuldig dan dat we schappen vullen met ongewenste voorraad.',
    collectionLabel: 'De collectie',
    collectionTitle: 'No-size essentials',
    promiseLabel: 'Onze belofte',
    promiseTitle: 'Gemaakt om door te geven.',
    promiseText1: 'Luardani verbindt Marokkaanse familieroots met een clean, moderne manier van dragen. De stukken zijn makkelijk te gebruiken, makkelijk te geven en gemaakt voor dagelijks leven.',
    promiseText2: 'We focussen op no-size accessoires omdat shoppen simpeler wordt, returns lager kunnen blijven en er meer aandacht naar materiaal en afwerking gaat.',
    enterCollection: 'Shop de collectie',
    secureCheckout: 'Veilige Stripe checkout',
    rarity: 'Vraaggestuurde zeldzaamheid',
    noSize: 'No-size essentials',
    socialFirst: 'Social first',
    followRelease: 'Volg nieuwe ideeën, drops en favorieten.',
    familyOwned: 'Familie-eigendom',
    familyOwnedText: 'Gebouwd rond Fatima’s Marokkaanse familienaam.',
    currentEdit: 'Huidige selectie',
    currentEditText: 'Twaalf vrouwelijke no-size essentials in lederwaren, zijde, sieraden en travel.',
    lessWaste: 'Minder verspilling',
    lessWasteText: 'Vraag bepaalt wat in productie gaat.',
    privateInvitation: 'Deel Luardani',
    shareHeading: 'Stuur Luardani naar een vriend.',
    shareText: 'Ken je iemand die houdt van clean accessoires, warme materialen en een rustige stijl? Deel de collectie met haar.',
    shareButton: 'Deel Luardani',
    copyInvite: 'Kopieer uitnodiging',
    updates: 'Updates',
    newsletterTitle: 'Ontvang nieuwe drops, producttests en restock notes.',
    emailPlaceholder: 'E-mailadres',
    joinFamily: 'Word deel van de familie',
    cartLabel: 'Jouw tas',
    cartTitle: 'Jouw tas',
    total: 'Totaal',
    checkout: 'Afrekenen',
    copyright: 'Alle rechten voorbehouden.',
    pieces: 'stukken',
    piece: 'stuk',
    ready: 'Klaar voor verzending',
    preorder: 'Pre-order',
    conceptSample: 'Concept',
    noSizeEdit: 'No-size edit',
    production: 'Productiecommitment',
    onDemand: 'Op aanvraag',
    available: 'beschikbaar',
    soldOut: 'Uitverkocht',
    details: 'Details',
    add: 'Toevoegen',
    joinRun: 'Interesse',
    maison: 'Luardani',
    material: 'Materiaal',
    dimensions: 'Afmetingen',
    edition: 'Editie',
    care: 'Onderhoud',
    shareLabel: 'Delen',
    sharePiece: 'Deel dit stuk',
    emailLabel: 'E-mail',
    inquiryNote: 'Bericht',
    inquiryPlaceholder: 'Optioneel: vertel wat je aantrekt in dit stuk',
    expressInterest: 'Toon interesse',
    close: 'Sluiten',
    inquirySubmitting: 'Aanvraag wordt verzonden...',
    inquiryReceived: 'Aanvraag ontvangen. We nemen contact op wanneer deze productieronde opent.',
    inquiryPreview: 'Je aanvraag is genoteerd in deze preview.',
    cartEmpty: 'Je cart is leeg.',
    addFirst: 'Voeg eerst een product toe aan je cart.',
    preparingCheckout: 'Veilige checkout wordt voorbereid...',
    newsletterEmpty: 'Vul een e-mailadres in voor updates.',
    newsletterSuccess: 'Je staat op de lijst. We mailen wanneer de volgende drop opent.',
    inviteCopied: 'Uitnodigingslink gekopieerd.',
    inviteShared: 'Uitnodiging gedeeld.',
    shareCancelled: 'Delen is geannuleerd.',
  },
}

const PRODUCT_NL = {
  'leather-cardholder': {
    name: 'De Safi Cardholder',
    description: 'Een compact no-size essential in Marokkaans afgewerkt generfd leer, gemaakt voor dagelijkse beweging en stille ceremonie.',
  },
  'toscana-handbag': {
    name: 'De Marrakech Tote',
    description: 'Een gestructureerde leren tote in Marokkaans leer, gekozen om verhouding, dagelijks gebruik en een warme uitstraling.',
  },
  'silk-scarf': {
    name: 'De Noor Zijden Carré',
    description: 'Een carré van Anatolische zijde met zachte valling, ontworpen als no-size laag voor reizen, ritueel en avondlicht.',
  },
  'leather-slippers': {
    name: 'De Medina Slipper',
    description: 'Zachte Marokkaanse leren slippers voor gemak: een stil object voor thuis, reis en pauze.',
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
    description: 'Een sculpturale goudkleurige cuff met zachte rand, gemaakt als anker voor een minimal uniform.',
  },
  'amira-hoops': {
    name: 'De Amira Hoops',
    description: 'Fijne goudkleurige hoops met een precieze ronde lijn, ontworpen voor alledaagse ceremonie.',
  },
  'lalla-ring-set': {
    name: 'De Lalla Ring Set',
    description: 'Een stapel slanke ringen in warme goudtinten, samen of los te dragen door de week.',
  },
  'kasbah-silk-wrap': {
    name: 'De Kasbah Zijden Wrap',
    description: 'Een oversized wrap van Anatolische zijde voor reis, avond en interieur, gesneden voor beweging in plaats van maat.',
  },
  'nomad-key-case': {
    name: 'De Nomad Key Case',
    description: 'Een kleine Marokkaanse leren key case die de praktische objecten van de dag geordend houdt.',
  },
}

const PRODUCT_ASSETS = {
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

const CATEGORY_EDITS = [
  {
    label: 'Leather Goods',
    labelNl: 'Lederwaren',
    text: 'Everyday leather pieces for work, travel, and ritual.',
    textNl: 'Dagelijkse leren stukken voor werk, reis en ritueel.',
    image: 'assets/luardani/marrakech-tote.jpg',
  },
  {
    label: 'Silk & Cashmere',
    labelNl: 'Zijde & Cashmere',
    text: 'Anatolian Silk layers with movement, softness, and ease.',
    textNl: 'Anatolische zijde met beweging, zachtheid en gemak.',
    image: 'assets/luardani/noor-silk-square.jpg',
  },
  {
    label: 'Jewelry',
    labelNl: 'Sieraden',
    text: 'Warm gold-toned forms for everyday ceremony.',
    textNl: 'Warme goudkleurige vormen voor alledaagse ceremonie.',
    image: 'assets/luardani/amira-hoops.jpg',
  },
  {
    label: 'Home & Gift',
    labelNl: 'Home & Gift',
    text: 'Small personal objects from the Luardani edit.',
    textNl: 'Kleine persoonlijke objecten uit de Luardani edit.',
    image: 'assets/luardani/medina-slipper.jpg',
  },
  {
    label: 'Tech & Travel',
    labelNl: 'Tech & Travel',
    text: 'No-size pieces for movement, devices, and daily order.',
    textNl: 'No-size stukken voor beweging, devices en dagelijkse orde.',
    image: 'assets/luardani/tadelakt-pouch.jpg',
  },
  {
    label: 'The Vault',
    labelNl: 'The Vault',
    text: 'Concept pieces we test before larger production.',
    textNl: 'Conceptstukken die we testen voor grotere productie.',
    image: 'assets/luardani/lalla-ring-set.jpg',
  },
]

const t = (key) => COPY[LOCALE]?.[key] || key
const localProduct = (product) => LOCALE === 'nl' ? { ...product, ...(PRODUCT_NL[product.slug] || {}) } : product
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
  return /^https?:\/\//.test(image || '') || image?.startsWith('assets/') ? image : ''
}

const productGallery = (product) => {
  const assets = PRODUCT_ASSETS[product.slug]
  if (assets) return assets
  return [productImage(product)].filter(Boolean)
}

const productTypeLabel = (type = '') => ({
  'ready-to-ship': t('ready'),
  'pre-order': t('preorder'),
  'archive-sample': t('conceptSample'),
})[type] || t('noSizeEdit')

const isOnDemand = (product) => product.saleType === 'on-demand'

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
  const url = `${origin}/?ref=friend&piece=${encodeURIComponent(product.slug || product.id)}#products`
  const text = LOCALE === 'nl'
    ? `Ik dacht dat je ${product.name} van Luardani mooi zou vinden - een no-size accessoire met Marokkaanse roots.`
    : `I thought you might like ${product.name} from Luardani - a no-size accessory with Moroccan roots.`
  try {
    if (navigator.share) {
      await navigator.share({ title: product.name, text, url })
      if (messageEl) messageEl.textContent = 'Piece shared.'
      return
    }
    await copyToClipboard(`${text} ${url}`)
    if (messageEl) messageEl.textContent = 'Piece link copied.'
  } catch (error) {
    if (messageEl) messageEl.textContent = 'Share was cancelled.'
  }
}

async function loadProducts() {
  const grid = document.getElementById('productsGrid')
  const count = document.getElementById('productsCount')
  try {
    const res = await fetch('/api/products?where[status][equals]=published&limit=100&sort=createdAt')
    if (!res.ok) throw new Error('CMS unavailable')
    const data = await res.json()
    products = data.docs || []
  } catch (error) {
    products = FALLBACK_PRODUCTS
  }

  if (!products.length) {
    grid.innerHTML = `<p class="empty">${LOCALE === 'nl' ? 'De collectie wordt voorbereid.' : 'The collection is being prepared.'}</p>`
    count.textContent = '0 pieces'
    return
  }

  count.textContent = LOCALE === 'nl' ? `${products.length} ${products.length === 1 ? t('piece') : t('pieces')}` : `${products.length} piece${products.length === 1 ? '' : 's'}`
  grid.innerHTML = products.map((sourceProduct) => {
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
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid')
  if (!grid) return

  grid.innerHTML = CATEGORY_EDITS.map((category) => `
    <article class="category-card fade-in">
      <a href="#products" aria-label="${escapeAttribute(category.label)}">
        <img src="${escapeAttribute(category.image)}" alt="${escapeAttribute(category.label)} product edit" loading="lazy">
        <span>${escapeHTML(LOCALE === 'nl' ? category.labelNl : category.label)}</span>
        <p>${escapeHTML(LOCALE === 'nl' ? category.textNl : category.text)}</p>
      </a>
    </article>
  `).join('')
}

function openProductModal(productId, showInterest = false) {
  const sourceProduct = products.find((item) => Number(item.id) === productId)
  if (!sourceProduct) return
  const product = localProduct(sourceProduct)

  const modal = document.getElementById('productModal')
  const panel = document.getElementById('productModalPanel')
  const progress = productionProgress(product)
  const onDemand = isOnDemand(product)
  const materialStory = plainTextFromRichText(product.materialStory)
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
        ${product.craftNote ? `<p>${escapeHTML(product.craftNote)}</p>` : ''}
        ${materialStory ? `<p class="modal-product__story">${escapeHTML(materialStory)}</p>` : ''}
        <p>${onDemand ? LOCALE === 'nl' ? `${product.interestCount || 0} aanvragen genoteerd richting een productiedrempel van ${product.threshold || 50}.` : `${product.interestCount || 0} customer requests recorded toward a production threshold of ${product.threshold || 50}.` : product.inventory > 0 ? LOCALE === 'nl' ? `${product.inventory} stukken momenteel beschikbaar.` : `${product.inventory} pieces currently available.` : LOCALE === 'nl' ? t('soldOut') : 'This piece is currently sold out.'}</p>
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
              <dd>${escapeHTML(value)}</dd>
            </div>
          `).join('')}
        </dl>
        <div class="product-share" aria-label="Share this piece">
          <p class="section-label">${escapeHTML(t('shareLabel'))}</p>
          <div>
            <button class="product-card__details" type="button" data-product-share="${product.id}">${escapeHTML(t('sharePiece'))}</button>
            <a class="product-card__details" href="https://wa.me/?text=${encodeURIComponent(`I thought you might like ${product.name} from Luardani. https://luardani.com/?ref=friend&piece=${product.slug || product.id}#products`)}" target="_blank" rel="noopener">WhatsApp</a>
            <a class="product-card__details" href="https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://luardani.com/?ref=friend&piece=${product.slug || product.id}#products`)}&media=${encodeURIComponent(productImage(product))}&description=${encodeURIComponent(product.name)}" target="_blank" rel="noopener">Pinterest</a>
          </div>
          <p class="share-message" role="status"></p>
        </div>
        ${onDemand ? `
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
        ` : `
        <div class="modal-product__actions">
          <button class="product-card__buy" type="button" data-modal-add="${product.id}" ${product.inventory < 1 ? 'disabled' : ''}>${escapeHTML(t('add'))}</button>
          <button class="product-card__details" type="button" data-modal-close>${escapeHTML(t('close'))}</button>
        </div>
        `}
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

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open')
  document.getElementById('productModal').setAttribute('aria-hidden', 'true')
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
  setText('.hero__note span', t('noteLabel'))
  setText('.hero__note strong', t('noteText'))

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
  setText('.categories .section-label', 'Shop per categorie')
  setText('.categories .section-title', 'Shop de edit')
  setText('.atelier__copy .section-label', t('promiseLabel'))
  setText('.atelier__copy .section-title', t('promiseTitle'))
  setText('.atelier__copy p:nth-of-type(2)', t('promiseText1'))
  setText('.atelier__copy p:nth-of-type(3)', t('promiseText2'))
  setText('.atelier__copy .text-link', t('enterCollection'))

  setText('.assurance__grid div:nth-child(1) strong', t('secureCheckout'))
  setText('.assurance__grid div:nth-child(2) strong', t('rarity'))
  setText('.assurance__grid div:nth-child(3) strong', t('noSize'))
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
  setText('.footer__inner p', `© 2026 Luardani. ${t('copyright')}`)
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

document.addEventListener('DOMContentLoaded', async () => {
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
  await loadProducts()
  renderCart()
  observeFadeIns()
})
