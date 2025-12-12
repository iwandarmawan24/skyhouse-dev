# Deployment Summary - December 2025

Summary singkat step-by-step deployment ulang SkyHouse Property ke production server.

---

## 📝 Overview

**Server:** VPS Ubuntu 22.04
**IP:** 103.126.116.26
**Tech Stack:** Laravel 11 + PostgreSQL 14 + Nginx + PHP 8.2-FPM
**Domain:** Belum ada (akses via IP)

---

## 🚀 Deployment Steps

### **1. Clone Repository**
```bash
cd /var/www
git clone git@github.com:username/skyhouse.git skyhouse-dev
cd skyhouse-dev
```

### **2. Install Dependencies**
```bash
composer install --no-dev --optimize-autoloader
npm install
```

### **3. Configure Environment**
```bash
cp .env.example .env
nano .env  # Edit database credentials
php artisan key:generate
```

**Key `.env` settings:**
- `APP_ENV=production`
- `APP_DEBUG=false`
- `DB_HOST=127.0.0.1` (bukan `pgsql`!)
- `DB_DATABASE=skyhouse_production`
- `DB_USERNAME=skyhouse`
- `DB_PASSWORD=SkyH0use2024!Prod`

### **4. Setup PostgreSQL**
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE skyhouse_production;
CREATE USER skyhouse WITH PASSWORD 'SkyH0use2024!Prod';
GRANT ALL PRIVILEGES ON DATABASE skyhouse_production TO skyhouse;
\c skyhouse_production
GRANT ALL ON SCHEMA public TO skyhouse;
\q
```

### **5. Run Migrations & Create Admin**
```bash
php artisan migrate --force
php artisan storage:link
php artisan tinker
```

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

### **6. Build Frontend**
```bash
npm run build:vps
```

### **7. Set Permissions**
```bash
sudo chown -R www-data:www-data .
sudo chmod -R 775 storage bootstrap/cache
```

### **8. Optimize Laravel**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### **9. Restart Services**
```bash
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
```

---

## ✅ Verification

```bash
# Check routes
php artisan route:list --path=media-library

# Test endpoint
curl -I http://103.126.116.26/admin/media-library

# Check logs
tail -f storage/logs/laravel.log
```

**Login:**
- URL: `http://103.126.116.26/admin/login`
- Email: `admin@skyhouse.com`
- Password: `admin123`

---

## 🐛 Issues Fixed

### **1. Laravel Pail Error**
**Problem:** `laravel/pail` package missing di production
**Solution:** Edit `composer.json` → add to `dont-discover`

```json
"extra": {
    "laravel": {
        "dont-discover": [
            "laravel/pail"
        ]
    }
}
```

### **2. Database Connection Error**
**Problem:** `.env` pakai `DB_HOST=pgsql` (Docker hostname)
**Solution:** Ubah ke `DB_HOST=127.0.0.1`

### **3. User Model `$fillable` Issue**
**Problem:** Column `name` dan `email_verified_at` tidak di `$fillable`
**Solution:** Edit `app/Models/User.php`:

```php
protected $fillable = [
    'name',              // ← Added
    'username',
    'full_name',
    'email',
    'password',
    'role',
    'status',
    'email_verified_at'  // ← Added
];
```

### **4. MediaLibrary Route Model Binding**
**Problem:** Model pakai `uid` tapi Laravel cari `id`
**Solution:** Edit `app/Models/MediaLibrary.php`:

```php
public function getRouteKeyName()
{
    return 'uid';
}
```

---

## 📁 File Changes Summary

### **Modified Files:**
1. `composer.json` - Disable laravel/pail auto-discovery
2. `app/Models/User.php` - Add `name` & `email_verified_at` to fillable
3. `app/Models/MediaLibrary.php` - Add `getRouteKeyName()` method

### **Created Files:**
1. `docs/deployment/PRODUCTION-REDEPLOYMENT-GUIDE.md` - Complete deployment guide

### **Archived Files:**
1. `REORGANIZATION.md` → `docs/archive/`
2. `TOAST_MIGRATION_GUIDE.md` → `docs/archive/`

---

## 🔄 Update Workflow (Future)

Untuk update code di kemudian hari:

```bash
cd /var/www/skyhouse-dev
git pull
composer install --no-dev --optimize-autoloader
php artisan migrate --force
npm install && npm run build:vps
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
sudo systemctl restart php8.2-fpm
```

---

## 📚 Full Documentation

Untuk panduan lengkap, lihat:
- **[Production Re-Deployment Guide](docs/deployment/PRODUCTION-REDEPLOYMENT-GUIDE.md)** - Step-by-step lengkap
- **[VPS Setup Guide](docs/deployment/vps-setup.md)** - Setup server dari nol
- **[Lightweight Deployment](docs/deployment/lightweight-deployment.md)** - Deploy di VPS resource terbatas

---

## 🎯 Key Takeaways

1. **Always check `.env`** - Hostname Docker (`pgsql`, `redis`) tidak valid di production
2. **Database privileges** - Pastikan user PostgreSQL punya GRANT ALL di schema public
3. **Model fillable** - Cek semua required columns ada di `$fillable`
4. **Route model binding** - Model dengan custom primary key perlu `getRouteKeyName()`
5. **Clear cache** - Selalu clear cache setelah update code atau config

---

**Deployment Date:** December 11, 2025
**Status:** ✅ Success
**Admin Access:** Working
**Media Library:** Working
**All Routes:** Registered
