FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/prisma ./apps/api/prisma
COPY packages ./packages
COPY tsconfig.base.json ./tsconfig.base.json
RUN npm install
RUN npm run db:generate --workspace @lead/api
COPY apps/api/src ./apps/api/src
EXPOSE 3001
CMD ["sh", "-c", "npx prisma db push --schema apps/api/prisma/schema.prisma && npm run dev --workspace @lead/api"]
