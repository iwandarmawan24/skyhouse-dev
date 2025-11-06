#!/bin/bash

# First time deployment script for SkyHouse CMS
# This script will setup the entire application from scratch
# Usage: bash scripts/first-deploy.sh

set -e

echo "======================================"
echo "SkyHouse CMS - First Deployment"
echo "======================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please run scripts/install-docker.sh first"
    exit 1
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "Creating .env.production from .env.production.example..."
    cp .env.production.example .env.production
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.production and set:"
    echo "   - APP_KEY (will be generated automatically)"
    echo "   - DB_PASSWORD (set a secure password)"
    echo "   - APP_URL (your VPS IP address)"
    echo ""
    read -p "Press Enter after you've edited .env.production..."
fi

# Load environment variables
set -a
source .env.production
set +a

echo ""
echo "Building Docker images..."
docker compose -f docker-compose.prod.yml build

echo ""
echo "Starting containers..."
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "Waiting for database to be ready..."
sleep 10

echo ""
echo "Installing Composer dependencies..."
docker compose -f docker-compose.prod.yml exec -T app composer install --no-dev --optimize-autoloader

echo ""
echo "Generating application key..."
docker compose -f docker-compose.prod.yml exec -T app php artisan key:generate --force

echo ""
echo "Running database migrations..."
docker compose -f docker-compose.prod.yml exec -T app php artisan migrate --force

echo ""
echo "Creating storage symlink..."
docker compose -f docker-compose.prod.yml exec -T app php artisan storage:link

echo ""
echo "Caching configuration..."
docker compose -f docker-compose.prod.yml exec -T app php artisan config:cache
docker compose -f docker-compose.prod.yml exec -T app php artisan route:cache
docker compose -f docker-compose.prod.yml exec -T app php artisan view:cache

echo ""
echo "Setting permissions..."
docker compose -f docker-compose.prod.yml exec -T app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

echo ""
echo "======================================"
echo "Deployment completed successfully!"
echo "======================================"
echo ""
echo "Your application is now running at:"
echo "  http://$APP_URL"
echo ""
echo "To create an admin user, run:"
echo "  docker compose -f docker-compose.prod.yml exec app php artisan tinker"
echo "  Then execute:"
echo "  User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => Hash::make('password')]);"
echo ""
echo "Useful commands:"
echo "  View logs:    docker compose -f docker-compose.prod.yml logs -f"
echo "  Stop:         docker compose -f docker-compose.prod.yml down"
echo "  Restart:      docker compose -f docker-compose.prod.yml restart"
echo ""
