# Database Migration Guide

Panduan untuk melakukan perubahan database dengan aman tanpa kehilangan data.

## ⚠️ PERINGATAN: Perintah yang Menghapus Data

### Jangan Gunakan di Production atau Development dengan Data Penting:

```bash
# ❌ BAHAYA - Menghapus semua tabel dan data, lalu migrate ulang
./vendor/bin/sail artisan migrate:fresh

# ❌ BAHAYA - Rollback semua migration dan data
./vendor/bin/sail artisan migrate:reset

# ❌ BAHAYA - Rollback, fresh migrate, dan seed
./vendor/bin/sail artisan migrate:refresh
```

**Gunakan perintah di atas HANYA untuk:**
- Development awal (data masih dummy)
- Testing
- Setelah backup database

---

## ✅ Cara Aman: Menambah Kolom ke Tabel yang Sudah Ada

### Langkah 1: Buat Migration Baru

```bash
./vendor/bin/sail artisan make:migration add_column_name_to_table_name
```

**Contoh:**
```bash
./vendor/bin/sail artisan make:migration add_slug_to_events_table
./vendor/bin/sail artisan make:migration add_seo_fields_to_articles_table
```

### Langkah 2: Edit Migration File

File akan dibuat di `database/migrations/YYYY_MM_DD_HHMMSS_add_column_name_to_table_name.php`

**Contoh menambah 1 kolom:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('slug')->unique()->after('title');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
```

**Contoh menambah beberapa kolom:**
```php
public function up(): void
{
    Schema::table('articles', function (Blueprint $table) {
        $table->string('slug')->unique()->after('title');
        $table->string('meta_title')->nullable()->after('slug');
        $table->text('meta_description')->nullable()->after('meta_title');
        $table->string('meta_keywords')->nullable()->after('meta_description');
        $table->string('focus_keyword')->nullable()->after('meta_keywords');
    });
}

public function down(): void
{
    Schema::table('articles', function (Blueprint $table) {
        $table->dropColumn(['slug', 'meta_title', 'meta_description', 'meta_keywords', 'focus_keyword']);
    });
}
```

### Langkah 3: Jalankan Migration

```bash
# ✅ AMAN - Hanya menjalankan migration baru yang belum dijalankan
./vendor/bin/sail artisan migrate
```

---

## 🔄 Rollback Migration (Jika Ada Kesalahan)

### Rollback Migration Terakhir
```bash
# Rollback 1 batch terakhir
./vendor/bin/sail artisan migrate:rollback

# Rollback 3 batch terakhir
./vendor/bin/sail artisan migrate:rollback --step=3
```

### Cek Status Migration
```bash
./vendor/bin/sail artisan migrate:status
```

---

## 📝 Tips & Best Practices

### 1. Selalu Gunakan `nullable()` atau `default()` untuk Kolom Baru
Jika tabel sudah ada data, kolom baru harus nullable atau punya default value:

```php
// ✅ AMAN - untuk tabel yang sudah ada data
$table->string('slug')->nullable();
$table->boolean('is_featured')->default(false);
$table->timestamp('published_at')->nullable();

// ❌ BERBAHAYA - akan error jika tabel sudah ada data
$table->string('slug'); // required tanpa default
```

### 2. Gunakan `after()` untuk Posisi Kolom
```php
$table->string('slug')->after('title'); // Letakkan setelah kolom title
```

### 3. Jangan Lupa `down()` Method
Selalu implementasikan rollback di method `down()`:

```php
public function down(): void
{
    Schema::table('events', function (Blueprint $table) {
        $table->dropColumn('slug');
    });
}
```

### 4. Test di Local Dulu
Sebelum deploy ke production:
1. Test migration di local
2. Test rollback
3. Pastikan tidak ada error

---

## 🗂️ Mengubah Tipe Data Kolom yang Sudah Ada

### Langkah 1: Install doctrine/dbal
```bash
./vendor/bin/sail composer require doctrine/dbal
```

### Langkah 2: Buat Migration
```bash
./vendor/bin/sail artisan make:migration change_column_type_in_table_name
```

### Langkah 3: Ubah Tipe Data
```php
public function up(): void
{
    Schema::table('events', function (Blueprint $table) {
        $table->text('description')->change(); // Ubah dari string ke text
    });
}
```

---

## 🔐 Backup Database Sebelum Migration (Recommended)

### Untuk PostgreSQL
```bash
# Backup
./vendor/bin/sail exec pgsql pg_dump -U sail skyhouse > backup.sql

# Restore (jika diperlukan)
./vendor/bin/sail exec -T pgsql psql -U sail skyhouse < backup.sql
```

### Untuk MySQL
```bash
# Backup
./vendor/bin/sail mysql skyhouse > backup.sql

# Restore
./vendor/bin/sail mysql skyhouse < backup.sql
```

---

## 📋 Checklist Sebelum Migration

- [ ] Sudah backup database (jika data penting)
- [ ] Migration file sudah benar (up & down method)
- [ ] Kolom baru pakai `nullable()` atau `default()` jika tabel ada data
- [ ] Sudah test di environment local
- [ ] Sudah commit migration file ke git

---

## 🆘 Recovery: Jika Data Hilang Karena migrate:fresh

Jika tidak ada backup:
1. **Data hilang permanen** ❌
2. Harus input ulang data
3. Lesson learned: Selalu backup!

Jika ada backup:
1. Restore dari backup SQL
2. Atau restore dari git (jika ada seeder)

---

## 📚 Reference

- [Laravel Migration Docs](https://laravel.com/docs/migrations)
- [Column Types](https://laravel.com/docs/migrations#available-column-types)
- [Column Modifiers](https://laravel.com/docs/migrations#column-modifiers)
