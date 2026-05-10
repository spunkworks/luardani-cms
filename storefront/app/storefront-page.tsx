import { headers } from 'next/headers'
import type { CSSProperties } from 'react'
import {
  CATEGORY_EDITS,
  CATEGORY_ROUTES,
  LABELS,
  ROUTE_CATEGORIES,
  formatMoney,
  getProducts,
  isOnDemand,
  localProduct,
  pathForCategory,
  productImage,
  productTypeLabel,
  productionProgress,
  productsForCategory,
  type CategoryKey,
  type Locale,
  type Product,
} from './lib/storefront-data'

type Props = {
  slug?: string[]
}

function localeFromHost(host: string | null): Locale {
  return host?.endsWith('.nl') ? 'nl' : 'en'
}

function selectedCategoryFromSlug(slug?: string[]): CategoryKey {
  return ROUTE_CATEGORIES[slug?.[0] || ''] || 'bags'
}

function productCard(product: Product, locale: Locale) {
  const labels = LABELS[locale]
  const displayProduct = localProduct(product, locale)
  const progress = productionProgress(displayProduct)
  const onDemand = isOnDemand(displayProduct)

  return (
    <article className="product-card fade-in" aria-label={displayProduct.name} key={displayProduct.slug}>
      <div className="product-card__image-wrap">
        <img src={productImage(displayProduct)} alt={displayProduct.name} loading="lazy" />
        <span className="product-card__badge">{productTypeLabel(displayProduct, locale)}</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{displayProduct.name}</h3>
        <p className="product-card__desc">{displayProduct.description}</p>
        <div className="product-card__meta">
          <p className="product-card__price">{formatMoney(displayProduct.price || 0, displayProduct.currency, locale)}</p>
          <p className="product-card__stock">
            {onDemand ? labels.onDemand : Number(displayProduct.inventory) > 0 ? `${displayProduct.inventory} ${labels.available}` : labels.soldOut}
          </p>
        </div>
        <p className="product-card__note">
          {onDemand
            ? locale === 'nl'
              ? 'Nog niet afrekenen: laat je e-mail achter als je interesse hebt in deze productieronde.'
              : 'Not ready for checkout: leave your email to support this production run.'
            : locale === 'nl'
              ? 'Veilig afrekenen via Stripe.'
              : 'Ready for secure Stripe checkout.'}
        </p>
        <div className="product-card__progress" aria-label={`Production Commitment ${progress}%`}>
          <div>
            <span>{labels.production}</span>
            <strong>{progress}%</strong>
          </div>
          <i style={{ '--progress': `${progress}%` } as CSSProperties}></i>
        </div>
        <div className="product-card__actions">
          <button className="product-card__details" type="button" data-details-id={displayProduct.id}>
            {labels.details}
          </button>
          <button
            className="product-card__buy"
            type="button"
            data-interest-id={onDemand ? displayProduct.id : undefined}
            data-product-id={!onDemand ? displayProduct.id : undefined}
            disabled={!onDemand && Number(displayProduct.inventory) < 1}
          >
            {onDemand ? labels.joinRun : labels.add}
          </button>
        </div>
      </div>
    </article>
  )
}

export async function StorefrontPage({ slug }: Props) {
  const requestHeaders = await headers()
  const locale = localeFromHost(requestHeaders.get('host'))
  const labels = LABELS[locale]
  const products = await getProducts()
  const categoryKey = selectedCategoryFromSlug(slug)
  const category = CATEGORY_EDITS.find((item) => item.key === categoryKey) || CATEGORY_EDITS[0]
  const visibleProducts = productsForCategory(products, categoryKey)
  return (
    <>
      <div className="announcement">{labels.announcement}</div>
      <nav className="nav" id="nav" aria-label="Main navigation">
        <div className="container nav__inner">
          <div className="nav__links" aria-label="Primary">
            <a href="#legacy">{labels.navLegacy}</a>
            <a href="#products">{labels.navCollection}</a>
            <a href="#philosophy">{labels.navPhilosophy}</a>
          </div>
          <a href="#" className="nav__logo">
            <span>LU</span>ARDANI
          </a>
          <div className="nav__actions">
            <nav className="language-switch" aria-label="Language">
              <a href="https://luardani.nl/" data-language-link="nl">
                NL
              </a>
              <span aria-hidden="true">/</span>
              <a href="https://luardani.com/" data-language-link="en">
                EN
              </a>
            </nav>
            <button className="cart-button" id="cartButton" type="button" aria-label="Open cart">
              {labels.cart} <span id="cartCount">0</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" id="hero" aria-label="Luardani">
          <div className="hero__bg">
            <img src="/assets/luardani/hero-atelier.png" alt="Luardani leather bag worn in warm natural daylight" loading="eager" />
          </div>
          <div className="hero__overlay"></div>
          <div className="hero__content">
            <p className="eyebrow">Luardani</p>
            <h1 className="hero__title">{labels.heroTitle}</h1>
            <p className="hero__tagline">{labels.heroTagline}</p>
            <div className="hero__actions">
              <a href="#products" className="btn btn--solid">
                {labels.shopCollection}
              </a>
              <a href="#legacy" className="btn btn--ghost">
                {labels.roots}
              </a>
            </div>
            <div className="hero__proof" aria-label="Luardani benefits">
              <span>{labels.proofOne}</span>
              <span>{labels.proofTwo}</span>
              <span>{labels.proofThree}</span>
            </div>
          </div>
          <div className="hero__social" aria-label="Social links">
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="4"></rect><circle cx="12" cy="12" r="3.2"></circle><path d="M16.7 7.4h.01"></path></svg>
            </a>
            <a href="https://www.tiktok.com/" aria-label="TikTok">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.2a3.8 3.8 0 1 1-3.8-3.8c.3 0 .6 0 .8.1v2.8a1.2 1.2 0 1 0 .2.7V4h2.8c.4 2.2 1.8 3.6 4 3.9v2.8c-1.6-.1-2.9-.7-4-1.7Z"></path></svg>
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2V5h-2.4C11 5 10 6.6 10 8.7V11H8v3h2v5h3v-5h2.3l.7-3h-3V8.9c0-.6.3-.9 1-.9Z"></path></svg>
            </a>
            <a href="https://www.pinterest.com/" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 5C8.7 5 6.4 7.3 6.4 10.5c0 2 1.1 3.2 2.2 3.2.4 0 .6-.9.5-1.2-.2-.5-.6-1.1-.6-1.8 0-2.1 1.6-3.7 3.8-3.7 2.1 0 3.5 1.3 3.5 3.3 0 2.4-1.2 4.1-2.8 4.1-.9 0-1.6-.8-1.4-1.7.3-1.1.8-2.2.8-3 0-.7-.4-1.3-1.1-1.3-.9 0-1.6.9-1.6 2.1 0 .8.3 1.3.3 1.3l-1.1 4.8c-.3 1.3-.1 2.9 0 3.4.1.2.3.2.4.1.2-.3 1.6-2 2-3.3.1-.4.6-2.2.6-2.2.3.6 1.1 1 2 1 2.7 0 4.7-2.5 4.7-5.8C18.6 7.1 16.2 5 12.2 5Z"></path></svg>
            </a>
          </div>
          <div className="hero__note">
            <span>{locale === 'nl' ? 'Waarom no-size' : 'Why no-size'}</span>
            <strong>{locale === 'nl' ? 'Makkelijker kopen, makkelijker cadeau geven, minder retourgedoe.' : 'Easier to buy, easier to gift, fewer returns.'}</strong>
          </div>
        </section>

        <section className="categories" aria-label="Shop by category">
          <div className="container">
            <div className="categories__bar">
              <p className="section-label">{labels.categories}</p>
              <h2 className="section-title">{labels.browseCollection}</h2>
            </div>
            <div className="categories__grid" id="categoriesGrid">
              {CATEGORY_EDITS.map((item) => (
                <article className="category-card fade-in" key={item.key}>
                  <a
                    href={pathForCategory(item.key)}
                    data-category-key={item.key}
                    className={item.key === categoryKey ? 'active' : ''}
                    aria-label={item.label}
                  >
                    <img src={`/${item.image}`} alt={`${item.label} product edit`} loading="lazy" />
                    <span>{locale === 'nl' ? item.labelNl : item.label}</span>
                    <p>{locale === 'nl' ? item.textNl : item.text}</p>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="products" id="products" aria-label="Products">
          <div className="container">
            <div className="products__bar">
              <div>
                <p className="section-label">{labels.collectionLabel}</p>
                <h2 className="section-title" id="productsTitle">
                  {locale === 'nl' ? category.labelNl : category.label}
                </h2>
                <p className="section-intro" id="productsIntro">
                  {locale === 'nl' ? category.textNl : category.text}
                </p>
              </div>
              <p className="products__count" id="productsCount">
                {visibleProducts.length} {visibleProducts.length === 1 ? labels.productInCategory : labels.productsInCategory}
              </p>
            </div>
            <div className="products__grid" id="productsGrid">
              {visibleProducts.map((product) => productCard(product, locale))}
            </div>
          </div>
        </section>

        <section className="conversion-strip" aria-label="Why Luardani">
          <div className="container conversion-strip__grid">
            <div>
              <strong>{locale === 'nl' ? 'Voor vrouwen' : 'For women'}</strong>
              <span>{locale === 'nl' ? 'Rustige accessoires die passen bij dagelijkse outfits.' : 'Clean, useful accessories that work with daily outfits.'}</span>
            </div>
            <div>
              <strong>No-size</strong>
              <span>{locale === 'nl' ? 'Geen maatkeuze nodig: duidelijke afmetingen vervangen maattabellen.' : 'No fit guessing: dimensions replace size charts.'}</span>
            </div>
            <div>
              <strong>{locale === 'nl' ? 'Kleine oplages' : 'Small batches'}</strong>
              <span>{locale === 'nl' ? 'We maken liever kleine oplages op basis van echte interesse.' : 'Demand helps decide what moves into production.'}</span>
            </div>
          </div>
        </section>

        <section className="intro" id="legacy" aria-label="Luardani roots">
          <div className="container intro__grid">
            <p className="section-label">{locale === 'nl' ? 'De naam, de roots' : 'The Name, The Roots'}</p>
            <h2>{locale === 'nl' ? "Luardani is Fatima's Marokkaanse familienaam." : "Luardani is Fatima's Moroccan family name."}</h2>
            <p>
              {locale === 'nl'
                ? 'Daarom voelt het merk vanaf het begin persoonlijk. We bouwen aan no-size accessoires: lederwaren, zijde, sieraden en reisitems die modern voelen zonder hun roots te verliezen.'
                : 'That makes the brand personal from the start. We build around useful, no-size pieces: leather goods, silk, jewelry, and travel objects that feel modern without losing their roots.'}
            </p>
          </div>
        </section>

        <section className="maison" aria-label="Luardani philosophy">
          <div className="container maison__grid">
            <article className="maison__panel fade-in">
              <span>01</span>
              <h2>{locale === 'nl' ? 'Familienaam, modern ritme' : 'Family name, modern rhythm'}</h2>
              <p>{locale === 'nl' ? 'Luardani begint dichtbij huis: een Marokkaanse familienaam, vertaald naar rustige accessoires voor het echte leven.' : 'Luardani starts close to home: a Moroccan family name, translated into clean everyday pieces for real life.'}</p>
            </article>
            <article className="maison__panel fade-in">
              <span>02</span>
              <h2>{locale === 'nl' ? 'No-size, minder twijfel' : 'The No-Size Philosophy'}</h2>
              <p>{locale === 'nl' ? 'Geen maten, geen pasvormstress. Elk product heeft duidelijke afmetingen, materiaalinformatie en een helder gebruiksmoment.' : 'We focus on pieces that avoid size uncertainty: leather goods, fluid silks, jewelry, and travel accessories with clear dimensions.'}</p>
            </article>
            <article className="maison__panel fade-in">
              <span>03</span>
              <h2>{locale === 'nl' ? 'Kleine oplages, minder verspilling' : 'Small batches, less waste'}</h2>
              <p>{locale === 'nl' ? 'We luisteren liever naar klanten en produceren zorgvuldig, dan dat we voorraad maken die niemand nodig heeft.' : 'We would rather test demand, listen to customers, and produce carefully than fill shelves with unwanted stock.'}</p>
            </article>
          </div>
        </section>

        <section className="atelier" id="philosophy" aria-label="Brand philosophy">
          <div className="container atelier__grid">
            <div className="atelier__image fade-in">
              <img src="/assets/luardani/safi-cardholder-detail.jpg" alt="Close-up of refined leather grain and stitching" loading="lazy" />
            </div>
            <div className="atelier__copy fade-in">
              <p className="section-label">{locale === 'nl' ? 'Onze belofte' : 'Our Promise'}</p>
              <h2 className="section-title">{locale === 'nl' ? 'Gemaakt om door te geven.' : 'Built to be passed down.'}</h2>
              <p>
                {locale === 'nl'
                  ? 'Luardani verbindt Marokkaanse familieroots met een rustige, moderne manier van dragen. Onze accessoires zijn makkelijk te gebruiken, mooi om cadeau te geven en gemaakt voor dagelijks leven.'
                  : 'Luardani blends Moroccan family roots with a cleaner, modern way of dressing. The pieces are easy to wear, easy to gift, and made to fit into daily life.'}
              </p>
              <p>
                {locale === 'nl'
                  ? 'We focussen op no-size accessoires omdat kopen eenvoudiger wordt, retouren kunnen afnemen en er meer aandacht naar materiaal en afwerking gaat.'
                  : 'We focus on no-size accessories because they make shopping simpler, reduce returns, and let us put more attention into materials and finish.'}
              </p>
              <a href="#products" className="text-link">
                {labels.shopCollection}
              </a>
            </div>
          </div>
        </section>

        <section className="assurance" aria-label="Customer care">
          <div className="container assurance__grid">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5c0 4.5-2.8 8.5-7 10-4.2-1.5-7-5.5-7-10V6l7-3Z"></path><path d="m9.5 12 1.7 1.7 3.6-4"></path></svg>
              <span>01</span>
              <strong>{locale === 'nl' ? 'Veilige Stripe checkout' : 'Secure Stripe checkout'}</strong>
              <p>{locale === 'nl' ? 'Kaartbetalingen lopen via Stripe in een beveiligde checkout.' : 'Card payments run through Stripe in a protected checkout flow.'}</p>
            </div>
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16c4.5-1 7-4 8-9 1 5 3.5 8 8 9-4.5 1-7 4-8 5-1-1-3.5-4-8-5Z"></path></svg>
              <span>02</span>
              <strong>{locale === 'nl' ? 'Productie op basis van interesse' : 'Demand-led releases'}</strong>
              <p>{locale === 'nl' ? 'On-demand producten gaan pas richting productie wanneer er genoeg interesse is.' : 'On-demand pieces collect interest first, then move into production when the signal is strong enough.'}</p>
            </div>
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10l1 11H6L7 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
              <span>03</span>
              <strong>{locale === 'nl' ? 'No-size accessoires' : 'No-size essentials'}</strong>
              <p>{locale === 'nl' ? 'Bij elk product zie je afmetingen, materiaal en onderhoud voordat je koopt.' : 'Each piece uses clear dimensions, material notes, and care details instead of fit uncertainty.'}</p>
            </div>
          </div>
        </section>

        <section className="purchase-notes" aria-label="Purchase information">
          <div className="container purchase-notes__grid">
            <article>
              <p className="section-label">{locale === 'nl' ? 'Levering' : 'Delivery'}</p>
              <h2>{locale === 'nl' ? 'Duidelijk voor checkout.' : 'Clear before checkout.'}</h2>
              <p>{locale === 'nl' ? 'Beschikbare producten tonen voorraad op de productkaart. Bij producten op aanvraag kun je interesse achterlaten in plaats van direct afrekenen.' : 'Ready pieces show stock on the product card. Demand-led pieces show interest progress instead of a buy button, so customers always know what step they are taking.'}</p>
            </article>
            <article>
              <p className="section-label">{locale === 'nl' ? 'Materialen' : 'Materials'}</p>
              <h2>{locale === 'nl' ? 'Premium herkomst, praktisch onderhoud.' : 'Premium origins, practical care.'}</h2>
              <p>{locale === 'nl' ? 'Op de productpagina vind je materiaal, afwerking, afmetingen en onderhoud voordat je beslist.' : 'Product details highlight leather, silk, jewelry finish, dimensions, and care instructions before a customer commits.'}</p>
            </article>
          </div>
        </section>

        <section className="social-proof" aria-label="Luardani signals">
          <div className="container social-proof__grid">
            <div className="social-proof__intro fade-in">
              <p className="section-label">{locale === 'nl' ? 'Social proof' : 'Social first'}</p>
              <h2>{locale === 'nl' ? 'Gemaakt om te ontdekken, te bewaren en te delen.' : 'Built for discovery, saved for later.'}</h2>
            </div>
            <div className="social-proof__items fade-in">
              <p><span>{locale === 'nl' ? 'Familie-eigendom' : 'Family-owned'}</span> {locale === 'nl' ? 'Gebouwd rond de Marokkaanse familienaam van Fatima, niet rond een verzonnen label.' : "Built around Fatima's Moroccan family name, not a manufactured label."}</p>
              <p><span>{locale === 'nl' ? 'Gemaakt om te delen' : 'Social first'}</span> {locale === 'nl' ? 'Ontworpen voor ontdekking via Instagram, Pinterest en gedeelde productlinks.' : 'Designed for Instagram, Pinterest, and shareable product discovery.'}</p>
              <p><span>{locale === 'nl' ? 'Interesse als signaal' : 'Customer signal'}</span> {locale === 'nl' ? 'Bij producten op aanvraag helpt klantinteresse bepalen wat echt in productie gaat.' : 'Demand-led pieces let customers help decide what becomes a real production run.'}</p>
            </div>
          </div>
        </section>

        <section className="invitation" aria-label="Share Luardani">
          <div className="container invitation__inner fade-in">
            <div>
              <p className="section-label">{locale === 'nl' ? 'Deel Luardani' : 'Share Luardani'}</p>
              <h2>{locale === 'nl' ? 'Help mee bepalen wat we maken.' : 'Help choose what we make next.'}</h2>
              <p>{locale === 'nl' ? 'Deel Luardani met iemand met goede smaak. Elk bezoek en elk bewaard product helpt ons zien waar echt interesse voor is.' : 'Share the edit with someone whose taste you trust. Every visit and saved piece helps us understand what should become a real drop.'}</p>
            </div>
            <div className="invitation__actions">
              <button type="button" className="btn btn--solid" id="nativeShareButton">{locale === 'nl' ? 'Deel Luardani' : 'Share Luardani'}</button>
              <a className="btn btn--ghost" id="whatsAppShareLink" href="https://wa.me/?text=Luardani%20%E2%80%94%20premium%20no-size%20accessories%20for%20women.%20https%3A%2F%2Fluardani.com%2F" target="_blank" rel="noopener">WhatsApp</a>
              <button type="button" className="btn btn--ghost" id="copyShareButton">{locale === 'nl' ? 'Kopieer uitnodiging' : 'Copy invitation'}</button>
              <p className="share-message" id="shareMessage" role="status"></p>
            </div>
          </div>
        </section>

        <section className="newsletter" aria-label="Newsletter">
          <div className="container newsletter__inner">
            <p className="section-label">Updates</p>
            <h2>{locale === 'nl' ? 'Krijg als eerste toegang tot kleine oplages en nieuwe productrondes.' : 'Get early access to small batches and next-drop voting.'}</h2>
            <form className="newsletter__form">
              <input type="email" placeholder={locale === 'nl' ? 'E-mailadres' : 'Email address'} aria-label={locale === 'nl' ? 'E-mailadres' : 'Email address'} />
              <button type="submit">{locale === 'nl' ? 'Krijg vroege toegang' : 'Get early access'}</button>
            </form>
            <p className="newsletter__message" id="newsletterMessage" role="status"></p>
          </div>
        </section>
      </main>

      <aside className="cart" id="cart" aria-label="Shopping cart" aria-hidden="true">
        <div className="cart__panel">
          <div className="cart__header">
            <div>
              <p className="section-label">{labels.cart}</p>
              <h2>{locale === 'nl' ? 'Jouw winkelmand' : 'Your Cart'}</h2>
            </div>
            <button className="icon-button" id="cartClose" type="button" aria-label="Close cart">
              x
            </button>
          </div>
          <div className="cart__items" id="cartItems"></div>
          <div className="cart__footer">
            <div className="cart__total">
              <span>{locale === 'nl' ? 'Totaal' : 'Total'}</span>
              <strong id="cartTotal">&euro;0</strong>
            </div>
            <p className="cart__message" id="cartMessage" role="status"></p>
            <button className="checkout-button" id="checkoutButton" type="button">
              {locale === 'nl' ? 'Afrekenen' : 'Checkout'}
            </button>
          </div>
        </div>
      </aside>

      <section className="product-modal" id="productModal" aria-hidden="true" aria-label="Product details">
        <div className="product-modal__backdrop" id="productModalBackdrop"></div>
        <article className="product-modal__panel" id="productModalPanel"></article>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <a href="#" className="footer__logo">
            <span>LU</span>ARDANI
          </a>
          <nav className="language-switch language-switch--footer" aria-label="Language">
            <a href="https://luardani.nl/" data-language-link="nl">
              NL
            </a>
            <span aria-hidden="true">/</span>
            <a href="https://luardani.com/" data-language-link="en">
              EN
            </a>
          </nav>
          <p>&copy; 2026 Luardani. {locale === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </>
  )
}
