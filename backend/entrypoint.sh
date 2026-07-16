#!/bin/sh
set -e

echo "Starting backend entrypoint script..."

# Ensure proper permissions for storage and bootstrap cache
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

if [ "$APP_ENV" = "production" ]; then
    echo "Running in production mode. Optimizing Laravel..."

    # Cache Configuration
    php artisan config:cache
    
    # Cache Routes
    php artisan route:cache
    
    # Cache Views
    php artisan view:cache
    
    # Cache Events
    php artisan event:cache

    # Run Database Migrations (Force in production)
    # echo "Running database migrations..."
    php artisan migrate --force

    # Note: We do NOT run `passport:keys` here automatically in production 
    # as it would overwrite keys on every restart unless they are mounted via a volume.
    # Production Passport keys should be securely managed or injected via env vars.
else
    echo "Running in development mode. Clearing caches..."
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear
    php artisan cache:clear
    
    # echo "Running database migrations..."
    # php artisan migrate --force
fi

echo "Starting PHP-FPM..."
# Execute the container's main process (PHP-FPM)
exec docker-php-entrypoint "$@"
