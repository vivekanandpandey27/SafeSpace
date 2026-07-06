# ============================================
# 🌐 SafeSpace Frontend — Dockerfile
# ============================================

# === STAGE 1: Build the React App ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy all source code
COPY . .

# Build the React app (creates a "dist" folder with HTML/CSS/JS)
RUN npm run build

# === STAGE 2: Serve with Nginx ===
FROM nginx:alpine

# Copy our built files into Nginx's serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config for React Router SPA support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
