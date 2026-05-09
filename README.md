# Luardani

Next.js + Payload CMS project configured for PostgreSQL. Use a Supabase Postgres connection string for `DATABASE_URL`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/admin` to create the first Payload admin user.

## Environment variables

Create `.env` locally and set the same values in Vercel:

```bash
DATABASE_URL=postgres://postgres.PROJECT_REF:YOUR_PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres
PAYLOAD_SECRET=generate-a-long-random-secret
```

For Supabase, start with the Session pooler connection string on port `5432`. Supabase recommends transaction mode for serverless traffic, but transaction mode does not support prepared statements; session mode is the safer first setup for Payload/Postgres.

## Vercel

Set the Vercel build command to:

```bash
npm run ci
```

That runs pending Payload migrations before `next build`. If you have not created migrations yet, run this after your Supabase connection string is configured:

```bash
npm run payload migrate:create initial
```
