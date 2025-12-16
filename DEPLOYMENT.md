# Deployment Guide

## Setelah Update Routes atau Code

Jalankan command berikut di **production server**:

```bash
# 1. Pull latest code
git pull origin master

# 2. Install/update dependencies (jika ada perubahan)
composer install --no-dev --optimize-autoloader

# 3. Clear semua cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 4. Optimize untuk production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Build frontend assets (jika ada perubahan frontend)
npm run build

# 6. Restart queue workers (jika menggunakan queue)
php artisan queue:restart

# 7. Restart PHP-FPM atau web server
# Cek versi PHP yang terinstall dulu:
php -v

# Restart PHP-FPM sesuai versi (pilih salah satu):
sudo systemctl restart php8.3-fpm
# atau
sudo systemctl restart php8.2-fpm
# atau
sudo systemctl restart php8.1-fpm

# Reload Nginx
sudo systemctl reload nginx
# atau
sudo service nginx reload
```

## Quick Fix untuk Route Error

Jika hanya route yang bermasalah:

```bash
php artisan route:clear
php artisan route:cache
```

## Untuk Development/Testing

Jangan gunakan route cache di development:

```bash
php artisan route:clear
```

## Troubleshooting

### Error: "Unit php8.4-fpm.service not found"

**Cause:** PHP-FPM service name berbeda sesuai versi PHP yang terinstall

**Solution - Cari service PHP-FPM yang aktif:**
```bash
# Method 1: List semua PHP-FPM services
systemctl list-units --type=service | grep php

# Method 2: Cek manual
ls /etc/systemd/system/multi-user.target.wants/ | grep php

# Method 3: Cek process yang running
ps aux | grep php-fpm

# Method 4: Cek status semua versi
sudo systemctl status php8.3-fpm
sudo systemctl status php8.2-fpm
sudo systemctl status php8.1-fpm
```

**Setelah ketemu versinya, restart:**
```bash
# Contoh untuk PHP 8.3
sudo systemctl restart php8.3-fpm

# Atau reload aja (lebih aman, tidak putus koneksi):
sudo systemctl reload php8.3-fpm
```

### Error: "Route api/news could not be found"

**Cause:** Route cache belum di-update setelah menambah route baru

**Solution:**
```bash
php artisan route:clear
php artisan route:cache
```

### Error: Config atau View tidak update

**Solution:**
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

Lalu optimize lagi:
```bash
php artisan config:cache
php artisan view:cache
```

## Environment-Specific Commands

### Development
```bash
# Jangan cache di development
php artisan route:clear
php artisan config:clear
php artisan view:clear
```

### Production
```bash
# Selalu cache di production untuk performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
