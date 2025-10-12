# Use Alpine Linux for minimal size
FROM node:16-alpine

# Install only essential packages for Chrome
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies (production only)
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 8080

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Start the application
CMD ["yarn", "start"]
