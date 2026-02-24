# backend/Dockerfile
FROM node:22-alpine

# Create app directory inside container
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies INSIDE container
RUN npm install

# Copy rest of backend source code
COPY . .

# Backend port
EXPOSE 5000

# Start in dev mode
CMD ["npm", "run", "dev"]