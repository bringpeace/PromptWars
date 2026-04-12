FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl

# ---- Dependencies ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# ---- Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client
RUN npx prisma generate
RUN npm run build

# ---- Runner ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy prisma schema and the prisma CLI if needed, but better to use the generated client
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# Copy the entire node_modules from builder to ensure prisma CLI and other deps are there for start-up tasks
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 8080

# Push DB schema then start server. 
# Using node_modules/.bin/prisma directly to avoid npx install overhead
CMD ./node_modules/.bin/prisma db push --skip-generate && node server.js
