FROM node:18-slim

# Create working directory inside container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy all other source files
COPY . .

# Set environment (optional fallback)
ENV NODE_ENV=production
ENV PORT=8080

# Expose the required port
EXPOSE 8080

# Start the app
CMD ["node", "app.js"]
