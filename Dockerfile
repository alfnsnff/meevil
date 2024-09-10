FROM php:8.3-fpm-alpine

# Install dependencies and PHP extensions
RUN apk update && apk add --no-cache \
    curl \
    git \
    make \
    openssh \
    postgresql-dev \
    nodejs \
    npm \
    php8-gd \
    php8-pdo \
    php8-pdo_pgsql \
    php8-json \
    php8-openssl \
    php8-mbstring

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

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
