FROM php:8.2-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    composer \
    nodejs \
    npm \
    mysql-client \
    php83-session \
    php83-fileinfo \
    php83-tokenizer \
    php83-dom

# Copy composer.json and composer.lock (excluded from .gitignore)
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install

# Copy the rest of your project (excluding .gitignore-listed files)
COPY --from=none . .
RUN rm -rf public/build public/hot public/storage storage/*.key  # Remove excluded production files

# Set working directory
WORKDIR /app

# Install Node.js dependencies
RUN npm install

# Copy .env.example and rename it to .env (excluded from .gitignore)
COPY .env.example .env

# Expose ports
EXPOSE 8000 3000

# Define commands to run
CMD ["sh", "-c", "npm run dev & php artisan serve"]