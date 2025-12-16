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
sudo systemctl restart php8.4-fpm
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
