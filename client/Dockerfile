# client/Dockerfile

# Use official Node runtime as a parent image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite default port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]