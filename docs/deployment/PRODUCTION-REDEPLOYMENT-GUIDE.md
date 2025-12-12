# Production Re-Deployment Guide - December 2025

Complete guide untuk deploy ulang SkyHouse ke production server setelah hapus folder.

## 📋 Pre-Requirements

- VPS dengan Ubuntu 22.04
- PostgreSQL 14+ installed
- Nginx installed
- PHP 8.2-FPM installed
- Node.js 18+ & npm installed
- Git installed
- Composer installed

---

## 🚀 Step-by-Step Deployment

### **Step 1: Clone Repository**

```bash
cd /var/www

# Clone repository
git clone git@github.com:username/skyhouse.git skyhouse-dev

# Masuk ke folder
cd skyhouse-dev
```

### **Step 2: Install PHP Dependencies**

```bash
# Install composer dependencies (production mode)
composer install --no-dev --optimize-autoloader
```

### **Step 3: Setup Environment File**

```bash
# Copy .env.example
cp .env.example .env

# Edit .env
nano .env
```

**Configure `.env` untuk production:**

```env
APP_NAME="SkyHouse Property"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=http://103.126.116.26

# Database Production
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=skyhouse_production
DB_USERNAME=skyhouse
DB_PASSWORD=SkyH0use2024!Prod

# Session & Cache
SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database

# Filesystem
FILESYSTEM_DISK=public
```

**Generate APP_KEY:**

```bash
php artisan key:generate
```

### **Step 4: Setup PostgreSQL Database**

```bash
# Login ke PostgreSQL
sudo -u postgres psql
```

**Di PostgreSQL prompt:**

```sql
-- Create database (jika belum ada)
CREATE DATABASE skyhouse_production;

-- Create user (jika belum ada)
CREATE USER skyhouse WITH PASSWORD 'SkyH0use2024!Prod';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE skyhouse_production TO skyhouse;

-- Connect ke database
\c skyhouse_production

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO skyhouse;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO skyhouse;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO skyhouse;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO skyhouse;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO skyhouse;

-- Exit
\q
```

### **Step 5: Run Migrations & Create Admin User**

```bash
cd /var/www/skyhouse-dev

# Create storage link
php artisan storage:link

# Run migrations
php artisan migrate --force

# Create admin user via tinker
php artisan tinker
```

**Di tinker:**

```php
\App\Models\User::create([
    'name' => 'Admin SkyHouse',
    'username' => 'admin',
    'full_name' => 'Admin SkyHouse',
    'email' => 'admin@skyhouse.com',
    'password' => bcrypt('admin123'),
    'role' => 'superadmin',
    'status' => 'active',
    'email_verified_at' => now(),
]);

exit
```

### **Step 6: Build Frontend Assets**

```bash
# Install Node dependencies
npm install

# Build untuk production (dengan memory optimization untuk VPS)
npm run build:vps
```

### **Step 7: Set Permissions**

```bash
# Set ownership ke www-data (user web server)
sudo chown -R www-data:www-data .

# Set permissions untuk storage dan bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Set permissions untuk file lainnya
sudo find . -type f -exec chmod 644 {} \;
sudo find . -type d -exec chmod 755 {} \;
```

### **Step 8: Optimize Laravel**

```bash
# Clear all cache first
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Recreate optimized cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### **Step 9: Configure Nginx**

Edit nginx config (biasanya di `/etc/nginx/sites-available/skyhouse`):

```bash
sudo nano /etc/nginx/sites-available/skyhouse
```

**Nginx configuration:**

```nginx
server {
    listen 80;
    server_name 103.126.116.26;
    root /var/www/skyhouse-dev/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

**Enable site & restart:**

```bash
# Create symlink (jika belum ada)
sudo ln -s /etc/nginx/sites-available/skyhouse /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
```

### **Step 10: Verify Deployment**

```bash
# Check routes registered
php artisan route:list | head -20

# Check specific route
php artisan route:list --path=media-library

# Test from command line
curl -I http://103.126.116.26

# Check logs
tail -f storage/logs/laravel.log
```

---

## ✅ Post-Deployment Checklist

- [ ] Website accessible via browser
- [ ] Admin login works (`/admin/login`)
- [ ] Media library accessible (`/admin/media-library`)
- [ ] Database connection working
- [ ] File uploads working
- [ ] All routes registered
- [ ] No errors in Laravel logs

---

## 🔧 Common Issues & Solutions

### Issue 1: 404 Not Found untuk Routes

**Solution:**
```bash
php artisan route:clear
php artisan route:cache
sudo systemctl restart php8.2-fpm
```

### Issue 2: Database Connection Error

**Cek:**
- PostgreSQL service running: `sudo systemctl status postgresql`
- Database credentials di `.env` benar
- User punya akses ke database: `\l` di psql

**Fix:**
```bash
php artisan config:clear
rm -f bootstrap/cache/config.php
```

### Issue 3: Permission Denied

**Fix:**
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Issue 4: Composer Install Gagal

**Solution:**
```bash
# Update composer
composer self-update

# Clear composer cache
composer clear-cache

# Install ulang
composer install --no-dev --optimize-autoloader
```

### Issue 5: NPM Build Out of Memory

**Solution:**
```bash
# Gunakan build dengan memory limit
npm run build:vps

# Atau set manual
NODE_OPTIONS='--max-old-space-size=1536' npm run build
```

---

## 🐛 Debugging

### Check Laravel Logs

```bash
tail -f /var/www/skyhouse-dev/storage/logs/laravel.log
```

### Check Nginx Logs

```bash
# Error log
sudo tail -f /var/log/nginx/error.log

# Access log
sudo tail -f /var/log/nginx/access.log
```

### Check PHP-FPM Logs

```bash
sudo tail -f /var/log/php8.2-fpm.log
```

### Test Database Connection

```bash
php artisan tinker

# Di tinker:
DB::connection()->getPdo();
DB::table('users')->count();
exit
```

---

## 📝 Admin Credentials

**Default admin user:**
- **Email:** `admin@skyhouse.com`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Segera ubah password setelah login pertama kali!

---

## 🔄 Future Updates

Untuk update code di kemudian hari:

```bash
cd /var/www/skyhouse-dev

# Pull latest changes
git pull

# Update dependencies
composer install --no-dev --optimize-autoloader

# Run migrations
php artisan migrate --force

# Rebuild frontend
npm install
npm run build:vps

# Clear & recreate cache
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart services
sudo systemctl restart php8.2-fpm
```

---

## 📚 Related Documentation

- [VPS Setup Guide](./vps-setup.md)
- [Lightweight Deployment](./lightweight-deployment.md)
- [Docker Deployment](./docker-deployment.md)

---

**Last Updated:** December 2025
**Status:** ✅ Tested & Working
