# Stage 1: Install Node.js dependencies and build assets
FROM node:18-alpine as node_builder

WORKDIR /app

# Copy only the necessary files for Node.js
COPY package*.json ./

# Install Node.js dependencies (React, TypeScript)
RUN npm install

# Copy the rest of the project files and build the assets
COPY . .
RUN npm run build

# Stage 2: Install PHP dependencies and set up Laravel
FROM php:8.2-fpm-alpine

# Install system dependencies, PHP extensions, and Composer dependencies
RUN apk add --no-cache nginx curl git bash \
    libpng-dev libjpeg-turbo-dev libwebp-dev libfreetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql gd \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy the composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy the application code
COPY . .

# Copy the built assets from node_builder stage
COPY --from=node_builder /app/public /var/www/html/public

# Set proper permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copy Nginx config and set permissions
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose the port that Nginx will use
EXPOSE 8080

# Start PHP-FPM and Nginx
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
