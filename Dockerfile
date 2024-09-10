FROM php:8.2-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    composer \
    nodejs \
    npm

# Copy composer.json and composer.lock
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install

# Copy the rest of your project (excluding .env)
COPY --from=none . .

# Set working directory
WORKDIR /app

# Install Node.js dependencies
RUN npm install

# Copy .env.example and rename it to .env
COPY .env.example .env

# Expose ports
EXPOSE 8000 3000

# Define commands to run
CMD ["sh", "-c", "npm run dev & php artisan serve"]