import { getPayload } from 'payload'
import config from '@payload-config'

type ProductType = 'ready-to-ship' | 'pre-order' | 'archive-sample'
type SaleType = 'standard' | 'on-demand'

const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text,
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0,
      },
    ],
    direction: 'ltr',
  },
})

const categories = [
  {
    name: 'Leather Goods',
    slug: 'leather-goods',
    description: 'Moroccan leather essentials shaped for the modern collector.',
  },
  {
    name: 'Silk & Cashmere',
    slug: 'silk-cashmere',
    description: 'Anatolian Silk, Aegean Cotton, and soft no-size layers.',
  },
  {
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Sculptural pieces with Turkish finishing and quiet presence.',
  },
  {
    name: 'Maison Luardani',
    slug: 'maison-luardani',
    description: 'Objects that carry the family Maison narrative.',
  },
  {
    name: 'Tech & Travel',
    slug: 'tech-travel',
    description: 'No-size objects for movement, work, and the luxury nomad.',
  },
  {
    name: 'The Vault',
    slug: 'the-vault',
    description: 'Archive samples and demand-driven patron concepts.',
  },
]

const products = [
  {
    name: 'The Safi Cardholder',
    slug: 'leather-cardholder',
    categorySlug: 'leather-goods',
    description: 'A compact no-size essential in Moroccan-finished grained leather, made for daily movement and quiet ceremony.',
    productType: 'ready-to-ship',
    saleType: 'standard',
    interestCount: 72,
    threshold: 100,
    materialStory: lexicalParagraph('Moroccan leather craft gives this piece its tactile authority, while the Luardani family eye keeps the silhouette spare, practical, and free of excess. It is Mediterranean Heritage translated into a daily object.'),
    material: 'Full-grain leather, selected in Morocco and finished with a soft satin touch',
    dimensions: '10 x 7 cm, six card slots',
    craftNote: 'Designed through the Luardani family lens: Moroccan leather knowledge, Mediterranean Heritage, precise edges, minimal bulk, and enough structure to age with use.',
    care: 'Wipe with a dry cotton cloth. Keep away from prolonged moisture and direct heat.',
    editionSize: 'Edition of 40',
    productionCommitment: 72,
    price: 18900,
    inventory: 20,
    externalImage: 'https://images.unsplash.com/photo-1689757322241-72ee12442155?auto=format&fit=crop&q=80&w=1200',
    alt: 'Minimal leather cardholder held in hand',
  },
  {
    name: 'The Marrakech Tote',
    slug: 'toscana-handbag',
    categorySlug: 'leather-goods',
    description: 'A structured patron piece in Moroccan leather, selected for proportion, utility, and lasting presence.',
    productType: 'pre-order',
    saleType: 'on-demand',
    interestCount: 64,
    threshold: 100,
    materialStory: lexicalParagraph('This tote is produced only when patron commitment is strong enough to justify a batch. Morocco brings leather heritage; Turkey supports refined finishing standards; the result is a slower Modern Silk Road model.'),
    material: 'Moroccan full-grain leather with brushed gold-toned hardware',
    dimensions: '32 x 24 x 12 cm, detachable interior pouch',
    craftNote: 'Produced between Morocco and Turkey by design, not compromise: Morocco for leather heritage, Turkey for refined finishing discipline, and the Luardani family for final restraint.',
    care: 'Store filled and upright in its dust bag. Condition lightly when the leather begins to feel dry.',
    editionSize: 'Patron batch of 24',
    productionCommitment: 64,
    price: 34900,
    inventory: 12,
    externalImage: 'https://images.unsplash.com/photo-1691480250099-a63081ecfcb8?auto=format&fit=crop&q=80&w=1200',
    alt: 'Brown leather handbag on a quiet white background',
  },
  {
    name: 'The Noor Silk Square',
    slug: 'silk-scarf',
    categorySlug: 'silk-cashmere',
    description: 'An Anatolian Silk square with a soft drape, designed as a no-size layer for travel, ritual, and evening light.',
    productType: 'ready-to-ship',
    saleType: 'standard',
    interestCount: 81,
    threshold: 100,
    materialStory: lexicalParagraph('Anatolian Silk is chosen for its fluid hand, light structure, and long textile lineage. The Luardani family selects it for pieces that feel international without losing their Mediterranean Heritage.'),
    material: 'Anatolian Silk twill with hand-rolled edges',
    dimensions: '90 x 90 cm',
    craftNote: 'Turkey gives this piece its textile authority: Anatolian Silk, clean finishing, and a fluid hand chosen by the Luardani family for Mediterranean Heritage without ornament.',
    care: 'Dry clean only or steam gently from distance. Store folded in tissue paper.',
    editionSize: 'Edition of 60',
    productionCommitment: 81,
    price: 12900,
    inventory: 30,
    externalImage: 'https://images.unsplash.com/photo-1635417198137-75d31b8045e2?auto=format&fit=crop&q=80&w=1200',
    alt: 'Folded silk scarf with refined pattern',
  },
  {
    name: 'The Medina Slipper',
    slug: 'leather-slippers',
    categorySlug: 'the-vault',
    description: 'Soft Moroccan leather slippers shaped for ease: a quiet object for home, journey, and pause.',
    productType: 'archive-sample',
    saleType: 'on-demand',
    interestCount: 46,
    threshold: 80,
    materialStory: lexicalParagraph('A concept from the Maison archive, rooted in Moroccan indoor craft and reworked with a minimalist language. It moves forward only if patrons ask for it.'),
    material: 'Moroccan leather upper with padded lambskin lining',
    dimensions: 'No-size house slipper sample, flexible back construction',
    craftNote: 'A family archive direction rooted in Moroccan indoor craft, refined for a contemporary Maison rhythm rather than souvenir tradition.',
    care: 'Brush gently with a clean suede brush. Avoid outdoor rain and abrasive stone.',
    editionSize: 'Sample concept',
    productionCommitment: 46,
    price: 15900,
    inventory: 18,
    externalImage: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luxury leather slippers in neutral light',
  },
  {
    name: 'The Atlas Sunglass',
    slug: 'catania-sunglasses',
    categorySlug: 'tech-travel',
    description: 'Sculptural sunglasses for the modern nomad, produced in a limited patron-led edit.',
    productType: 'pre-order',
    saleType: 'on-demand',
    interestCount: 58,
    threshold: 100,
    materialStory: lexicalParagraph('The Atlas Sunglass belongs to the travel language of Luardani: no sizing, strong silhouette, and Mediterranean Heritage expressed through restraint rather than logo.'),
    material: 'Polished acetate with warm Mediterranean gradient lenses',
    dimensions: '50 mm lens, 145 mm temple',
    craftNote: 'A restrained frame with a softened square line, designed to carry Mediterranean Heritage quietly: graphic, warm, and never loud.',
    care: 'Clean with the provided lens cloth. Store in its case when travelling.',
    editionSize: 'Patron batch of 36',
    productionCommitment: 58,
    price: 22000,
    inventory: 16,
    externalImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200',
    alt: 'Minimal luxury sunglasses',
  },
  {
    name: 'The Riad Mini Bag',
    slug: 'riad-mini-bag',
    categorySlug: 'leather-goods',
    description: 'A compact Moroccan leather evening bag with a clean top handle and a quiet, architectural silhouette.',
    productType: 'pre-order',
    saleType: 'on-demand',
    interestCount: 67,
    threshold: 100,
    materialStory: lexicalParagraph('Moroccan nappa creates the exterior warmth; Aegean Cotton lining gives the interior softness. Production is considered only when enough patrons commit to the piece.'),
    material: 'Smooth Moroccan nappa leather with tonal Aegean Cotton lining',
    dimensions: '21 x 14 x 7 cm',
    craftNote: 'Moroccan leather gives the body warmth and tactility; Aegean Cotton lining brings the interior softness and durability the family insists on.',
    care: 'Store in dust bag. Avoid perfume, oils, and direct sunlight on light leather.',
    editionSize: 'Patron batch of 30',
    productionCommitment: 67,
    price: 29500,
    inventory: 10,
    externalImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200',
    alt: 'Structured leather handbag in warm neutral tones',
  },
  {
    name: 'The Tadelakt Pouch',
    slug: 'tadelakt-pouch',
    categorySlug: 'tech-travel',
    description: 'A soft Moroccan leather pouch for phone, keys, cards, and the small objects that move through a day.',
    productType: 'ready-to-ship',
    saleType: 'standard',
    interestCount: 74,
    threshold: 100,
    materialStory: lexicalParagraph('Aegean Cotton lines the interior for softness and durability, while Moroccan leather gives the pouch a warmer hand than industrial accessories.'),
    material: 'Pebbled Moroccan leather with Aegean Cotton canvas lining',
    dimensions: '19 x 12 cm, wrist strap included',
    craftNote: 'A simple pouch with enough tactility to become personal quickly: Moroccan leather outside, Aegean Cotton inside, soft edges, clean zip, no ornament.',
    care: 'Wipe clean with a dry cloth. Fill gently when storing to preserve the shape.',
    editionSize: 'Edition of 50',
    productionCommitment: 74,
    price: 14500,
    inventory: 22,
    externalImage: 'https://images.unsplash.com/photo-1639789972237-7ee9434066ed?auto=format&fit=crop&q=80&w=1200',
    alt: 'Black leather wallet and cardholder still life',
  },
  {
    name: 'The Zayna Cuff',
    slug: 'zayna-cuff',
    categorySlug: 'jewelry',
    description: 'A sculptural gold-toned cuff with a softened edge, made to anchor a minimal uniform.',
    productType: 'pre-order',
    saleType: 'on-demand',
    interestCount: 62,
    threshold: 90,
    materialStory: lexicalParagraph('Finished in Turkey for precision and polish, then edited through the Luardani family eye. A quiet jewellery object for patrons who prefer form over ornament.'),
    material: 'Gold-plated brass with polished interior, finished in Turkey',
    dimensions: 'Adjustable open cuff, 18 mm width',
    craftNote: 'Finished in Turkey for precision and polish, then edited through the Luardani family eye: one decisive gesture, enough weight to feel intentional.',
    care: 'Avoid water, lotions, and perfume. Polish with a soft dry cloth after wear.',
    editionSize: 'Patron batch of 45',
    productionCommitment: 62,
    price: 9800,
    inventory: 14,
    externalImage: 'https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gold bracelet worn on wrist',
  },
  {
    name: 'The Amira Hoops',
    slug: 'amira-hoops',
    categorySlug: 'jewelry',
    description: 'Fine gold-toned hoops with a precise circular line, designed for everyday ceremony.',
    productType: 'ready-to-ship',
    saleType: 'standard',
    interestCount: 83,
    threshold: 100,
    materialStory: lexicalParagraph('Turkish finishing gives the hoops their clean surface and precise line. The Maison keeps the design minimal so the object can become personal through wear.'),
    material: 'Turkish-finished gold-plated brass with hypoallergenic posts',
    dimensions: '28 mm diameter',
    craftNote: 'A quiet frame for the face, shaped by Turkish finishing skill and Luardani restraint: reflective, light, and free of decorative excess.',
    care: 'Store separately to avoid scratches. Remove before sleep and water.',
    editionSize: 'Edition of 70',
    productionCommitment: 83,
    price: 8900,
    inventory: 28,
    externalImage: 'https://images.unsplash.com/photo-1723361656146-f201d215c49c?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gold toned earrings on a white background',
  },
  {
    name: 'The Lalla Ring Set',
    slug: 'lalla-ring-set',
    categorySlug: 'the-vault',
    description: 'A stack of slim rings in warm gold tones, made to be worn together or separated through the week.',
    productType: 'archive-sample',
    saleType: 'on-demand',
    interestCount: 39,
    threshold: 75,
    materialStory: lexicalParagraph('A Vault concept exploring Turkish finishing, slim silhouettes, and Mediterranean Heritage through a disciplined ring stack.'),
    material: 'Turkish-finished gold-plated brass, polished and brushed surfaces',
    dimensions: 'Sample ring stack, multiple sizes planned',
    craftNote: 'An archive study in rhythm: Turkish finishing, slim circles, different surfaces, one restrained Mediterranean Heritage language.',
    care: 'Keep dry. Store in the provided pouch and polish with a soft cloth.',
    editionSize: 'Sample concept',
    productionCommitment: 39,
    price: 11200,
    inventory: 8,
    externalImage: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gold rings on a light neutral surface',
  },
  {
    name: 'The Kasbah Silk Wrap',
    slug: 'kasbah-silk-wrap',
    categorySlug: 'silk-cashmere',
    description: 'An oversized Anatolian Silk wrap for travel, evening, and interiors, cut for movement rather than measurement.',
    productType: 'pre-order',
    saleType: 'on-demand',
    interestCount: 55,
    threshold: 100,
    materialStory: lexicalParagraph('Anatolian Silk and modal are selected in Turkey for drape, breathability, and refined textile performance. The wrap is no-size by design: one object, many rituals.'),
    material: 'Anatolian Silk and modal blend with a fluid matte finish',
    dimensions: '180 x 70 cm',
    craftNote: 'Created in Turkey for textile quality and selected by the Luardani family for the in-between moments: airport, terrace, dinner, cool morning, late return.',
    care: 'Dry clean recommended. Fold loosely and avoid snagging against jewelry.',
    editionSize: 'Patron batch of 40',
    productionCommitment: 55,
    price: 18500,
    inventory: 15,
    externalImage: 'https://images.unsplash.com/photo-1603400521630-9f2de124b33b?auto=format&fit=crop&q=80&w=1200',
    alt: 'Neutral silk wrap and soft fabric folds',
  },
  {
    name: 'The Nomad Key Case',
    slug: 'nomad-key-case',
    categorySlug: 'tech-travel',
    description: 'A small Moroccan leather key case that keeps the practical objects of the day composed.',
    productType: 'ready-to-ship',
    saleType: 'standard',
    interestCount: 79,
    threshold: 100,
    materialStory: lexicalParagraph('A deliberately modest piece of Moroccan leather craft, made beautifully because it is touched often. A small expression of the Luardani family standard.'),
    material: 'Moroccan grained leather with brushed gold-toned ring',
    dimensions: '11 x 6 cm',
    craftNote: 'A deliberately modest object, made beautifully because it is touched often; Moroccan leather craft, Mediterranean Heritage, and family-level attention in miniature.',
    care: 'Wipe with a dry cloth. Allow natural patina to develop over time.',
    editionSize: 'Edition of 80',
    productionCommitment: 79,
    price: 7900,
    inventory: 34,
    externalImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
    alt: 'Small leather goods on a neutral surface',
  },
]

const payload = await getPayload({ config })
const categoryIds = new Map<string, number>()

for (const category of categories) {
  const existing = await payload.find({
    collection: 'categories',
    limit: 1,
    where: {
      slug: {
        equals: category.slug,
      },
    },
  })

  if (existing.totalDocs > 0) {
    const updated = await payload.update({
      collection: 'categories',
      id: existing.docs[0].id,
      data: category,
    })
    categoryIds.set(category.slug, Number(updated.id))
  } else {
    const created = await payload.create({
      collection: 'categories',
      data: category,
    })
    categoryIds.set(category.slug, Number(created.id))
  }
}

for (const product of products) {
  const { categorySlug, ...productData } = product
  const existing = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      slug: {
        equals: product.slug,
      },
    },
  })

  if (existing.totalDocs > 0) {
    await payload.update({
      collection: 'products',
      id: existing.docs[0].id,
      data: {
        ...productData,
        category: categoryIds.get(categorySlug),
        productType: product.productType as ProductType,
        saleType: product.saleType as SaleType,
        currency: 'eur',
        status: 'published',
      } as any,
    })
    continue
  }

  await payload.create({
    collection: 'products',
    data: {
      ...productData,
      category: categoryIds.get(categorySlug),
      productType: product.productType as ProductType,
      saleType: product.saleType as SaleType,
      currency: 'eur',
      status: 'published',
    } as any,
  })
}

console.log(`Seeded ${products.length} products`)
process.exit(0)
