# Testing Scheduler - Publish Artikel Otomatis

## ⏱️ Status Scheduler Saat Ini

### Development (Local):
- ✅ **Interval**: Setiap 1 MENIT (untuk testing)
- ✅ **Timezone**: Asia/Jakarta (WIB)
- ✅ **Auto-running**: Ya (via `schedule:work`)

### Production:
- ⚠️ **HARUS DIUBAH**: Interval ke 30 menit
- ✅ **Timezone**: Asia/Jakarta (WIB)
- 📋 **Setup**: Perlu cron job (lihat SCHEDULER_SETUP.md)

---

## 🌍 Timezone Configuration

**PENTING**: Aplikasi menggunakan timezone **Asia/Jakarta (WIB)**.

### Apa yang sudah diupdate:
1. ✅ `config/app.php`: `'timezone' => 'Asia/Jakarta'`
2. ✅ `.env`: `APP_TIMEZONE=Asia/Jakarta`
3. ✅ Model serialization: DateTime return WIB, bukan UTC
4. ✅ Frontend input: Datetime sync dengan WIB
5. ✅ Validation: Warning jika scheduled time di masa lalu

### File yang terpengaruh:
- `app/Models/Article.php` - Override `serializeDate()`
- `app/Models/Event.php` - Override `serializeDate()`
- `app/Models/MediaHighlight.php` - Override `serializeDate()`
- `resources/js/Pages/Admin/Articles/Form.jsx` - Format datetime untuk input

---

## 🚀 Cara Test di Local

### 1. Run Scheduler Terus-menerus

```bash
# Jalankan scheduler work (recommended untuk testing)
./vendor/bin/sail artisan schedule:work
```

Command ini akan:
- ✅ Run scheduler setiap menit otomatis
- ✅ Tidak perlu setup cron job
- ✅ Terus berjalan sampai Ctrl+C
- ✅ Auto-detect perubahan di `routes/console.php`

### 2. Lihat Schedule List

```bash
./vendor/bin/sail artisan schedule:list
```

Output akan menampilkan:
```
0 0 * * *  php artisan sitemap:generate ......... Next Due: 3 hours from now
  * * * * *  php artisan articles:publish-scheduled  Next Due: 11 seconds from now
```

### 3. Test Manual (Tanpa Tunggu)

```bash
# Jalankan command langsung
./vendor/bin/sail artisan articles:publish-scheduled

# Jalankan semua scheduled tasks sekarang
./vendor/bin/sail artisan schedule:run
```

---

## 📝 Buat Artikel Scheduled untuk Testing

### Via Admin Panel:

1. Buka Admin → Articles → Create New
2. Isi form dengan:
   - **Title**: "Test Scheduler Article"
   - **Content**: Lorem ipsum...
   - **Status**: Scheduled
   - **Scheduled At**: Waktu 2-3 menit dari sekarang (dalam WIB)
3. Save article
4. Tunggu scheduler run (max 1 menit)
5. Refresh halaman article, status akan berubah jadi 'published'

### Via Tinker (Quick Test):

```bash
./vendor/bin/sail artisan tinker
```

Lalu jalankan:

```php
// Buat artikel scheduled 2 menit dari sekarang
App\Models\Article::create([
    'title' => 'Test Scheduler - Auto Publish',
    'slug' => 'test-scheduler-auto-publish-' . time(),
    'content' => 'This article should be published automatically in 2 minutes.',
    'excerpt' => 'Testing scheduler with 2 minutes delay',
    'article_category_uid' => App\Models\ArticleCategory::first()->uid,
    'user_uid' => App\Models\User::first()->uid,
    'author_uid' => App\Models\User::first()->uid,
    'is_published' => false,
    'scheduled_at' => now()->addMinutes(2),  // 2 menit dari sekarang (WIB)
    'status' => 'scheduled',
]);

// Atau buat yang langsung bisa dipublish (waktu sudah lewat)
App\Models\Article::create([
    'title' => 'Test Scheduler - Immediate Publish',
    'slug' => 'test-scheduler-immediate-' . time(),
    'content' => 'This should publish immediately on next schedule run.',
    'excerpt' => 'Testing immediate publish',
    'article_category_uid' => App\Models\ArticleCategory::first()->uid,
    'user_uid' => App\Models\User::first()->uid,
    'author_uid' => App\Models\User::first()->uid,
    'is_published' => false,
    'scheduled_at' => now()->subMinutes(5),  // 5 menit yang lalu (WIB)
    'status' => 'scheduled',
]);
```

---

## 🔍 Monitor & Debug

### 1. Monitor Log Real-time

```bash
# Terminal 1: Monitor semua log Laravel
./vendor/bin/sail artisan tail

# Terminal 2: Filter hanya artikel yang dipublish
tail -f storage/logs/laravel.log | grep "Article published"
```

### 2. Cek Database Langsung

```bash
./vendor/bin/sail artisan tinker
```

```php
// Lihat artikel yang scheduled (belum publish)
App\Models\Article::whereNotNull('scheduled_at')
    ->where('is_published', false)
    ->get(['uid', 'title', 'scheduled_at', 'status', 'is_published']);

// Lihat artikel yang baru dipublish otomatis
App\Models\Article::where('status', 'published')
    ->whereNotNull('scheduled_at')
    ->orderBy('published_at', 'desc')
    ->limit(5)
    ->get(['title', 'scheduled_at', 'published_at']);

// Cek waktu server saat ini (harus WIB)
echo now();
// Output: 2025-12-29 20:45:00
```

### 3. SQL Query Manual

```sql
-- Cek artikel yang akan dipublish
SELECT uid, title, scheduled_at, is_published, status,
       NOW() as current_time_wib
FROM articles
WHERE scheduled_at IS NOT NULL
AND scheduled_at <= NOW()
AND is_published = false;

-- Cek artikel yang sudah dipublish otomatis
SELECT title, scheduled_at, published_at, status
FROM articles
WHERE status = 'published'
AND scheduled_at IS NOT NULL
ORDER BY published_at DESC
LIMIT 10;
```

---

## ✅ Expected Result

Setelah scheduler run, artikel dengan `scheduled_at <= now()` akan:

| Field | Before | After |
|-------|--------|-------|
| `is_published` | `false` | `true` |
| `published_at` | `null` | Same as `scheduled_at` |
| `status` | `'scheduled'` | `'published'` |

### Log Output:

```
Published: Test Scheduler - Auto Publish
Published: Test Scheduler - Immediate Publish
Total articles published: 2
```

Jika tidak ada artikel:
```
No articles scheduled for publication at this time.
```

### Laravel Log:

```
[2025-12-29 20:37:15] local.INFO: Article published via scheduler
{"article_uid":"926d9d54-3d2d-4707-8340-9a7a36f4dedf","title":"Lorem ipsum dolor...","scheduled_at":"2025-12-29 20:36:00","published_at":"2025-12-29 20:36:00"}
```

---

## 🔧 Troubleshooting

### Scheduler tidak jalan otomatis?

**Solusi 1**: Jalankan scheduler work
```bash
./vendor/bin/sail artisan schedule:work
```

**Solusi 2**: Run manual setiap kali test
```bash
./vendor/bin/sail artisan schedule:run
```

### Artikel tidak terpublish?

**Debug checklist**:

1. ✅ Cek `scheduled_at` dalam WIB:
   ```php
   $article = App\Models\Article::find('article-uid');
   echo $article->scheduled_at;  // Harus format: 2025-12-29 20:10:00
   ```

2. ✅ Cek waktu sekarang (harus WIB):
   ```php
   echo now();  // Harus WIB, contoh: 2025-12-29 20:45:00
   ```

3. ✅ Cek timezone config:
   ```php
   echo config('app.timezone');  // Harus: Asia/Jakarta
   ```

4. ✅ Cek field artikel:
   ```php
   $article = App\Models\Article::find('article-uid');
   echo "scheduled_at: " . $article->scheduled_at . "\n";
   echo "is_published: " . ($article->is_published ? 'true' : 'false') . "\n";
   echo "status: " . $article->status . "\n";
   echo "Is past: " . ($article->scheduled_at->isPast() ? 'Yes' : 'No') . "\n";
   ```

### Waktu tidak sync (masih UTC)?

**Gejala**: scheduled_at menampilkan waktu UTC, bukan WIB.

**Penyebab**: Config cache belum clear atau container belum restart.

**Solusi**:
```bash
# Clear config cache
./vendor/bin/sail artisan config:clear

# Restart container
./vendor/bin/sail restart
```

### Status berubah jadi 'draft' saat edit?

**Penyebab**: Form menggunakan `computed_status` (dinamis) bukan `status` (persisten).

**Fix**: Sudah diperbaiki di `resources/js/Pages/Admin/Articles/Form.jsx` line 52, sekarang menggunakan `article?.status` bukan `article?.computed_status`.

---

## ⚠️ SEBELUM DEPLOY PRODUCTION

### 1. Ubah Scheduler Interval

Edit `routes/console.php` line 16:

**BEFORE (Testing)**:
```php
Schedule::command('articles:publish-scheduled')
    ->everyMinute()  // ⚠️ TESTING ONLY
    ->withoutOverlapping()
    ->runInBackground();
```

**AFTER (Production)**:
```php
Schedule::command('articles:publish-scheduled')
    ->everyThirtyMinutes()  // ✅ PRODUCTION
    ->withoutOverlapping()
    ->runInBackground();
```

### 2. Setup Cron Job di Production

Lihat detail di **SCHEDULER_SETUP.md**.

Quick setup:
```bash
# Edit crontab
crontab -e

# Tambahkan (ganti path sesuai server):
* * * * * cd /var/www/skyhouse-dev && php artisan schedule:run >> /dev/null 2>&1
```

### 3. Production Checklist

- [ ] ✅ Scheduler interval = `->everyThirtyMinutes()`
- [ ] ✅ Cron job sudah ditambahkan
- [ ] ✅ Timezone config = Asia/Jakarta
- [ ] ✅ Config cache cleared
- [ ] ✅ Web server restart
- [ ] ✅ Test manual `php artisan schedule:run`
- [ ] ✅ Monitor log 30-60 menit pertama

---

## 📚 Related Files

### Backend:
- `routes/console.php` - Scheduler registration
- `app/Console/Commands/PublishScheduledArticles.php` - Publish command
- `app/Models/Article.php` - Model dengan timezone serialization
- `app/Http/Controllers/Admin/ArticleController.php` - Validation & save logic

### Frontend:
- `resources/js/Pages/Admin/Articles/Form.jsx` - Article form dengan datetime input

### Config:
- `config/app.php` - Timezone configuration
- `.env` - Environment variables (APP_TIMEZONE)

### Documentation:
- `SCHEDULER_SETUP.md` - Production setup guide
- `test-scheduler.md` - Testing guide (this file)

---

## 💡 Tips & Best Practices

1. **Always use `now()`** untuk compare datetime, jangan `Carbon::now()` atau `new DateTime()` tanpa timezone
2. **Jangan gunakan `computed_status`** untuk initial value form, gunakan `status` dari database
3. **Test dengan timezone browser berbeda** untuk pastikan tidak ada hardcoded timezone di frontend
4. **Monitor log production** untuk pastikan tidak ada artikel yang missed
5. **Backup database** sebelum mass update scheduled articles

---

**Last Updated**: 2025-12-29 (Timezone sync update)
**Tested With**: Laravel 11, PHP 8.4, PostgreSQL, Laravel Sail
