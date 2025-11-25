#!/bin/bash
# Migrasi dari docker-compose.prod.yml ke docker-compose.prod.optimized.yml
# Script ini akan backup data, stop containers, dan restart dengan config optimized

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔧 Optimizing Docker Setup - SkyHouse CMS${NC}"
echo ""
echo "This script will:"
echo "  - Backup current database"
echo "  - Stop current containers"
echo "  - Switch to optimized docker-compose"
echo "  - Restart with resource limits"
echo ""
echo -e "${YELLOW}⚠️  Total RAM usage will drop from ~2GB to ~1GB${NC}"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Check if running on server
if [ ! -f "docker-compose.prod.yml" ]; then
    echo -e "${RED}❌ Error: docker-compose.prod.yml not found${NC}"
    exit 1
fi

if [ ! -f "docker-compose.prod.optimized.yml" ]; then
    echo -e "${RED}❌ Error: docker-compose.prod.optimized.yml not found${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📦 Creating database backup...${NC}"
BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).sql"

# Backup PostgreSQL
docker exec skyhouse-postgres pg_dump -U ${DB_USERNAME:-skyhouse} ${DB_DATABASE:-skyhouse} > $BACKUP_FILE

if [ -f "$BACKUP_FILE" ]; then
    echo -e "${GREEN}✅ Database backed up to: $BACKUP_FILE${NC}"
else
    echo -e "${RED}❌ Backup failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🔒 Enabling maintenance mode...${NC}"
docker exec skyhouse-app php artisan down || true

echo ""
echo -e "${YELLOW}📊 Current resource usage:${NC}"
docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}\t{{.CPUPerc}}"

echo ""
echo -e "${YELLOW}🛑 Stopping containers...${NC}"
docker-compose -f docker-compose.prod.yml down

echo ""
echo -e "${YELLOW}🔄 Starting optimized containers...${NC}"
docker-compose -f docker-compose.prod.optimized.yml up -d --build

# Wait for services to be healthy
echo ""
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check if database is ready
until docker exec skyhouse-postgres pg_isready -U ${DB_USERNAME:-skyhouse} > /dev/null 2>&1; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

echo -e "${GREEN}✅ PostgreSQL ready${NC}"

# Check if Redis is ready
until docker exec skyhouse-redis redis-cli ping > /dev/null 2>&1; do
    echo "Waiting for Redis..."
    sleep 2
done

echo -e "${GREEN}✅ Redis ready${NC}"

echo ""
echo -e "${YELLOW}🗄️  Running migrations...${NC}"
docker exec skyhouse-app php artisan migrate --force

echo ""
echo -e "${YELLOW}🧹 Clearing and caching...${NC}"
docker exec skyhouse-app php artisan config:clear
docker exec skyhouse-app php artisan cache:clear
docker exec skyhouse-app php artisan view:clear
docker exec skyhouse-app php artisan route:clear

docker exec skyhouse-app php artisan config:cache
docker exec skyhouse-app php artisan route:cache
docker exec skyhouse-app php artisan view:cache

echo ""
echo -e "${YELLOW}🔄 Restarting queue workers...${NC}"
docker exec skyhouse-app php artisan queue:restart

echo ""
echo -e "${YELLOW}🔓 Disabling maintenance mode...${NC}"
docker exec skyhouse-app php artisan up

echo ""
echo -e "${YELLOW}📊 New resource usage:${NC}"
docker stats --no-stream --format "table {{.Container}}\t{{.MemUsage}}\t{{.CPUPerc}}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Docker optimization completed!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Resource Limits Applied:"
echo "  - App Container: 256MB"
echo "  - PostgreSQL: 384MB"
echo "  - Redis: 96MB"
echo "  - Queue Worker: 128MB"
echo "  - Scheduler: 96MB"
echo "  - Nginx: 64MB"
echo "  Total: ~1GB (vs ~2GB before)"
echo ""
echo "📝 To use optimized config permanently:"
echo "  1. Backup docker-compose.prod.yml"
echo "  2. cp docker-compose.prod.optimized.yml docker-compose.prod.yml"
echo ""
echo "📝 To revert back:"
echo "  docker-compose -f docker-compose.prod.yml down"
echo "  docker-compose -f docker-compose.prod.yml up -d"
echo ""
echo "💾 Database backup saved at: $BACKUP_FILE"
echo ""
