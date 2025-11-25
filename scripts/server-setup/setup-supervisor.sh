#!/bin/bash
# Setup Supervisor untuk Laravel Queue & Scheduler

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up Supervisor for SkyHouse CMS${NC}"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Check if supervisor is installed
if ! command -v supervisorctl &> /dev/null; then
    echo -e "${YELLOW}Supervisor not found. Installing...${NC}"
    apt install supervisor -y
    systemctl enable supervisor
    systemctl start supervisor
fi

# Copy supervisor config
echo -e "${YELLOW}Copying supervisor configuration...${NC}"
cp /var/www/skyhouse/deployment/supervisor/skyhouse-worker.conf /etc/supervisor/conf.d/

# Update supervisor
echo -e "${YELLOW}Updating supervisor...${NC}"
supervisorctl reread
supervisorctl update

# Start workers
echo -e "${YELLOW}Starting workers...${NC}"
supervisorctl start skyhouse-worker:*
supervisorctl start skyhouse-scheduler:*

# Check status
echo ""
echo -e "${YELLOW}Checking worker status...${NC}"
supervisorctl status

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Supervisor configured successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Useful Commands:"
echo "  - Check status: supervisorctl status"
echo "  - Restart workers: supervisorctl restart skyhouse-worker:*"
echo "  - Restart scheduler: supervisorctl restart skyhouse-scheduler:*"
echo "  - Stop all: supervisorctl stop all"
echo "  - Start all: supervisorctl start all"
echo "  - View logs: tail -f /var/www/skyhouse/storage/logs/worker.log"
echo ""
