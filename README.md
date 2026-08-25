# LEAD

LEAD is a working B2B sales-pipeline MVP. A user can capture a prospect, store it in PostgreSQL, view pipeline metrics, change the opportunity stage, and delete the record.

## Demo flow

1. Add a contact, company, email and estimated deal value.
2. The Next.js client sends the form to `POST /api/leads`.
3. NestJS validates it and Prisma persists it in PostgreSQL.
4. Change the lead through New, Contacted, Qualified, Won or Lost.
5. Dashboard totals update immediately.

## Run locally

The simplest route requires Docker Desktop:

```bash
docker compose up --build
```

Open `http://localhost:3000`. The API runs at `http://localhost:3001/api`.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/leads` | List leads |
| `POST` | `/api/leads` | Create and validate a lead |
| `PATCH` | `/api/leads/:id/status` | Move a lead to another stage |
| `DELETE` | `/api/leads/:id` | Delete a lead |

## Architecture

- `apps/web`: Next.js dashboard
- `apps/api`: NestJS REST API and Prisma schema
- `packages/*`: shared workspace packages
- PostgreSQL: persistent lead storage
- Docker Compose: local database, API and web orchestration

## Monorepo structure

- apps/web — Next.js 16 frontend
- apps/api — NestJS API
- packages/ui — shared UI primitives
- packages/types — shared TypeScript types
- packages/config — shared configuration utilities
- docker — container assets
- docs — architecture and deployment documentation

## Development

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the stack
   ```bash
   npm run dev
   ```

## Production build

```bash
npm run build
```
