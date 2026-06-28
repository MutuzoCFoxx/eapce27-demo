FROM php:8.2-cli-alpine

RUN apk add --no-cache \
    libpq-dev \
    libzip-dev \
    oniguruma-dev \
    libxml2-dev \
    curl \
    && docker-php-ext-install \
        pdo pdo_pgsql pdo_mysql \
        mbstring xml bcmath zip \
        tokenizer ctype fileinfo opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8080

CMD sh -c "php artisan config:cache && \
           php artisan route:cache && \
           php artisan view:cache && \
           php artisan migrate --force && \
           php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"
