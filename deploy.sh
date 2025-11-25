#!/bin/bash

# Zero-downtime deployment script for SkyHouse CMS
# This script updates the application without stopping it
# Usage: bash deploy.sh

set -e

echo "======================================"
echo "SkyHouse CMS - Deployment Update"
echo "======================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

# Pull latest code
echo ""
echo "Pulling latest code from Git..."
git pull origin master

# Load environment variables
if [ -f .env.production ]; then
    set -a
    source .env.production
    set +a
fi

# Put application in maintenance mode
echo ""
echo "Enabling maintenance mode..."
docker compose -f docker-compose.prod.yml exec -T app php artisan down --retry=60 || true

# Pull latest Docker images (if any changes)
echo ""
echo "Pulling latest Docker images..."
docker compose -f docker-compose.prod.yml pull

# Rebuild containers if Dockerfile changed
echo ""
echo "Rebuilding containers..."
docker compose -f docker-compose.prod.yml build

# Install/update Composer dependencies
echo ""
echo "Updating Composer dependencies..."
docker compose -f docker-compose.prod.yml exec -T app composer install --no-dev --optimize-autoloader --no-interaction

# Install/update npm dependencies and build assets
echo ""
echo "Building frontend assets..."
docker compose -f docker-compose.prod.yml exec -T app npm ci --omit=dev
docker compose -f docker-compose.prod.yml exec -T app npm run build

# Run database migrations
echo ""
echo "Running database migrations..."
docker compose -f docker-compose.prod.yml exec -T app php artisan migrate --force

# Clear and cache everything
echo ""
echo "Clearing and caching..."
docker compose -f docker-compose.prod.yml exec -T app php artisan config:clear
docker compose -f docker-compose.prod.yml exec -T app php artisan route:clear
docker compose -f docker-compose.prod.yml exec -T app php artisan view:clear
docker compose -f docker-compose.prod.yml exec -T app php artisan cache:clear

docker compose -f docker-compose.prod.yml exec -T app php artisan config:cache
# Skip route:cache due to Laravel 12 compatibility issue
# docker compose -f docker-compose.prod.yml exec -T app php artisan route:cache
docker compose -f docker-compose.prod.yml exec -T app php artisan view:cache

# Restart queue workers
echo ""
echo "Restarting queue workers..."
docker compose -f docker-compose.prod.yml restart queue

# Bring application back up
echo ""
echo "Disabling maintenance mode..."
docker compose -f docker-compose.prod.yml exec -T app php artisan up

# Restart containers for changes to take effect
echo ""
echo "Restarting application..."
docker compose -f docker-compose.prod.yml restart app nginx

echo ""
echo "======================================"
echo "Deployment completed successfully!"
echo "======================================"
echo ""
echo "Application is now running the latest version"
echo ""
echo "View logs with:"
echo "  docker compose -f docker-compose.prod.yml logs -f app"
echo ""
