const { Client } = require('pg')

const migrationName = '20260508_215030_product_inquiries'

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()
  const existing = await client.query('select id from payload_migrations where name = $1 limit 1', [
    migrationName,
  ])

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
        if not exists (select 1 from pg_type where typname = 'enum_product_inquiries_status') then
          create type "public"."enum_product_inquiries_status" as enum ('new', 'reviewed', 'contacted');
        end if;
      end $$;

      create table if not exists "product_inquiries" (
        "id" serial primary key,
        "product_id" integer not null,
        "email" varchar not null,
        "note" varchar,
        "source" varchar default 'luardani-storefront' not null,
        "status" "enum_product_inquiries_status" default 'new' not null,
        "updated_at" timestamp(3) with time zone default now() not null,
        "created_at" timestamp(3) with time zone default now() not null
      );

      alter table "payload_locked_documents_rels" add column if not exists "product_inquiries_id" integer;

      do $$
      begin
        if not exists (select 1 from pg_constraint where conname = 'product_inquiries_product_id_products_id_fk') then
          alter table "product_inquiries"
          add constraint "product_inquiries_product_id_products_id_fk"
          foreign key ("product_id") references "public"."products"("id") on delete cascade on update no action;
        end if;
      end $$;

      create index if not exists "product_inquiries_product_idx" on "product_inquiries" using btree ("product_id");
      create index if not exists "product_inquiries_updated_at_idx" on "product_inquiries" using btree ("updated_at");
      create index if not exists "product_inquiries_created_at_idx" on "product_inquiries" using btree ("created_at");
      create index if not exists "payload_locked_documents_rels_product_inquiries_id_idx" on "payload_locked_documents_rels" using btree ("product_inquiries_id");
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
