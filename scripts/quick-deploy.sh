#!/bin/bash
# Quick deployment script untuk update aplikasi yang sudah running
# Run this on SERVER after uploading new build

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Quick Deploy - SkyHouse CMS${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Please setup your .env file first"
    exit 1
fi

# Enable maintenance mode
echo -e "${YELLOW}🔒 Enabling maintenance mode...${NC}"
php artisan down || true

# Update permissions
echo -e "${YELLOW}📁 Setting permissions...${NC}"
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Run migrations
echo -e "${YELLOW}🗄️  Running migrations...${NC}"
php artisan migrate --force

# Clear and cache everything
echo -e "${YELLOW}🧹 Clearing caches...${NC}"
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

echo -e "${YELLOW}📦 Caching configuration...${NC}"
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart queue workers
echo -e "${YELLOW}🔄 Restarting queue workers...${NC}"
php artisan queue:restart

# Restart PHP-FPM
echo -e "${YELLOW}🔄 Restarting PHP-FPM...${NC}"
systemctl restart php8.2-fpm || service php8.2-fpm restart || true

# Restart supervisor workers (if exists)
if command -v supervisorctl &> /dev/null; then
    echo -e "${YELLOW}🔄 Restarting supervisor workers...${NC}"
    supervisorctl restart skyhouse-worker:* || true
    supervisorctl restart skyhouse-scheduler:* || true
fi

# Disable maintenance mode
echo -e "${YELLOW}🔓 Disabling maintenance mode...${NC}"
php artisan up

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Application is now live!"
echo ""
