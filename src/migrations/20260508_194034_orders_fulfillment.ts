import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_orders_fulfillment_status" AS ENUM('unfulfilled', 'processing', 'fulfilled', 'canceled');
  ALTER TABLE "orders" ADD COLUMN "fulfillment_status" "enum_orders_fulfillment_status" DEFAULT 'unfulfilled' NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "stripe_customer_id" varchar;
  ALTER TABLE "orders" ADD COLUMN "shipping_address" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" DROP COLUMN "fulfillment_status";
  ALTER TABLE "orders" DROP COLUMN "stripe_customer_id";
  ALTER TABLE "orders" DROP COLUMN "shipping_address";
  DROP TYPE "public"."enum_orders_fulfillment_status";`)
}
