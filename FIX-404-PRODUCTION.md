# Fix 404 Error di Production Server

## Diagnosa Masalah

SSH ke server dan cek:

```bash
ssh user@103.126.116.26
cd /var/www/skyhouse-dev

# Cek web server yang digunakan
ps aux | grep -E 'nginx|apache' | grep -v grep

# Cek file structure
ls -la public/
ls -la public/index.php
```

---

## Solusi 1: Fix Nginx Configuration (Paling Umum)

### 1. Cek konfigurasi Nginx yang aktif

```bash
# Cek site yang enabled
ls -la /etc/nginx/sites-enabled/

# Lihat isi konfigurasi
sudo cat /etc/nginx/sites-enabled/default
# atau
sudo cat /etc/nginx/sites-enabled/skyhouse
```

### 2. Update konfigurasi Nginx

Edit file konfigurasi Nginx:

```bash
sudo nano /etc/nginx/sites-available/skyhouse
```

Paste konfigurasi ini (sesuaikan path dan PHP version):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name 103.126.116.26;
    root /var/www/skyhouse-dev/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php index.html;

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

### 3. Enable site dan restart Nginx

```bash
# Enable site (jika belum)
sudo ln -s /etc/nginx/sites-available/skyhouse /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Solusi 2: Fix Apache Configuration

Jika menggunakan Apache:

### 1. Enable mod_rewrite

```bash
sudo a2enmod rewrite
```

### 2. Update Virtual Host

Edit Apache config:

```bash
sudo nano /etc/apache2/sites-available/skyhouse.conf
```

Paste:

```apache
<VirtualHost *:80>
    ServerName 103.126.116.26
    DocumentRoot /var/www/skyhouse-dev/public

    <Directory /var/www/skyhouse-dev/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/skyhouse-error.log
    CustomLog ${APACHE_LOG_DIR}/skyhouse-access.log combined
</VirtualHost>
```

### 3. Enable site dan restart

```bash
sudo a2ensite skyhouse
sudo systemctl restart apache2
```

---

## Solusi 3: Laravel Configuration Fixes

Jalankan command ini di directory project:

```bash
cd /var/www/skyhouse-dev

# Clear all caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Recreate storage link
php artisan storage:link

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Fix permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## Solusi 4: Cek Document Root

Pastikan document root mengarah ke folder `public`:

```bash
# Web server HARUS mengarah ke folder public, bukan root project
# ✅ BENAR: /var/www/skyhouse-dev/public
# ❌ SALAH: /var/www/skyhouse-dev

# Cek current directory structure
ls -la /var/www/skyhouse-dev/
ls -la /var/www/skyhouse-dev/public/
```

---

## Solusi 5: Cek PHP-FPM Socket

Jika menggunakan Nginx, pastikan PHP-FPM socket path benar:

```bash
# Cek PHP version yang installed
php -v

# Cek socket yang tersedia
ls -la /var/run/php/

# Common socket paths:
# - /var/run/php/php8.2-fpm.sock
# - /var/run/php/php8.1-fpm.sock
# - /var/run/php-fpm/www.sock

# Update di Nginx config sesuai path yang benar
```

---

## Testing

Setelah fix, test dengan:

```bash
# Test dari server
curl -I http://localhost
curl -I http://103.126.116.26

# Cek Nginx/Apache logs
sudo tail -f /var/log/nginx/error.log
# atau
sudo tail -f /var/log/apache2/error.log
```

---

## Checklist Lengkap

- [ ] Web server config mengarah ke `/public` folder
- [ ] Nginx/Apache configuration sudah benar
- [ ] PHP-FPM socket path sudah sesuai
- [ ] `mod_rewrite` enabled (Apache) atau `try_files` configured (Nginx)
- [ ] Laravel cache sudah di-clear
- [ ] Storage link sudah dibuat (`php artisan storage:link`)
- [ ] File permissions sudah benar (775 untuk folders, 664 untuk files)
- [ ] Ownership sudah benar (www-data:www-data)
- [ ] Composer dependencies sudah di-install
- [ ] `.env` file exists dan configured

---

## Quick Fix Script

Jalankan script ini untuk auto-fix common issues:

```bash
#!/bin/bash
cd /var/www/skyhouse-dev

echo "Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

echo "Creating storage link..."
php artisan storage:link

echo "Fixing permissions..."
sudo chown -R www-data:www-data .
sudo chmod -R 755 .
sudo chmod -R 775 storage bootstrap/cache

echo "Optimizing..."
php artisan config:cache
php artisan route:cache

echo "Restarting web server..."
if systemctl is-active --quiet nginx; then
    sudo systemctl restart nginx
    echo "Nginx restarted"
elif systemctl is-active --quiet apache2; then
    sudo systemctl restart apache2
    echo "Apache restarted"
fi

echo "Done! Check http://103.126.116.26"
```

---

## Masih 404?

Jika masih 404 setelah semua langkah di atas:

1. **Cek Nginx/Apache error logs**:
   ```bash
   sudo tail -100 /var/log/nginx/error.log
   sudo tail -100 /var/log/apache2/error.log
   ```

2. **Cek Laravel logs**:
   ```bash
   tail -100 storage/logs/laravel.log
   ```

3. **Test PHP**:
   ```bash
   php -v
   php artisan --version
   ```

4. **Test web server access**:
   ```bash
   curl -v http://localhost/
   ```

Share output dari command di atas untuk troubleshooting lebih lanjut.
