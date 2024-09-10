# Use a lightweight base image
FROM php:8.2-apache

# Install required packages
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    curl \
    wget \
    git \
    sudo \
    libpq-dev \
    libpng-dev \
    libjpeg-dev \
    mysql-client --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory for application
WORKDIR /app

# Copy composer.json and install dependencies without dev packages
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Copy the rest of the application
COPY . .

# Set environment variables (avoid hardcoding sensitive data in Dockerfile)
ENV DB_HOST="34.126.103.119" \
    DB_PORT="3306" \
    DB_DATABASE="meevil" \
    DB_USERNAME="root" \
    DB_PASSWORD="-JTsdI/ly\"\">kY%{"

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory for frontend and install npm dependencies
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --production

# Build the frontend assets
RUN npm run build

# Configure Apache
COPY apache2.conf /etc/apache2/sites-available/000-default.conf

# Expose the default HTTP port
EXPOSE 80

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND"]
