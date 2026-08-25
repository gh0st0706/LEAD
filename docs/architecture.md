# Architecture

LEAD uses a monorepo with a Next.js web app and a NestJS API. Shared packages house UI primitives, domain types, and configuration helpers.

## Runtime flow

1. The web app renders pages and calls the API through a single client layer.
2. The API handles HTTP requests through controllers and delegates business logic to services.
3. Services use Prisma repositories for persistence.
4. PostgreSQL stores application data.
