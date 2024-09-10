FROM php:8.2-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js and npm (version can be adjusted as needed)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY composer.json composer.lock ./
COPY package.json ./

# Install PHP and Node dependencies
RUN composer install --no-interaction --no-ansi --optimize-autoloader
RUN npm install

# Copy the application code
COPY . .

# Set environment variables
ENV DB_HOST="34.126.103.119" \
    DB_PORT="3306" \
    DB_DATABASE="meevil" \
    DB_USERNAME="root" \
    DB_PASSWORD="-JTsdI/ly\"\">kY%{"

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
