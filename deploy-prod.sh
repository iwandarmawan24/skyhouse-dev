#!/bin/bash

set -e

echo "🚀 Starting deployment..."

cd /var/www/skyhouse-dev

# Maintenance mode
php artisan down || true

# Pull latest code
git pull origin master

# PHP dependencies (SAFE)
echo "📦 Installing PHP dependencies..."
composer install \
  --no-dev \
  --optimize-autoloader \
  --no-interaction

# Frontend build
echo "📦 Installing Node dependencies..."
npm ci

echo "🔨 Building frontend assets..."
npm run build

# Migrations
echo "💾 Running migrations..."
php artisan migrate --force

# Clear cache
echo "🧹 Clearing caches..."
php artisan optimize:clear

# Optimize
echo "⚡ Optimizing..."
php artisan optimize

# Permissions
echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Up
php artisan up

echo "✅ Deployment complete!"
