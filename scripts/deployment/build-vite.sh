#!/bin/bash
# Build Vite Assets Only
# Script khusus untuk build frontend assets dengan error handling

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}🎨 Building Vite Assets - SkyHouse CMS${NC}"
echo ""

# Check if in project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from project root"
    exit 1
fi

# Check Node.js version
echo -e "${BLUE}📋 Checking Node.js version...${NC}"
NODE_VERSION=$(node -v 2>/dev/null || echo "not found")
if [ "$NODE_VERSION" = "not found" ]; then
    echo -e "${RED}❌ Node.js not installed${NC}"
    echo "Please install Node.js 18+ first"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"

# Check npm
NPM_VERSION=$(npm -v 2>/dev/null || echo "not found")
if [ "$NPM_VERSION" = "not found" ]; then
    echo -e "${RED}❌ npm not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm: $NPM_VERSION${NC}"

echo ""

# Ask if want to clean install
read -p "Clean install node_modules? (y/n, default: n): " CLEAN_INSTALL
CLEAN_INSTALL=${CLEAN_INSTALL:-n}

if [[ $CLEAN_INSTALL =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Removing old node_modules...${NC}"
    rm -rf node_modules package-lock.json

    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
else
    echo -e "${YELLOW}📦 Checking dependencies...${NC}"
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}node_modules not found, installing...${NC}"
        npm install
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
BUILD_OUTPUT=$(npm run build 2>&1)
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
            MANIFEST_SIZE=$(du -sh public/build/manifest.json | cut -f1)
            echo "   Size: $MANIFEST_SIZE"
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
    else
        echo -e "${RED}⚠️  Warning: public/build/ not created${NC}"
    fi

    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Vite build completed successfully!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "📝 Next steps:"
    echo "  - Verify build: ls -la public/build/"
    echo "  - Test locally: php artisan serve"
    echo "  - Deploy to server: bash scripts/deployment/build-for-deployment.sh"
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

    # Analyze common errors
    echo -e "${YELLOW}🔍 Troubleshooting:${NC}"

    if echo "$BUILD_OUTPUT" | grep -q "ENOSPC"; then
        echo -e "${BLUE}💡 Out of disk space or inotify watches${NC}"
        echo "   Try: sudo sysctl fs.inotify.max_user_watches=524288"
    fi

    if echo "$BUILD_OUTPUT" | grep -q "Cannot find module"; then
        echo -e "${BLUE}💡 Missing dependencies${NC}"
        echo "   Try: rm -rf node_modules package-lock.json && npm install"
    fi

    if echo "$BUILD_OUTPUT" | grep -q "out of memory\|JavaScript heap"; then
        echo -e "${BLUE}💡 Out of memory${NC}"
        echo "   Try: NODE_OPTIONS=--max-old-space-size=4096 npm run build"
    fi

    if echo "$BUILD_OUTPUT" | grep -q "Syntax error\|Parse error"; then
        echo -e "${BLUE}💡 Syntax error in code${NC}"
        echo "   Check the file mentioned in error above"
    fi

    if echo "$BUILD_OUTPUT" | grep -q "EACCES\|permission denied"; then
        echo -e "${BLUE}💡 Permission error${NC}"
        echo "   Try: sudo chown -R $(whoami) node_modules public"
    fi

    echo ""
    echo -e "${YELLOW}📝 Common fixes:${NC}"
    echo "  1. Clean install: rm -rf node_modules package-lock.json && npm install"
    echo "  2. Update npm: npm install -g npm@latest"
    echo "  3. Clear npm cache: npm cache clean --force"
    echo "  4. Check Node version: node -v (need 18+)"
    echo "  5. Increase memory: NODE_OPTIONS=--max-old-space-size=4096 npm run build"
    echo ""

    exit 1
fi
