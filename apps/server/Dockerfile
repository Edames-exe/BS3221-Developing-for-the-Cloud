# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy entire repo and install all deps (including dev)
COPY . .

# Install dependencies
RUN npm ci

# Build the NestJS server project with NX
RUN npx nx build server --configuration=production

# Stage 2: runtime
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only the built server and runtime deps
COPY --from=builder /app/dist/apps/server ./dist
COPY --from=builder /app/node_modules ./node_modules
# And any certs or other assets you need at runtime
COPY --from=builder /app/apps/server/certs ./certs

EXPOSE 3000
CMD ["node", "dist/main.js"]
