import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_inquiries_status" AS ENUM('new', 'reviewed', 'contacted');
  CREATE TABLE "product_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"email" varchar NOT NULL,
  	"note" varchar,
  	"source" varchar DEFAULT 'luardani-storefront' NOT NULL,
  	"status" "enum_product_inquiries_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_inquiries_id" integer;
  ALTER TABLE "product_inquiries" ADD CONSTRAINT "product_inquiries_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "product_inquiries_product_idx" ON "product_inquiries" USING btree ("product_id");
  CREATE INDEX "product_inquiries_updated_at_idx" ON "product_inquiries" USING btree ("updated_at");
  CREATE INDEX "product_inquiries_created_at_idx" ON "product_inquiries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_inquiries_fk" FOREIGN KEY ("product_inquiries_id") REFERENCES "public"."product_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_product_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("product_inquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_inquiries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_inquiries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_inquiries_fk";
  
  DROP INDEX "payload_locked_documents_rels_product_inquiries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_inquiries_id";
  DROP TYPE "public"."enum_product_inquiries_status";`)
}
