# syntax=docker/dockerfile:1.6

FROM node:24-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy file dependency
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN pnpm run build

FROM caddy:2.7-alpine AS runner
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /usr/share/caddy
EXPOSE 80
EXPOSE 443