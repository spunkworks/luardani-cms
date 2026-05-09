const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

function loadProducts() {
  const source = fs.readFileSync(path.join(__dirname, 'seed-products.ts'), 'utf8')
  const categoriesMatch = source.match(/const categories = \[([\s\S]*?)\]\s*\n\nconst products/)
  const match = source.match(/const products = \[([\s\S]*?)\]\s*\n\nconst payload/)
  if (!categoriesMatch) throw new Error('Could not extract categories array from seed-products.ts')
  if (!match) throw new Error('Could not extract products array from seed-products.ts')
  const lexicalParagraph = (text) => ({
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
          children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
          direction: 'ltr',
          textStyle: '',
          textFormat: 0,
        },
      ],
      direction: 'ltr',
    },
  })
  return {
    categories: Function(`return [${categoriesMatch[1]}]`)(),
    products: Function('lexicalParagraph', `return [${match[1]}]`)(lexicalParagraph),
  }
}

async function main() {
  const { categories, products } = loadProducts()
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()
  try {
    const categoryIds = new Map()
    for (const category of categories) {
      const result = await client.query(
        `
          insert into categories (name, slug, description, updated_at, created_at)
          values ($1, $2, $3, now(), now())
          on conflict (slug) do update set
            name = excluded.name,
            description = excluded.description,
            updated_at = now()
          returning id
        `,
        [category.name, category.slug, category.description],
      )
      categoryIds.set(category.slug, result.rows[0].id)
    }

    for (const product of products) {
      await client.query(
        `
          insert into products (
            name, slug, status, category_id, description, product_type, sale_type,
            interest_count, threshold, material_story, material, dimensions,
            craft_note, care, edition_size, production_commitment, price, currency,
            inventory, external_image, alt, updated_at, created_at
          )
          values (
            $1, $2, 'published', $3, $4, $5, $6,
            $7, $8, $9, $10, $11,
            $12, $13, $14, $15, $16, 'eur',
            $17, $18, $19, now(), now()
          )
          on conflict (slug) do update set
            name = excluded.name,
            status = excluded.status,
            category_id = excluded.category_id,
            description = excluded.description,
            product_type = excluded.product_type,
            sale_type = excluded.sale_type,
            interest_count = excluded.interest_count,
            threshold = excluded.threshold,
            material_story = excluded.material_story,
            material = excluded.material,
            dimensions = excluded.dimensions,
            craft_note = excluded.craft_note,
            care = excluded.care,
            edition_size = excluded.edition_size,
            production_commitment = excluded.production_commitment,
            price = excluded.price,
            currency = excluded.currency,
            inventory = excluded.inventory,
            external_image = excluded.external_image,
            alt = excluded.alt,
            updated_at = now()
        `,
        [
          product.name,
          product.slug,
          categoryIds.get(product.categorySlug),
          product.description,
          product.productType,
          product.saleType,
          product.interestCount,
          product.threshold,
          product.materialStory,
          product.material,
          product.dimensions,
          product.craftNote,
          product.care,
          product.editionSize,
          product.productionCommitment,
          product.price,
          product.inventory,
          product.externalImage,
          product.alt,
        ],
      )
    }
  } finally {
    await client.end()
  }

  console.log(`Seeded ${products.length} products directly`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
