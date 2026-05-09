import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_sale_type" AS ENUM('standard', 'on-demand');
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Maison Luardani' NOT NULL,
  	"headline" varchar DEFAULT 'A Moroccan family Maison for the luxury nomad.' NOT NULL,
  	"intro" varchar DEFAULT 'Luardani bridges Moroccan heritage and modern minimalism through no-size essentials: leather goods, Anatolian Silk, Aegean Cotton, sculptural jewellery, and objects made with time rather than volume.' NOT NULL,
  	"story" jsonb NOT NULL,
  	"sourcing_title" varchar DEFAULT 'The Modern Silk Road' NOT NULL,
  	"sourcing_copy" varchar DEFAULT 'Our production between Morocco and Turkey is a strategic choice for quality: Morocco for leather, craft, and family heritage; Turkey for Anatolian Silk, Aegean Cotton, and refined textile finishing.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "products" ADD COLUMN "sale_type" "enum_products_sale_type" DEFAULT 'standard' NOT NULL;
  ALTER TABLE "products" ADD COLUMN "interest_count" numeric DEFAULT 0;
  ALTER TABLE "products" ADD COLUMN "threshold" numeric DEFAULT 50;
  ALTER TABLE "products" ADD COLUMN "material_story" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page" CASCADE;
  ALTER TABLE "products" DROP COLUMN "sale_type";
  ALTER TABLE "products" DROP COLUMN "interest_count";
  ALTER TABLE "products" DROP COLUMN "threshold";
  ALTER TABLE "products" DROP COLUMN "material_story";
  DROP TYPE "public"."enum_products_sale_type";`)
}
