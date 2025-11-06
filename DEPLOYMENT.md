# 🚀 SkyHouse CMS - Production Deployment Guide

Panduan lengkap untuk deploy SkyHouse CMS ke VPS menggunakan Docker.

## 📋 Prerequisites

- VPS dengan minimal 2GB RAM, 2 CPU cores, 20GB storage
- Ubuntu 22.04 atau 24.04 LTS
- SSH access ke VPS
- Domain (opsional, bisa pakai IP dulu)

## 🏗️ Architecture

Stack yang digunakan:
- **Application**: Laravel 11 + React 19 (Inertia.js)
- **Web Server**: Nginx (Alpine)
- **PHP**: PHP 8.2 FPM (Alpine)
- **Database**: PostgreSQL 16 (Alpine)
- **Cache/Session/Queue**: Redis 7 (Alpine)
- **Queue Worker**: Laravel Queue Worker
- **Scheduler**: Laravel Scheduler

## 📦 Installation Steps

### Step 1: Persiapan VPS

```bash
# SSH ke VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verify installation
docker --version
docker compose version
```

### Step 2: Clone Repository

```bash
# Clone repository
git clone https://github.com/your-username/skyhouse.git
cd skyhouse

# Atau jika sudah ada repository, pull latest
git pull origin master
```

### Step 3: Configure Environment

```bash
# Copy production environment template
cp .env.production.example .env.production

# Edit environment file
nano .env.production
```

**PENTING! Update nilai berikut di `.env.production`:**

```env
APP_URL=http://your-vps-ip
APP_DEBUG=false
APP_ENV=production

DB_DATABASE=skyhouse
DB_USERNAME=skyhouse
DB_PASSWORD=YOUR_SECURE_PASSWORD_HERE  # Ganti dengan password yang kuat!

REDIS_PASSWORD=YOUR_REDIS_PASSWORD     # Opsional tapi disarankan
```

### Step 4: First Deployment

```bash
# Jalankan first deployment script
bash scripts/first-deploy.sh
```

Script ini akan:
1. ✅ Build Docker images
2. ✅ Start semua containers (app, nginx, postgres, redis, queue, scheduler)
3. ✅ Install dependencies (composer & npm)
4. ✅ Generate application key
5. ✅ Run database migrations
6. ✅ Create storage symlink
7. ✅ Cache configuration, routes, dan views
8. ✅ Set permissions

**Proses ini memakan waktu sekitar 5-10 menit.**

### Step 5: Create Admin User

```bash
# Masuk ke container app
docker compose -f docker-compose.prod.yml exec app php artisan tinker

# Create admin user
User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('your-password')
]);

# Keluar dari tinker
exit
```

### Step 6: Test Application

Buka browser dan akses:
```
http://your-vps-ip
```

Login ke admin panel:
```
http://your-vps-ip/admin/login
```

## 🔄 Update Deployment

Untuk update aplikasi setelah push code baru:

```bash
cd /path/to/skyhouse

# Pull latest code
git pull origin master

# Run update deployment (zero-downtime)
bash deploy.sh
```

Script `deploy.sh` akan:
1. Enable maintenance mode
2. Pull latest code
3. Rebuild containers jika ada perubahan
4. Update dependencies
5. Build frontend assets
6. Run migrations
7. Clear & cache everything
8. Restart services
9. Disable maintenance mode

## 🔐 Setup SSL (HTTPS)

Jika sudah punya domain:

### 1. Update Nginx Configuration

Edit `docker/nginx/nginx.conf` dan tambahkan:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # ... rest of config
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### 2. Install Certbot

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 3. Update docker-compose.prod.yml

Tambahkan volume untuk SSL:

```yaml
services:
  nginx:
    volumes:
      - /etc/letsencrypt:/etc/nginx/ssl:ro
```

### 4. Restart Nginx

```bash
docker compose -f docker-compose.prod.yml restart nginx
```

## 💾 Backup System

### Manual Backup

```bash
# Backup database
bash scripts/backup-database.sh

# Backup uploaded files
bash scripts/backup-files.sh
```

### Automatic Daily Backup

Setup cron job untuk backup otomatis setiap hari jam 2 pagi:

```bash
# Setup auto backup (run as root)
sudo bash scripts/setup-cron-backup.sh
```

Backup akan disimpan di:
- Database: `backups/database/skyhouse_db_YYYYMMDD_HHMMSS.sql.gz`
- Files: `backups/files/skyhouse_files_YYYYMMDD_HHMMSS.tar.gz`
- Log: `backups/backup.log`

**Backup otomatis akan:**
- ✅ Backup setiap hari jam 2:00 AM
- ✅ Compress dengan gzip
- ✅ Auto cleanup (hapus backup > 7 hari)

### Restore from Backup

```bash
# Restore database
gunzip < backups/database/skyhouse_db_YYYYMMDD_HHMMSS.sql.gz | \
docker exec -i skyhouse-postgres psql -U skyhouse skyhouse

# Restore files
tar -xzf backups/files/skyhouse_files_YYYYMMDD_HHMMSS.tar.gz
```

## 🔧 Maintenance Commands

### View Logs

```bash
# View all logs
docker compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f nginx
docker compose -f docker-compose.prod.yml logs -f postgres
docker compose -f docker-compose.prod.yml logs -f queue
```

### Restart Services

```bash
# Restart all services
docker compose -f docker-compose.prod.yml restart

# Restart specific service
docker compose -f docker-compose.prod.yml restart app
docker compose -f docker-compose.prod.yml restart nginx
docker compose -f docker-compose.prod.yml restart queue
```

### Access Container Shell

```bash
# Access app container
docker compose -f docker-compose.prod.yml exec app sh

# Run artisan commands
docker compose -f docker-compose.prod.yml exec app php artisan migrate
docker compose -f docker-compose.prod.yml exec app php artisan cache:clear
docker compose -f docker-compose.prod.yml exec app php artisan queue:restart
```

### Database Access

```bash
# Access PostgreSQL
docker compose -f docker-compose.prod.yml exec postgres psql -U skyhouse skyhouse

# Run SQL file
docker compose -f docker-compose.prod.yml exec -T postgres psql -U skyhouse skyhouse < backup.sql
```

### Stop/Start Application

```bash
# Stop all services
docker compose -f docker-compose.prod.yml down

# Start all services
docker compose -f docker-compose.prod.yml up -d

# Stop and remove volumes (WARNING: deletes database!)
docker compose -f docker-compose.prod.yml down -v
```

## 🤖 CI/CD Setup (GitHub Actions)

### Setup Auto Deploy

1. **Create production branch**
   ```bash
   git checkout -b production
   git push origin production
   ```

2. **Add GitHub Secrets**

   Go to: GitHub Repository → Settings → Secrets and variables → Actions

   Add these secrets:
   - `SSH_PRIVATE_KEY`: Your SSH private key untuk akses VPS
   - `VPS_HOST`: IP address VPS (contoh: `123.456.789.0`)
   - `VPS_USER`: SSH username (contoh: `root` atau `ubuntu`)
   - `VPS_PATH`: Path project di VPS (contoh: `/var/www/skyhouse`)

3. **Deploy Workflow**

   Setiap kali push ke branch `production`, GitHub Actions akan:
   - SSH ke VPS
   - Pull latest code
   - Run deployment script
   - Notify hasil deployment

### Manual Trigger

Bisa juga trigger deploy manual dari GitHub:
- Go to: Actions → Deploy to Production → Run workflow

## 📊 Monitoring

### Check System Resources

```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check Docker stats
docker stats

# Check container status
docker compose -f docker-compose.prod.yml ps
```

### Health Check

```bash
# Check if all containers running
docker compose -f docker-compose.prod.yml ps

# Test database connection
docker compose -f docker-compose.prod.yml exec postgres pg_isready

# Test Redis connection
docker compose -f docker-compose.prod.yml exec redis redis-cli ping

# Check application
curl http://your-vps-ip
```

## 🛠️ Troubleshooting

### Application tidak bisa diakses

```bash
# Check nginx logs
docker compose -f docker-compose.prod.yml logs nginx

# Check app logs
docker compose -f docker-compose.prod.yml logs app

# Restart services
docker compose -f docker-compose.prod.yml restart
```

### Database connection error

```bash
# Check if postgres running
docker compose -f docker-compose.prod.yml ps postgres

# Check postgres logs
docker compose -f docker-compose.prod.yml logs postgres

# Restart postgres
docker compose -f docker-compose.prod.yml restart postgres
```

### Out of disk space

```bash
# Clean Docker system
docker system prune -a --volumes

# Clean old images
docker image prune -a

# Clean logs
truncate -s 0 storage/logs/*.log
```

### Permission issues

```bash
# Fix storage permissions
docker compose -f docker-compose.prod.yml exec app chown -R www-data:www-data storage bootstrap/cache
docker compose -f docker-compose.prod.yml exec app chmod -R 775 storage bootstrap/cache
```

### Docker build fails with "Cannot find package 'laravel-vite-plugin'"

**Error:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'laravel-vite-plugin'
```

**Cause:** This happens during Docker build when npm tries to build assets without dev dependencies.

**Solution:** This has been fixed in `docker/php/Dockerfile.prod`. The build process now:
1. Installs all dependencies (including dev)
2. Builds frontend assets
3. Removes node_modules
4. Reinstalls only production dependencies

If you still see this error, pull the latest code:
```bash
git pull origin master
docker compose -f docker-compose.prod.yml build --no-cache
```

### Port 80 already in use

**Error:**
```
Bind for 0.0.0.0:80 failed: port is already allocated
```

**Cause:** Port 80 is already being used by another service (usually Apache or Nginx).

**Solution 1 (Recommended): Stop conflicting service**
```bash
# Check what's using port 80
sudo lsof -i :80
# or
sudo netstat -tulpn | grep :80

# If Apache is running
sudo systemctl stop apache2
sudo systemctl disable apache2

# If Nginx is running
sudo systemctl stop nginx
sudo systemctl disable nginx

# Verify port is free
sudo lsof -i :80  # Should return nothing

# Now start containers
bash scripts/first-deploy.sh
```

**Solution 2: Use different port (temporary)**

Edit `docker-compose.prod.yml` and change nginx ports:
```yaml
nginx:
  ports:
    - "8080:80"  # Changed from 80:80
    - "443:443"
```

Then access application at `http://your-vps-ip:8080`

**Solution 3: Remove conflicting package**
```bash
# If you don't need the existing web server
sudo apt remove apache2  # or nginx
sudo apt autoremove
```

## 📞 Support

Jika ada masalah, check:
1. Application logs: `storage/logs/laravel.log`
2. Nginx logs: `storage/logs/nginx/`
3. Docker logs: `docker compose logs`

---

**Last Updated**: November 2025
