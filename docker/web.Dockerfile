FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/web/tsconfig.json ./apps/web/tsconfig.json
COPY apps/web/next-env.d.ts ./apps/web/next-env.d.ts
COPY apps/web/next.config.ts ./apps/web/next.config.ts
COPY apps/web/postcss.config.js ./apps/web/postcss.config.js
COPY apps/web/tailwind.config.ts ./apps/web/tailwind.config.ts
COPY apps/web/app ./apps/web/app
COPY packages ./packages
COPY tsconfig.base.json ./tsconfig.base.json
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace", "@lead/web"]
