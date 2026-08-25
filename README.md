# LEAD

LEAD is a modern B2B SaaS platform for discovering, organizing, qualifying, and exporting company and contact information.

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
2. Create the environment file
   ```bash
   cp .env.example .env
   ```
3. Start the stack
   ```bash
   npm run dev
   ```

## Production build

```bash
npm run build
```
