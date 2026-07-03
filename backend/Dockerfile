# --- Dependency Stage ---
FROM php:8.3-fpm-alpine AS vendor

WORKDIR /var/www

RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./

# ⭐ WORKAROUND: Remove --no-dev flag so development packages are accessible during compilation
RUN composer install --no-scripts --no-autoloader --prefer-dist

# --- Production Runtime Stage ---
FROM php:8.3-fpm-alpine

WORKDIR /var/www

RUN apk add --no-cache oniguruma-dev libpng-dev
RUN docker-php-ext-install pdo_mysql mbstring gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=vendor /var/www/vendor ./vendor
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]