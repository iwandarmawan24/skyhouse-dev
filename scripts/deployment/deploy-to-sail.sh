#!/bin/bash
# Deploy updates to Laravel Sail (local development)
# Run this when you need to update local Sail environment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Deploying to Laravel Sail (Local Dev)${NC}"
echo ""

# Check if Sail is running
if ! docker ps | grep -q "skyhouse-laravel.test"; then
    echo -e "${RED}❌ Sail containers not running!${NC}"
    echo "Please start Sail first:"
    echo "  ./vendor/bin/sail up -d"
    exit 1
fi

# Check if in project root
if [ ! -f "artisan" ]; then
    echo -e "${RED}❌ Error: Run this script from project root${NC}"
    exit 1
fi

echo -e "${YELLOW}🗄️  Running migrations...${NC}"
./vendor/bin/sail artisan migrate

echo -e "${YELLOW}🧹 Clearing caches...${NC}"
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan cache:clear
./vendor/bin/sail artisan view:clear
./vendor/bin/sail artisan route:clear

echo -e "${YELLOW}📦 Caching configuration...${NC}"
./vendor/bin/sail artisan config:cache
./vendor/bin/sail artisan route:cache
./vendor/bin/sail artisan view:cache

echo -e "${YELLOW}🔗 Creating storage link...${NC}"
./vendor/bin/sail artisan storage:link || true

echo -e "${YELLOW}🔄 Restarting queue workers...${NC}"
./vendor/bin/sail artisan queue:restart || true

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment to Sail completed!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Application is ready at: http://localhost"
echo ""
