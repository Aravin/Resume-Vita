# Use Alpine Linux for minimal size
FROM node:20-alpine

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

# Install all dependencies (including dev dependencies for build)
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Remove dev dependencies after build to reduce image size
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Expose port
EXPOSE 8080

# Set environment variables for Puppeteer and memory optimization
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_OPTIONS="--max-old-space-size=768 --expose-gc"

# Set default port (can be overridden by Cloud Run)
ENV PORT=8080

# Start the application
CMD ["yarn", "start"]
