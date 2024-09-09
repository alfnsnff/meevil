# Use the official PHP image with FPM
FROM php:8.2-fpm

# Install necessary system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    npm \
    nginx \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js and npm (make sure Node.js version is compatible with your app)
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Install PHP dependencies with Composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy Laravel project files
COPY . .

# Install Node.js dependencies and build frontend
RUN npm install && npm run build

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start PHP-FPM and Nginx
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
