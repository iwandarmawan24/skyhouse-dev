#!/bin/bash

set -e

echo "🚀 Starting production deployment..."

cd /var/www/skyhouse-dev

# Ensure correct user
if [ "$(whoami)" = "root" ]; then
  echo "❌ Do NOT run deploy as root"
  exit 1
fi

# Maintenance mode
php artisan down || true

# Update code
echo "📥 Pulling latest code..."
git fetch origin
git reset --hard origin/master

# Fix permissions EARLY
echo "🔐 Fixing permissions..."
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Clean Laravel caches MANUALLY (important)
echo "🧹 Cleaning cached files..."
rm -f bootstrap/cache/*.php

# Install PHP dependencies (PRODUCTION SAFE)
echo "📦 Installing PHP dependencies..."
composer install \
  --no-dev \
  --no-scripts \
  --optimize-autoloader \
  --no-interaction

# Generate optimized autoload (no scripts)
composer dump-autoload --optimize --no-scripts

# Frontend build
echo "📦 Installing Node dependencies..."
npm ci --omit=dev

echo "🔨 Building frontend assets..."
npm run build

# Database migrations
echo "💾 Running migrations..."
php artisan migrate --force

# Optimize Laravel
echo "⚡ Optimizing Laravel..."
php artisan optimize
php artisan route:cache
php artisan view:cache

# Bring app back up
php artisan up

echo "✅ Deployment complete!"
