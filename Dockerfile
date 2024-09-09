# Use the official PHP image with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install necessary system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    npm \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js and npm (make sure Node.js version is compatible with your app)
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# Copy Laravel project files
COPY . .

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Install PHP dependencies with Composer
RUN composer install --no-dev --optimize-autoloader

# Install Node.js dependencies and build frontend
RUN npm install && npm run build

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Change the default Apache port to 8080 (Cloud Run uses 8080)
RUN sed -i 's/80/8080/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Start Apache server
CMD ["apache2-foreground"]
