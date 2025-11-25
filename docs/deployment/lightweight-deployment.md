# 🚀 SkyHouse CMS - Lightweight Deployment Guide

Panduan deployment untuk VPS/Shared Hosting dengan **resource terbatas** (minimal 512MB RAM, 1 CPU core).

## 📊 Perbandingan: Docker Standard vs Docker Optimized vs Traditional

| Aspek | Docker Standard | Docker Optimized | Traditional LEMP |
|-------|-----------------|------------------|------------------|
| **RAM Minimal** | 2GB | 1GB | 512MB - 1GB |
| **CPU Minimal** | 2 cores | 1-2 cores | 1 core |
| **Storage** | 20GB | 10GB | 5GB |
| **Kompleksitas** | Medium-High | Medium | Low-Medium |
| **Setup Time** | 10-15 menit | 2-5 menit (dari existing) | 5-10 menit |
| **Maintenance** | Container management | Container management | Traditional PHP |
| **Cocok untuk** | Production scale | VPS menengah | Shared hosting, VPS kecil |
| **Cost** | $10-20/bulan | $5-15/bulan | $3-10/bulan |

## 🎯 Strategi: Build Local, Deploy to Server

Karena resource terbatas, kita akan:
1. ✅ **Build assets di local** (tidak di server)
2. ✅ Upload hasil build ke server
3. ✅ Server hanya menjalankan PHP (tidak compile)
4. ✅ Hemat RAM & CPU server

---

## 📦 Option 0: Optimize Existing Docker Setup ⭐ (RECOMMENDED)

**Jika sudah running dengan Docker**, gunakan opsi ini untuk optimasi resource usage.

### Keuntungan:
- ✅ RAM usage turun dari ~2GB ke ~1GB
- ✅ Tidak perlu rebuild database atau migrasi kompleks
- ✅ Tetap menggunakan Docker (familiar)
- ✅ Resource limits otomatis per container
- ✅ Database tetap terpisah & aman

### Quick Start

**1. Build di local:**
```bash
# Di mesin development
npm run build
bash scripts/deployment/deploy-to-docker.sh
```

**2. Optimize Docker (one-time):**
```bash
# Di server
bash scripts/docker/optimize-docker.sh
```

Script akan:
- Backup database otomatis
- Stop containers lama
- Start dengan docker-compose.prod.optimized.yml
- Resource limits:
  - App: 256MB
  - PostgreSQL: 384MB (with tuning)
  - Redis: 96MB (with maxmemory limit)
  - Queue: 128MB
  - Scheduler: 96MB
  - Nginx: 64MB

**3. Deploy updates berikutnya:**
```bash
# Di local
npm run build
bash scripts/deployment/deploy-to-docker.sh
```

### Resource Limits Detail

File: `docker-compose.prod.optimized.yml`

**PostgreSQL tuning:**
- max_connections: 50 (vs 100 default)
- shared_buffers: 128MB (vs 256MB)
- work_mem: 2MB (vs 4MB)
- effective_cache_size: 256MB

**Redis tuning:**
- maxmemory: 64MB
- maxmemory-policy: allkeys-lru (evict otomatis)
- Save frequency dikurangi

**Monitoring:**
```bash
# Check resource usage
docker stats

# Check container logs
docker logs skyhouse-app
docker logs skyhouse-postgres

# Check database connections
docker exec skyhouse-postgres psql -U skyhouse -c "SELECT count(*) FROM pg_stat_activity;"
```

### Rollback jika ada masalah

```bash
# Stop optimized containers
docker-compose -f docker-compose.prod.optimized.yml down

# Start original containers
docker-compose -f docker-compose.prod.yml up -d

# Restore database if needed
docker exec -i skyhouse-postgres psql -U skyhouse skyhouse < backup-YYYYMMDD-HHMMSS.sql
```

---

## 📦 Option 1: Deployment ke VPS Minimal (Ubuntu)

### Prerequisites
- VPS dengan minimal 512MB RAM, 1 CPU core, 5GB storage
- Ubuntu 20.04/22.04 LTS
- SSH access
- Domain (opsional)

### Step 1: Setup Server

```bash
# SSH ke VPS
ssh root@your-vps-ip

# Install LEMP Stack
bash <(curl -s https://raw.githubusercontent.com/your-repo/skyhouse/master/scripts/server-setup/install-lemp.sh)
```

Script akan install:
- Nginx
- PHP 8.2 + extensions
- PostgreSQL 14 (atau MySQL 8 jika prefer)
- Composer

### Step 2: Build Assets di Local

Di komputer local Anda:

```bash
# Clone repository
git clone https://github.com/your-repo/skyhouse.git
cd skyhouse

# Install dependencies
composer install --optimize-autoloader --no-dev
npm install

# Build production assets
npm run build

# Create deployment package
bash scripts/deployment/build-for-deployment.sh
```

Ini akan menghasilkan `skyhouse-deploy.tar.gz` yang sudah include:
- ✅ Built frontend assets
- ✅ Vendor dependencies
- ✅ Optimized code
- ❌ Tidak include node_modules (tidak perlu di server)

### Step 3: Upload ke Server

```bash
# Upload deployment package
scp skyhouse-deploy.tar.gz root@your-vps-ip:/var/www/

# SSH ke server
ssh root@your-vps-ip

# Extract
cd /var/www
tar -xzf skyhouse-deploy.tar.gz
mv skyhouse-deploy skyhouse
cd skyhouse

# Setup environment
cp .env.example .env
nano .env
```

### Step 4: Configure Server

```bash
# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Setup Nginx
bash scripts/server-setup/setup-nginx.sh
```

### Step 5: Setup Supervisor (for Queue)

```bash
# Install supervisor
apt install supervisor -y

# Copy worker config
cp deployment/supervisor/skyhouse-worker.conf /etc/supervisor/conf.d/

# Start worker
supervisorctl reread
supervisorctl update
supervisorctl start skyhouse-worker:*
```

---

## 📦 Option 2: Deployment ke Shared Hosting

Untuk shared hosting (cPanel/Plesk/DirectAdmin):

### Step 1: Build di Local

```bash
# Di local machine
cd skyhouse

# Build deployment package
bash scripts/deployment/build-for-shared-hosting.sh
```

Output: `skyhouse-shared-hosting.zip`

### Step 2: Upload via cPanel

1. Login ke cPanel
2. File Manager → public_html
3. Upload `skyhouse-shared-hosting.zip`
4. Extract
5. Rename folder menjadi nama domain Anda

### Step 3: Setup Database

1. cPanel → MySQL Databases
2. Create database: `cpanel_skyhouse`
3. Create user: `cpanel_skyuser`
4. Add user to database dengan ALL PRIVILEGES

### Step 4: Configure Application

1. Rename `.env.example` menjadi `.env`
2. Edit `.env`:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://yourdomain.com

   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_DATABASE=cpanel_skyhouse
   DB_USERNAME=cpanel_skyuser
   DB_PASSWORD=your_password
   ```

3. Generate key via Terminal di cPanel:
   ```bash
   cd /home/username/public_html/skyhouse
   php artisan key:generate
   ```

### Step 5: Run Migrations

Via cPanel Terminal:
```bash
cd /home/username/public_html/skyhouse
php artisan migrate --force
php artisan storage:link
```

### Step 6: Setup Cron Job

cPanel → Cron Jobs → Add:
```
* * * * * cd /home/username/public_html/skyhouse && php artisan schedule:run >> /dev/null 2>&1
```

---

## 🔄 Update Deployment (Lightweight)

### Update dengan Downtime Minimal

```bash
# Di local machine
git pull origin master
npm run build
bash scripts/deployment/build-for-deployment.sh

# Upload ke server
scp skyhouse-deploy.tar.gz root@your-vps-ip:/var/www/

# Di server
ssh root@your-vps-ip
cd /var/www
php artisan down
tar -xzf skyhouse-deploy.tar.gz --overwrite
cd skyhouse
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan up
```

Downtime: ~30 detik

---

## 📝 Scripts yang Dibutuhkan

### 1. `scripts/deployment/build-for-deployment.sh`

```bash
#!/bin/bash
# Build project untuk deployment ke VPS minimal

echo "🔨 Building SkyHouse for deployment..."

# Clean previous build
rm -rf deployment-temp skyhouse-deploy.tar.gz

# Create temp directory
mkdir -p deployment-temp

# Copy files
echo "📦 Copying files..."
rsync -av \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='deployment-temp' \
    --exclude='*.tar.gz' \
    --exclude='tests' \
    --exclude='.env' \
    --exclude='storage/logs/*' \
    . deployment-temp/

# Ensure build assets exist
if [ ! -d "public/build" ]; then
    echo "❌ Error: Frontend assets not built. Run 'npm run build' first!"
    exit 1
fi

# Create package
echo "📦 Creating deployment package..."
tar -czf skyhouse-deploy.tar.gz -C deployment-temp .

# Cleanup
rm -rf deployment-temp

echo "✅ Deployment package created: skyhouse-deploy.tar.gz"
echo "📤 Upload to server: scp skyhouse-deploy.tar.gz root@your-server:/var/www/"
```

### 2. `scripts/deployment/build-for-shared-hosting.sh`

```bash
#!/bin/bash
# Build project untuk shared hosting

echo "🔨 Building SkyHouse for shared hosting..."

# Build assets
npm run build

# Create temp directory
rm -rf shared-hosting-temp skyhouse-shared-hosting.zip
mkdir -p shared-hosting-temp

# Copy files
rsync -av \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='shared-hosting-temp' \
    --exclude='*.zip' \
    --exclude='tests' \
    --exclude='.env' \
    --exclude='storage/logs/*' \
    . shared-hosting-temp/

# Create .htaccess for shared hosting
cat > shared-hosting-temp/public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php/$1 [L]
</IfModule>
EOF

# Create zip
cd shared-hosting-temp
zip -r ../skyhouse-shared-hosting.zip .
cd ..

# Cleanup
rm -rf shared-hosting-temp

echo "✅ Shared hosting package created: skyhouse-shared-hosting.zip"
echo "📤 Upload via cPanel File Manager"
```

### 3. `scripts/server-setup/install-lemp.sh`

```bash
#!/bin/bash
# Install LEMP stack untuk Ubuntu minimal

set -e

echo "🔧 Installing LEMP Stack for SkyHouse..."

# Update system
apt update && apt upgrade -y

# Install Nginx
apt install nginx -y
systemctl enable nginx
systemctl start nginx

# Install PHP 8.2
apt install software-properties-common -y
add-apt-repository ppa:ondrej/php -y
apt update

apt install -y \
    php8.2-fpm \
    php8.2-cli \
    php8.2-common \
    php8.2-mysql \
    php8.2-pgsql \
    php8.2-zip \
    php8.2-gd \
    php8.2-mbstring \
    php8.2-curl \
    php8.2-xml \
    php8.2-bcmath \
    php8.2-redis

# Install PostgreSQL (or MySQL if you prefer)
echo "Choose database: 1) PostgreSQL 2) MySQL"
read -p "Enter choice [1]: " db_choice
db_choice=${db_choice:-1}

if [ "$db_choice" = "1" ]; then
    apt install postgresql postgresql-contrib -y
    systemctl enable postgresql
    systemctl start postgresql
else
    apt install mysql-server -y
    systemctl enable mysql
    systemctl start mysql
fi

# Install Redis
apt install redis-server -y
systemctl enable redis-server
systemctl start redis-server

# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer

# Install Supervisor (for queue)
apt install supervisor -y
systemctl enable supervisor
systemctl start supervisor

# Configure PHP
sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 100M/' /etc/php/8.2/fpm/php.ini
sed -i 's/post_max_size = 8M/post_max_size = 100M/' /etc/php/8.2/fpm/php.ini
sed -i 's/max_execution_time = 30/max_execution_time = 300/' /etc/php/8.2/fpm/php.ini

systemctl restart php8.2-fpm

echo "✅ LEMP Stack installed successfully!"
echo "📝 Next: Upload your application to /var/www/skyhouse"
```

### 4. `scripts/server-setup/setup-nginx.sh`

```bash
#!/bin/bash
# Setup Nginx for SkyHouse

cat > /etc/nginx/sites-available/skyhouse << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/skyhouse/public;

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
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/skyhouse /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test config
nginx -t

# Restart Nginx
systemctl restart nginx

echo "✅ Nginx configured for SkyHouse"
```

### 5. `deployment/supervisor/skyhouse-worker.conf`

```ini
[program:skyhouse-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/skyhouse/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/skyhouse/storage/logs/worker.log
stopwaitsecs=3600
```

---

## 💡 Tips Optimasi untuk Resource Terbatas

### 1. Gunakan Cloudflare (Free)
- Cache assets
- CDN global
- DDoS protection
- Hemat bandwidth

### 2. Optimize Database
```bash
# Di server
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Reduce query load
# Edit .env:
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### 3. Enable OPcache
Edit `/etc/php/8.2/fpm/php.ini`:
```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.validate_timestamps=0
```

### 4. Compress Response
Di Nginx config tambahkan:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;
```

---

## 📊 Monitoring Resource Usage

```bash
# Check memory
free -h

# Check CPU
top

# Check disk
df -h

# PHP-FPM status
systemctl status php8.2-fpm

# Nginx status
systemctl status nginx
```

---

## 🎯 Kesimpulan

**Gunakan Docker (deployment.md) jika:**
- ✅ Punya VPS dengan RAM ≥ 2GB
- ✅ Butuh isolated environment
- ✅ Scale up in the future

**Gunakan Traditional (guide ini) jika:**
- ✅ VPS/Shared hosting dengan RAM < 1GB
- ✅ Budget terbatas ($3-10/bulan)
- ✅ Simple deployment preferred
- ✅ Familiar dengan traditional LAMP/LEMP

**Resource Comparison:**

| Resource | Docker | Traditional |
|----------|--------|-------------|
| Idle RAM | ~800MB | ~200MB |
| Under load | ~1.5GB | ~500MB |
| Startup time | 30s | 5s |
| Deploy time | 5-10 min | 2-5 min |

---

**Last Updated**: January 2025
