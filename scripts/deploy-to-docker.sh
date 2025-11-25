#!/bin/bash
# Deploy hasil build ke Docker yang sudah running
# Run this AFTER building assets locally (npm run build)

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Deploying to Docker - SkyHouse CMS${NC}"
echo ""

# Check if running locally
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Run this script from project root directory${NC}"
    exit 1
fi

# Check if build exists
if [ ! -d "public/build" ]; then
    echo -e "${RED}❌ Error: Frontend assets not built!${NC}"
    echo "👉 Please run 'npm run build' first"
    exit 1
fi

# Ask for deployment mode
echo -e "${YELLOW}Choose deployment mode:${NC}"
echo "  1) Deploy to REMOTE server via SSH (recommended)"
echo "  2) Deploy to LOCAL Docker (if running Docker locally)"
read -p "Enter choice [1]: " deploy_mode
deploy_mode=${deploy_mode:-1}

if [ "$deploy_mode" = "1" ]; then
    # Remote deployment
    echo ""
    read -p "Enter server address (user@host): " SERVER
    read -p "Enter project path on server [/var/www/skyhouse]: " REMOTE_PATH
    REMOTE_PATH=${REMOTE_PATH:-/var/www/skyhouse}

    echo ""
    echo -e "${YELLOW}📦 Syncing files to server...${NC}"

    # Sync only necessary files
    rsync -avz --progress \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.env' \
        --exclude='storage/logs/*' \
        --exclude='storage/framework/cache/*' \
        --exclude='storage/framework/sessions/*' \
        --exclude='storage/framework/views/*' \
        --include='public/build/***' \
        --include='public/storage/***' \
        ./ $SERVER:$REMOTE_PATH/

    echo ""
    echo -e "${YELLOW}🔄 Deploying on server...${NC}"

    # Run deployment commands on server
    ssh $SERVER << ENDSSH
cd $REMOTE_PATH

echo "🔒 Enabling maintenance mode..."
docker exec skyhouse-app php artisan down || true

echo "🗄️  Running migrations..."
docker exec skyhouse-app php artisan migrate --force

echo "🧹 Clearing caches..."
docker exec skyhouse-app php artisan config:clear
docker exec skyhouse-app php artisan cache:clear
docker exec skyhouse-app php artisan view:clear
docker exec skyhouse-app php artisan route:clear

echo "📦 Caching configuration..."
docker exec skyhouse-app php artisan config:cache
docker exec skyhouse-app php artisan route:cache
docker exec skyhouse-app php artisan view:cache

echo "🔄 Restarting queue workers..."
docker exec skyhouse-app php artisan queue:restart

echo "🔄 Restarting containers..."
docker-compose -f docker-compose.prod.yml restart app nginx queue

echo "🔓 Disabling maintenance mode..."
docker exec skyhouse-app php artisan up

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
ENDSSH

else
    # Local deployment
    echo ""
    echo -e "${YELLOW}🔒 Enabling maintenance mode...${NC}"
    docker exec skyhouse-app php artisan down || true

    echo -e "${YELLOW}🗄️  Running migrations...${NC}"
    docker exec skyhouse-app php artisan migrate --force

    echo -e "${YELLOW}🧹 Clearing caches...${NC}"
    docker exec skyhouse-app php artisan config:clear
    docker exec skyhouse-app php artisan cache:clear
    docker exec skyhouse-app php artisan view:clear
    docker exec skyhouse-app php artisan route:clear

    echo -e "${YELLOW}📦 Caching configuration...${NC}"
    docker exec skyhouse-app php artisan config:cache
    docker exec skyhouse-app php artisan route:cache
    docker exec skyhouse-app php artisan view:cache

    echo -e "${YELLOW}🔄 Restarting queue workers...${NC}"
    docker exec skyhouse-app php artisan queue:restart

    echo -e "${YELLOW}🔄 Restarting containers...${NC}"
    docker-compose -f docker-compose.prod.yml restart app nginx queue

    echo -e "${YELLOW}🔓 Disabling maintenance mode...${NC}"
    docker exec skyhouse-app php artisan up

    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
fi

echo ""
echo "📝 Application is now live!"
echo ""
