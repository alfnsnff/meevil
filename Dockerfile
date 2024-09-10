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
    postgresql-client \
    libpng-dev \
    libjpeg-dev \
    mysql-client

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create a workspace directory
WORKDIR /app

# Copy the composer.json file
COPY composer.json .

# Install dependencies
RUN composer install --no-interaction --no-dev

# Copy the rest of the application
COPY . .

ENV DB_HOST="silang-c241-ps520:asia-southeast1:meevil"
ENV DB_PORT="3306"
ENV DB_DATABASE="your-mysql-database"
ENV DB_USERNAME="root"
ENV DB_PASSWORD="-JTsdI/ly"">kY%{"

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Install npm dependencies
WORKDIR /app/frontend
RUN npm install

# Build the frontend assets
RUN npm run build

# Configure Apache
COPY apache2.conf /etc/apache2/sites-available/000-default.conf

# Start Apache
CMD ["apache2ctl", "-D", "FOREGROUND"]