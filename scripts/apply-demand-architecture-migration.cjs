const { Client } = require('pg')

const migrationName = '20260508_213702_demand_architecture'

const aboutStory = {
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
            text:
              'Maison Luardani is a Moroccan family Maison shaped for patrons who value time, material, and cultural intelligence over visible logos. Our language is quiet: leather goods, Anatolian Silk, Aegean Cotton, jewellery, travel objects, and home rituals made without the pressure of mass production.',
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
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            mode: 'normal',
            text:
              'Our production between Morocco and Turkey is deliberate: Morocco carries the soul of leather and craft; Turkey brings high-end textile knowledge through Anatolian Silk and Aegean Cotton. Together they form our Modern Silk Road.',
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
}

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
        if not exists (select 1 from pg_type where typname = 'enum_products_sale_type') then
          create type "public"."enum_products_sale_type" as enum ('standard', 'on-demand');
        end if;
      end $$;

      create table if not exists "about_page" (
        "id" serial primary key,
        "eyebrow" varchar default 'Maison Luardani' not null,
        "headline" varchar default 'A Moroccan family Maison for the luxury nomad.' not null,
        "intro" varchar default 'Luardani bridges Moroccan heritage and modern minimalism through no-size essentials: leather goods, Anatolian Silk, Aegean Cotton, sculptural jewellery, and objects made with time rather than volume.' not null,
        "story" jsonb,
        "sourcing_title" varchar default 'The Modern Silk Road' not null,
        "sourcing_copy" varchar default 'Our production between Morocco and Turkey is a strategic choice for quality: Morocco for leather, craft, and family heritage; Turkey for Anatolian Silk, Aegean Cotton, and refined textile finishing.' not null,
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
      );

      alter table "products" add column if not exists "sale_type" "enum_products_sale_type" default 'standard' not null;
      alter table "products" add column if not exists "interest_count" numeric default 0;
      alter table "products" add column if not exists "threshold" numeric default 50;
      alter table "products" add column if not exists "material_story" jsonb;
    `)

    await client.query(
      `
        insert into about_page (
          id, eyebrow, headline, intro, story, sourcing_title, sourcing_copy, updated_at, created_at
        )
        values (
          1,
          'Maison Luardani',
          'A Moroccan family Maison for the luxury nomad.',
          'Luardani bridges Moroccan heritage and modern minimalism through no-size essentials: leather goods, Anatolian Silk, Aegean Cotton, sculptural jewellery, and objects made with time rather than volume.',
          $1,
          'The Modern Silk Road',
          'Our production between Morocco and Turkey is a strategic choice for quality: Morocco for leather, craft, and family heritage; Turkey for Anatolian Silk, Aegean Cotton, and refined textile finishing.',
          now(),
          now()
        )
        on conflict (id) do update set
          eyebrow = excluded.eyebrow,
          headline = excluded.headline,
          intro = excluded.intro,
          story = excluded.story,
          sourcing_title = excluded.sourcing_title,
          sourcing_copy = excluded.sourcing_copy,
          updated_at = now()
      `,
      [aboutStory],
    )

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
