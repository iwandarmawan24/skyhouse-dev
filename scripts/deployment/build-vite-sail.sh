#!/bin/bash
# Build Vite Assets dengan Laravel Sail
# Script khusus untuk build frontend assets di Sail environment

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}🎨 Building Vite Assets (Sail) - SkyHouse CMS${NC}"
echo ""

# Check if Sail is available
if [ ! -f "vendor/bin/sail" ]; then
    echo -e "${RED}❌ Sail not found${NC}"
    echo "Please run 'composer install' first"
    exit 1
fi

# Check if containers running
if ! docker ps | grep -q "skyhouse-laravel.test"; then
    echo -e "${RED}❌ Sail containers not running${NC}"
    echo "Please start Sail first: ./vendor/bin/sail up -d"
    exit 1
fi

SAIL="./vendor/bin/sail"

echo -e "${BLUE}📋 Checking Node.js in container...${NC}"
NODE_VERSION=$($SAIL node -v)
echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"

echo ""

# Ask if want to clean install
read -p "Clean install node_modules? (y/n, default: n): " CLEAN_INSTALL
CLEAN_INSTALL=${CLEAN_INSTALL:-n}

if [[ $CLEAN_INSTALL =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Removing old node_modules...${NC}"
    rm -rf node_modules package-lock.json

    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    $SAIL npm install
else
    echo -e "${YELLOW}📦 Checking dependencies...${NC}"
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}node_modules not found, installing...${NC}"
        $SAIL npm install
    else
        echo -e "${GREEN}✅ node_modules exists${NC}"
    fi
fi

echo ""
echo -e "${YELLOW}🧹 Cleaning old build...${NC}"
rm -rf public/build
rm -rf public/hot
echo -e "${GREEN}✅ Old build cleaned${NC}"

echo ""
echo -e "${YELLOW}🔨 Building Vite assets...${NC}"
echo -e "${BLUE}This may take a few minutes...${NC}"
echo ""

# Run build with error capture
BUILD_OUTPUT=$($SAIL npm run build 2>&1)
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    echo ""

    # Show build results
    echo -e "${BLUE}📊 Build Results:${NC}"
    if [ -d "public/build" ]; then
        echo -e "${GREEN}✅ public/build/ created${NC}"

        # Show manifest
        if [ -f "public/build/manifest.json" ]; then
            echo -e "${GREEN}✅ manifest.json created${NC}"
        fi

        # Show assets
        if [ -d "public/build/assets" ]; then
            ASSET_COUNT=$(ls -1 public/build/assets/ | wc -l)
            ASSET_SIZE=$(du -sh public/build/assets/ | cut -f1)
            echo -e "${GREEN}✅ $ASSET_COUNT asset files created${NC}"
            echo "   Total size: $ASSET_SIZE"

            echo ""
            echo -e "${BLUE}Asset files:${NC}"
            ls -lh public/build/assets/ | tail -n +2 | awk '{printf "   %s  %s\n", $5, $9}'
        fi

        # Total build size
        echo ""
        TOTAL_SIZE=$(du -sh public/build | cut -f1)
        echo -e "${GREEN}📦 Total build size: $TOTAL_SIZE${NC}"
    fi

    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Vite build completed successfully!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "📝 Next steps:"
    echo "  - View app: http://localhost"
    echo "  - For development: $SAIL npm run dev"
    echo ""

else
    echo -e "${RED}❌ Build failed!${NC}"
    echo ""
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}Error Output:${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "$BUILD_OUTPUT"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}🔍 Common fixes for Sail:${NC}"
    echo "  1. Clean install: rm -rf node_modules && $SAIL npm install"
    echo "  2. Restart Sail: $SAIL down && $SAIL up -d"
    echo "  3. Clear npm cache: $SAIL npm cache clean --force"
    echo "  4. Check permissions: sudo chown -R \$(whoami) public/"
    echo ""

    exit 1
fi
