# Use official Node.js image as a base
FROM node:latest

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before copying other files
# This helps leverage Docker's caching mechanism for faster builds
COPY package*.json ./

# Copy .env file
COPY .env .env

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port (adjust based on your NestJS app configuration)
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]