# ============================================
# 🔧 SafeSpace Backend — Dockerfile
# ============================================

# Step 1: Start with Node.js 20 (Alpine = tiny Linux, only ~50MB!)
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files FIRST (for better caching)
COPY package.json package-lock.json ./

# Step 4: Install production dependencies only
RUN npm ci --only=production

# Step 5: Copy the rest of your code
COPY . .

# Step 6: Tell Docker which port the backend uses
EXPOSE 5000

# Step 7: The command to START the backend
CMD ["node", "Server.js"]
