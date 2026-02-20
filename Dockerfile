# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files for production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/scripts ./scripts

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port
EXPOSE 3000

# The start script uses tsx to run server/index.ts in production
CMD ["npm", "start"]
