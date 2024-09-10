FROM php:8.3-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    curl \
    git \
    make \
    openssh \
    postgresql-dev \
    nodejs \
    npm \
    yarn

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy composer.json and package.json
COPY composer.json package.json ./

# Install dependencies
RUN composer install --no-interaction --no-ansi --optimize-autoloader
RUN npm install
RUN yarn install

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