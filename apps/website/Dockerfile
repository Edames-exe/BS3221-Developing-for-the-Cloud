# apps/website/Dockerfile

# 1) Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the full repo so NX can find workspace.json, nx.json, tsconfig, etc.
COPY . .

# Install all dependencies (including devDependencies for the build)
RUN npm ci

# Build only the React app
RUN npx nx build website --configuration=production

# 2) Serve with nginx
FROM nginx:stable-alpine
# Remove default files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built static output from the builder stage
COPY --from=builder /app/dist/apps/website /usr/share/nginx/html

# (Optional) If you have an nginx.conf for SPA routing, copy it here:
# COPY apps/website/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
