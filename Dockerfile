FROM node:22-alpine AS base

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Build stage
FROM base AS build
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage
FROM node:22-alpine AS production

# Install dumb-init
RUN apk add --no-cache dumb-init

# Create non-root user and group
RUN addgroup -g 1001 -S nodejs && \
    adduser -S vite -u 1001 -G nodejs

# Set working directory
WORKDIR /usr/src/app

# Copy all dependencies (vite preview needs dev deps to load config)
COPY --from=build --chown=vite:nodejs /usr/src/app/node_modules ./node_modules

# Copy built application with proper ownership
COPY --from=build --chown=vite:nodejs /usr/src/app/dist ./dist

# Copy package.json and vite config for preview server
COPY --from=build --chown=vite:nodejs /usr/src/app/package*.json ./
COPY --from=build --chown=vite:nodejs /usr/src/app/vite.config.* ./

# Switch to non-root user
USER vite

# Expose port
EXPOSE 5174

# Use dumb-init for proper signal handling and start the preview server
ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5174"]
