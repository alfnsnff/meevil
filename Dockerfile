FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install necessary system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel project files
COPY . .

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Change the default Apache port to 8080 (Cloud Run uses 8080)
RUN sed -i 's/80/8080/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Install dependencies and build frontend
RUN composer install --no-dev --optimize-autoloader \
    && npm install \
    && npm run build

# Start Apache server
CMD ["apache2-foreground"]
