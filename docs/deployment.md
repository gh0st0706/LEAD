# Deployment

LEAD is designed to deploy the frontend on Vercel and the backend on Railway with Neon PostgreSQL.

## Vercel frontend

The repository declares `apps/web` as the Vercel root directory in `vercel.json`, so importing the repo in Vercel deploys the Next.js app instead of treating the monorepo root as the application.

If you deploy with the Vercel CLI, link the monorepo from the repository root:

```bash
vercel link --repo
vercel pull
vercel deploy
```

## Backend

`apps/api` is a separate NestJS service and should be deployed outside this Vercel project, for example on Railway.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```
