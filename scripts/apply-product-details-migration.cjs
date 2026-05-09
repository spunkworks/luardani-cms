const { Client } = require('pg')

const migrationName = '20260508_211147_product_details'

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()

  const existing = await client.query(
    "select id from payload_migrations where name = $1 limit 1",
    [migrationName],
  )

  if (existing.rowCount > 0) {
    console.log(`${migrationName} already recorded`)
    await client.end()
    return
  }

  await client.query('begin')
  try {
    await client.query(`
      do $$
      begin
        if not exists (select 1 from pg_type where typname = 'enum_products_product_type') then
          create type "public"."enum_products_product_type" as enum ('ready-to-ship', 'pre-order', 'archive-sample');
        end if;
      end $$;

      alter table "products" add column if not exists "product_type" "enum_products_product_type" default 'ready-to-ship' not null;
      alter table "products" add column if not exists "material" varchar;
      alter table "products" add column if not exists "dimensions" varchar;
      alter table "products" add column if not exists "craft_note" varchar;
      alter table "products" add column if not exists "care" varchar;
      alter table "products" add column if not exists "edition_size" varchar;
      alter table "products" add column if not exists "production_commitment" numeric;
    `)

    const latestBatch = await client.query('select coalesce(max(batch), 0) + 1 as batch from payload_migrations')
    await client.query(
      'insert into payload_migrations (name, batch, updated_at, created_at) values ($1, $2, now(), now())',
      [migrationName, latestBatch.rows[0].batch],
    )

    await client.query('commit')
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    await client.end()
  }

  console.log(`${migrationName} applied`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
