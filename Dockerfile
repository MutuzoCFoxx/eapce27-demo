FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
        libpq-dev \
        libzip-dev \
        libonig-dev \
        unzip \
    && docker-php-ext-install pdo_pgsql mbstring bcmath zip \
    && rm -rf /var/lib/apt/lists/*

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
