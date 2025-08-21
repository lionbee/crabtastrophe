# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S crabtastrophe -u 1001

# Change ownership of the app directory
RUN chown -R crabtastrophe:nodejs /app
USER crabtastrophe

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
