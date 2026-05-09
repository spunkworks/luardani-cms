import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_product_type" AS ENUM('ready-to-ship', 'pre-order', 'archive-sample');
  ALTER TABLE "products" ADD COLUMN "product_type" "enum_products_product_type" DEFAULT 'ready-to-ship' NOT NULL;
  ALTER TABLE "products" ADD COLUMN "material" varchar;
  ALTER TABLE "products" ADD COLUMN "dimensions" varchar;
  ALTER TABLE "products" ADD COLUMN "craft_note" varchar;
  ALTER TABLE "products" ADD COLUMN "care" varchar;
  ALTER TABLE "products" ADD COLUMN "edition_size" varchar;
  ALTER TABLE "products" ADD COLUMN "production_commitment" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN "product_type";
  ALTER TABLE "products" DROP COLUMN "material";
  ALTER TABLE "products" DROP COLUMN "dimensions";
  ALTER TABLE "products" DROP COLUMN "craft_note";
  ALTER TABLE "products" DROP COLUMN "care";
  ALTER TABLE "products" DROP COLUMN "edition_size";
  ALTER TABLE "products" DROP COLUMN "production_commitment";
  DROP TYPE "public"."enum_products_product_type";`)
}
