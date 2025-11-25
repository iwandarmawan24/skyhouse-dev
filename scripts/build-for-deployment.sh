#!/bin/bash
# Build project untuk deployment ke VPS minimal

set -e

echo "🔨 Building SkyHouse for deployment..."
echo ""

# Check if build assets exist
if [ ! -d "public/build" ]; then
    echo "❌ Error: Frontend assets not built!"
    echo "👉 Please run 'npm run build' first"
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous builds..."
rm -rf deployment-temp skyhouse-deploy.tar.gz

# Create temp directory
mkdir -p deployment-temp

# Copy files
echo "📦 Copying application files..."
rsync -av --progress \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='deployment-temp' \
    --exclude='*.tar.gz' \
    --exclude='*.zip' \
    --exclude='tests' \
    --exclude='.env' \
    --exclude='.env.example' \
    --exclude='storage/logs/*' \
    --exclude='storage/framework/cache/*' \
    --exclude='storage/framework/sessions/*' \
    --exclude='storage/framework/views/*' \
    --exclude='.phpunit.result.cache' \
    --exclude='phpunit.xml' \
    . deployment-temp/

# Copy .env.example as template
cp .env.example deployment-temp/.env.example

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p deployment-temp/storage/logs
mkdir -p deployment-temp/storage/framework/{cache,sessions,views}
mkdir -p deployment-temp/storage/app/public
mkdir -p deployment-temp/bootstrap/cache

# Create empty .gitkeep files
touch deployment-temp/storage/logs/.gitkeep
touch deployment-temp/storage/framework/cache/.gitkeep
touch deployment-temp/storage/framework/sessions/.gitkeep
touch deployment-temp/storage/framework/views/.gitkeep

# Create package
echo "📦 Creating deployment package..."
echo ""
tar -czf skyhouse-deploy.tar.gz -C deployment-temp .

# Get file size
FILE_SIZE=$(du -h skyhouse-deploy.tar.gz | cut -f1)

# Cleanup
rm -rf deployment-temp

echo ""
echo "✅ Deployment package created successfully!"
echo ""
echo "📦 Package: skyhouse-deploy.tar.gz"
echo "📊 Size: $FILE_SIZE"
echo ""
echo "📤 Upload to server with:"
echo "   scp skyhouse-deploy.tar.gz root@your-server:/var/www/"
echo ""
echo "🚀 Then on server, run:"
echo "   cd /var/www"
echo "   tar -xzf skyhouse-deploy.tar.gz"
echo "   mv deployment-temp skyhouse"
echo "   cd skyhouse"
echo "   cp .env.example .env"
echo "   nano .env  # Edit configuration"
echo "   php artisan key:generate"
echo "   php artisan migrate --force"
echo "   php artisan storage:link"
echo "   php artisan config:cache"
echo "   php artisan route:cache"
echo "   php artisan view:cache"
echo ""
