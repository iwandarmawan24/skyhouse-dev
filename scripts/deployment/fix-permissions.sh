#!/bin/bash

# Fix Laravel storage and cache permissions on production server
# Run this on the production server

cd /var/www/skyhouse-dev

# Clear all caches first
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Set correct ownership (replace 'www-data' with your web server user if different)
sudo chown -R www-data:www-data storage bootstrap/cache

# Set directory permissions
sudo find storage -type d -exec chmod 775 {} \;
sudo find bootstrap/cache -type d -exec chmod 775 {} \;

# Set file permissions
sudo find storage -type f -exec chmod 664 {} \;
sudo find bootstrap/cache -type f -exec chmod 664 {} \;

# Alternative: If the above doesn't work, use more permissive settings
# sudo chmod -R 777 storage
# sudo chmod -R 777 bootstrap/cache

echo "Permissions fixed!"
