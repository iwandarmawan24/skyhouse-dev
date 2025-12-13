#!/bin/bash

# Production deployment script for Skyhouse
# Run this on the production server

set -e  # Exit on error

echo "🚀 Starting deployment..."

cd /var/www/skyhouse-dev

# Enable maintenance mode
php artisan down || true

# Pull latest code
git pull origin master

# Install/Update PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install/Update Node dependencies and build assets
echo "📦 Installing Node dependencies..."
npm ci --production

echo "🔨 Building frontend assets..."
npm run build

# Run database migrations
echo "💾 Running migrations..."
php artisan migrate --force

# Clear and cache
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

echo "⚡ Optimizing..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Fix permissions
echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Disable maintenance mode
php artisan up

echo "✅ Deployment complete!"
