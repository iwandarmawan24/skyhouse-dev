# Laravel Scheduler Setup untuk Production Server

## 🌍 Timezone Configuration

**PENTING**: Aplikasi ini menggunakan timezone **Asia/Jakarta (WIB)**.

Semua datetime (scheduled_at, published_at, event_date, dll) disimpan dan ditampilkan dalam timezone WIB.

### Konfigurasi Timezone

File yang sudah diset:
- `config/app.php`: `'timezone' => 'Asia/Jakarta'`
- `.env`: `APP_TIMEZONE=Asia/Jakarta`

**JANGAN ubah timezone ini** kecuali Anda benar-benar tahu apa yang Anda lakukan.

---

## Tanpa Docker (PHP Artisan Biasa)

Untuk menjalankan Laravel Scheduler di server production tanpa Docker, Anda perlu setup **Cron Job**.

### 1. Setup Cron Job

Buka crontab editor di server:
```bash
crontab -e
```

Tambahkan baris berikut:
```bash
* * * * * cd /path/to/your/project && php artisan schedule:run >> /dev/null 2>&1
```

**Ganti `/path/to/your/project`** dengan path lengkap ke project Laravel Anda.

Contoh:
```bash
* * * * * cd /var/www/skyhouse-dev && php artisan schedule:run >> /dev/null 2>&1
```

### 2. Penjelasan Cron Job

- `* * * * *` = Jalankan setiap menit
- `cd /path/to/your/project` = Masuk ke directory project
- `php artisan schedule:run` = Jalankan Laravel scheduler
- `>> /dev/null 2>&1` = Redirect output (opsional, bisa dihapus untuk debugging)

### 3. Verifikasi Cron Job

Cek apakah cron job sudah terdaftar:
```bash
crontab -l
```

### 4. Alternative: Dengan Logging

Jika ingin melihat log cron job:
```bash
* * * * * cd /var/www/skyhouse-dev && php artisan schedule:run >> /var/www/skyhouse-dev/storage/logs/scheduler.log 2>&1
```

### 5. Testing

Setelah setup cron, tunggu 1 menit lalu cek log:
```bash
# Cek log scheduler
tail -f storage/logs/scheduler.log

# Atau cek log Laravel
tail -f storage/logs/laravel.log | grep "Article published"
```

### 6. Manual Testing (Tanpa Tunggu Cron)

Jalankan scheduler secara manual untuk testing:
```bash
php artisan schedule:run
```

Atau jalankan command langsung:
```bash
php artisan articles:publish-scheduled
```

---

## Scheduled Tasks yang Berjalan

### 1. Sitemap Generation
- **Schedule**: Daily (setiap hari pukul 00:00 WIB)
- **Command**: `php artisan sitemap:generate`
- **Fungsi**: Generate sitemap.xml untuk SEO

### 2. Publish Scheduled Articles
- **Schedule**: Setiap 30 menit (production) / Setiap 1 menit (testing)
- **Command**: `php artisan articles:publish-scheduled`
- **Fungsi**: Auto-publish artikel yang sudah terjadwal
- **File**: `app/Console/Commands/PublishScheduledArticles.php`

**⚠️ PRODUCTION SETTING**

Pastikan di `routes/console.php` line 16 menggunakan:
```php
Schedule::command('articles:publish-scheduled')
    ->everyThirtyMinutes()  // PRODUCTION: 30 menit
    ->withoutOverlapping()
    ->runInBackground();
```

Untuk testing local bisa diganti ke `->everyMinute()`, tapi **HARUS dikembalikan** ke `->everyThirtyMinutes()` sebelum deploy production.

---

## 🔧 Troubleshooting

### Cron tidak jalan?

1. **Cek PHP path:**
   ```bash
   which php
   ```
   Output: `/usr/bin/php` atau `/usr/local/bin/php`

   Gunakan full path di cron:
   ```bash
   * * * * * cd /var/www/skyhouse-dev && /usr/bin/php artisan schedule:run >> /dev/null 2>&1
   ```

2. **Cek permission:**
   ```bash
   # Pastikan web user (www-data, nginx, apache) bisa akses
   sudo chown -R www-data:www-data /var/www/skyhouse-dev
   sudo chmod -R 755 /var/www/skyhouse-dev
   ```

3. **Cek user cron:**
   ```bash
   # Jika menggunakan user www-data
   sudo crontab -u www-data -e
   ```

4. **Enable cron logging:**
   Edit `/etc/rsyslog.conf` dan uncomment:
   ```
   cron.*  /var/log/cron.log
   ```
   Restart rsyslog:
   ```bash
   sudo service rsyslog restart
   ```

5. **Cek cron log:**
   ```bash
   tail -f /var/log/cron.log
   tail -f /var/log/syslog | grep CRON
   ```

### Timezone tidak sesuai?

**Gejala**: Artikel scheduled untuk jam 20:00 WIB tapi baru publish jam 03:00 WIB keesokan harinya.

**Penyebab**: Timezone config masih UTC.

**Solusi**:
1. Cek `config/app.php`: Harus `'timezone' => 'Asia/Jakarta'`
2. Cek `.env`: Harus `APP_TIMEZONE=Asia/Jakarta`
3. Clear config cache:
   ```bash
   php artisan config:clear
   ```
4. Restart web server:
   ```bash
   sudo systemctl restart php8.4-fpm  # atau php8.3-fpm, sesuaikan versi
   sudo systemctl restart nginx       # atau apache2
   ```

### Artikel tidak terpublish?

**Debug checklist**:
1. ✅ `scheduled_at` sudah lewat? (`<= NOW()` dalam WIB)
2. ✅ `is_published` = `false`?
3. ✅ Field `scheduled_at` tidak null?
4. ✅ `status` = `'scheduled'`?

Query untuk cek:
```sql
SELECT uid, title, scheduled_at, is_published, status,
       NOW() as current_time
FROM articles
WHERE scheduled_at IS NOT NULL
AND scheduled_at <= NOW()
AND is_published = false;
```

**Catatan**: `NOW()` di SQL akan menggunakan timezone server database. Pastikan server timezone juga Asia/Jakarta.

---

## 📊 Monitoring

### Cek artikel yang akan dipublish:
```sql
SELECT title, scheduled_at, is_published, status
FROM articles
WHERE scheduled_at IS NOT NULL
AND is_published = false
ORDER BY scheduled_at;
```

### Cek artikel yang baru dipublish otomatis:
```sql
SELECT title, scheduled_at, published_at, status
FROM articles
WHERE status = 'published'
AND scheduled_at IS NOT NULL
ORDER BY published_at DESC
LIMIT 10;
```

### Cek log publish:
```bash
grep "Article published via scheduler" storage/logs/laravel.log
```

### Cek schedule list:
```bash
php artisan schedule:list
```

---

## Production Checklist

Sebelum deploy ke production:

- [ ] ✅ Timezone di `config/app.php` = `'Asia/Jakarta'`
- [ ] ✅ Timezone di `.env` = `APP_TIMEZONE=Asia/Jakarta`
- [ ] ✅ Scheduler interval di `routes/console.php` = `->everyThirtyMinutes()`
- [ ] ✅ Cron job ditambahkan dengan user yang tepat
- [ ] ✅ Path project sudah benar di cron
- [ ] ✅ PHP path sudah full path (`which php`)
- [ ] ✅ Permission folder sudah benar (755)
- [ ] ✅ Test manual `php artisan schedule:run` berhasil
- [ ] ✅ Test manual `php artisan articles:publish-scheduled` berhasil
- [ ] ✅ Config cache cleared (`php artisan config:clear`)
- [ ] ✅ Web server sudah restart
- [ ] ✅ Cek log setelah 30-60 menit untuk memastikan berjalan
- [ ] ✅ Monitor log artikel yang terpublish otomatis

---

## Alternative: Supervisor (Recommended untuk Production)

Untuk monitoring lebih baik dan auto-restart jika crash, gunakan Supervisor:

### 1. Install supervisor:
```bash
sudo apt-get install supervisor
```

### 2. Buat config file `/etc/supervisor/conf.d/laravel-scheduler.conf`:
```ini
[program:laravel-scheduler]
process_name=%(program_name)s
command=/bin/sh -c "while [ true ]; do (php /var/www/skyhouse-dev/artisan schedule:run --verbose --no-interaction & sleep 60); done"
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/www/skyhouse-dev/storage/logs/scheduler.log
```

**Ganti `/var/www/skyhouse-dev`** dengan path project Anda.

### 3. Update supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-scheduler
```

### 4. Cek status:
```bash
sudo supervisorctl status laravel-scheduler
```

### 5. Command supervisor lainnya:
```bash
# Restart
sudo supervisorctl restart laravel-scheduler

# Stop
sudo supervisorctl stop laravel-scheduler

# Tail log
sudo supervisorctl tail -f laravel-scheduler
```

---

## 🚀 Local Development (Laravel Sail)

Untuk development dengan Laravel Sail:

### Run scheduler terus-menerus (seperti cron):
```bash
./vendor/bin/sail artisan schedule:work
```

Command ini akan:
- ✅ Run scheduler setiap menit
- ✅ Auto-detect perubahan di `routes/console.php`
- ✅ Terus berjalan sampai Ctrl+C

### Run scheduler sekali saja:
```bash
./vendor/bin/sail artisan schedule:run
```

### Test command langsung:
```bash
./vendor/bin/sail artisan articles:publish-scheduled
```

---

## 📝 Catatan Penting

1. **Timezone Consistency**: Semua datetime di aplikasi (frontend & backend) sudah sync dengan Asia/Jakarta
2. **Datetime Serialization**: Model Article, Event, dan MediaHighlight sudah override `serializeDate()` untuk return datetime dalam WIB, bukan UTC
3. **Validation**: Form artikel punya validasi untuk warn user jika scheduled time di masa lalu
4. **Status Management**: Field `status` di database persisten, jangan bergantung pada `computed_status` yang dinamis

**Jika ada masalah timezone**, pastikan semua service (web server, database, cron) menggunakan timezone yang sama: **Asia/Jakarta**.
