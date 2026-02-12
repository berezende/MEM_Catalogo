# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage to serve with Nginx
FROM nginx:alpine
# Copy the built files from the builder stage
# IMPORTANT: The build output is in dist (from vite.config.ts)
# We copy it to /usr/share/nginx/html to match the root in nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
