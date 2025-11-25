#!/bin/bash
# Build project untuk shared hosting (cPanel/Plesk/DirectAdmin)

set -e

echo "🔨 Building SkyHouse for shared hosting..."
echo ""

# Check if build assets exist
if [ ! -d "public/build" ]; then
    echo "❌ Error: Frontend assets not built!"
    echo "👉 Please run 'npm run build' first"
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous builds..."
rm -rf shared-hosting-temp skyhouse-shared-hosting.zip

# Create temp directory
mkdir -p shared-hosting-temp

# Copy files
echo "📦 Copying application files..."
rsync -av --progress \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='shared-hosting-temp' \
    --exclude='*.tar.gz' \
    --exclude='*.zip' \
    --exclude='tests' \
    --exclude='.env' \
    --exclude='storage/logs/*' \
    --exclude='storage/framework/cache/*' \
    --exclude='storage/framework/sessions/*' \
    --exclude='storage/framework/views/*' \
    --exclude='.phpunit.result.cache' \
    --exclude='phpunit.xml' \
    . shared-hosting-temp/

# Copy .env.example
cp .env.example shared-hosting-temp/.env.example

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p shared-hosting-temp/storage/logs
mkdir -p shared-hosting-temp/storage/framework/{cache,sessions,views}
mkdir -p shared-hosting-temp/storage/app/public
mkdir -p shared-hosting-temp/bootstrap/cache

# Create .htaccess for shared hosting
echo "⚙️  Creating .htaccess for shared hosting..."
cat > shared-hosting-temp/public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Disable directory browsing
Options -Indexes

# Prevent access to hidden files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Protect .env file
<Files .env>
    Order allow,deny
    Deny from all
</Files>
EOF

# Create root .htaccess (redirect to public)
cat > shared-hosting-temp/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
EOF

# Create readme for deployment
cat > shared-hosting-temp/DEPLOYMENT-INSTRUCTIONS.txt << 'EOF'
SKYHOUSE CMS - SHARED HOSTING DEPLOYMENT INSTRUCTIONS
====================================================

1. UPLOAD FILES
   - Upload all files to your public_html or domain directory via cPanel File Manager or FTP
   - Extract the zip file

2. SETUP DATABASE
   - Go to cPanel -> MySQL Databases
   - Create a new database (e.g., cpanel_skyhouse)
   - Create a new user (e.g., cpanel_skyuser)
   - Add user to database with ALL PRIVILEGES
   - Note down: database name, username, and password

3. CONFIGURE APPLICATION
   - Rename .env.example to .env
   - Edit .env file:

     APP_ENV=production
     APP_DEBUG=false
     APP_URL=https://yourdomain.com

     DB_CONNECTION=mysql
     DB_HOST=localhost
     DB_DATABASE=cpanel_skyhouse
     DB_USERNAME=cpanel_skyuser
     DB_PASSWORD=your_password

4. RUN SETUP (via cPanel Terminal or SSH)
   cd /home/username/public_html/skyhouse
   php artisan key:generate
   php artisan migrate --force
   php artisan storage:link
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache

5. SET PERMISSIONS
   chmod -R 755 storage
   chmod -R 755 bootstrap/cache

6. SETUP CRON JOB (cPanel -> Cron Jobs)
   Command: * * * * * cd /home/username/public_html/skyhouse && php artisan schedule:run >> /dev/null 2>&1

7. CREATE ADMIN USER (via Terminal)
   cd /home/username/public_html/skyhouse
   php artisan tinker

   Then run:
   User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => Hash::make('your-password')]);
   exit

8. ACCESS APPLICATION
   Frontend: https://yourdomain.com
   Admin: https://yourdomain.com/admin/login

TROUBLESHOOTING
===============

If you see "500 Internal Server Error":
- Check storage and bootstrap/cache permissions
- Check .env file is configured correctly
- Check error logs in storage/logs/laravel.log

If assets don't load:
- Make sure public/build directory exists
- Check .htaccess in public directory
- Clear cache: php artisan cache:clear

Need help? Check documentation or contact support.
EOF

# Create zip package
echo "📦 Creating ZIP package..."
cd shared-hosting-temp
zip -r -q ../skyhouse-shared-hosting.zip .
cd ..

# Get file size
FILE_SIZE=$(du -h skyhouse-shared-hosting.zip | cut -f1)

# Cleanup
rm -rf shared-hosting-temp

echo ""
echo "✅ Shared hosting package created successfully!"
echo ""
echo "📦 Package: skyhouse-shared-hosting.zip"
echo "📊 Size: $FILE_SIZE"
echo ""
echo "📤 Upload via cPanel File Manager:"
echo "   1. Login to cPanel"
echo "   2. Go to File Manager"
echo "   3. Navigate to public_html"
echo "   4. Upload skyhouse-shared-hosting.zip"
echo "   5. Extract the zip file"
echo "   6. Follow DEPLOYMENT-INSTRUCTIONS.txt"
echo ""
