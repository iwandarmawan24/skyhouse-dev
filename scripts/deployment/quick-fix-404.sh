#!/bin/bash

# Quick Fix for 404 Error in Production
# Run this script on the production server

set -e

echo "🔧 Starting 404 Quick Fix..."

cd /var/www/skyhouse-dev

echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

echo "🧹 Clearing all caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

echo "🔗 Creating storage link..."
php artisan storage:link

echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data .
sudo find . -type f -exec chmod 644 {} \;
sudo find . -type d -exec chmod 755 {} \;
sudo chmod -R 775 storage bootstrap/cache

echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "🔄 Restarting web server..."
if systemctl is-active --quiet nginx; then
    sudo systemctl restart nginx
    sudo systemctl restart php8.2-fpm
    echo "✅ Nginx & PHP-FPM restarted"
elif systemctl is-active --quiet apache2; then
    sudo systemctl restart apache2
    echo "✅ Apache restarted"
fi

echo ""
echo "✅ Quick fix completed!"
echo ""
echo "Test your site: http://103.126.116.26"
echo ""
echo "If still 404, check:"
echo "  - Nginx config: sudo nano /etc/nginx/sites-available/skyhouse"
echo "  - Error logs: sudo tail -f /var/log/nginx/error.log"
echo "  - Laravel logs: tail -f storage/logs/laravel.log"
