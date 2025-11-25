# 🌱 Database Seeding Guide - SkyHouse CMS

Panduan lengkap untuk generate dummy data di SkyHouse CMS.

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Available Seeders](#-available-seeders)
3. [Seeding Commands](#-seeding-commands)
4. [Data Yang Di-Generate](#-data-yang-di-generate)
5. [Custom Seeding](#-custom-seeding)
6. [Production vs Development](#-production-vs-development)
7. [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Development (Local dengan Sail)

```bash
# Fresh database dengan semua data
./vendor/bin/sail artisan migrate:fresh --seed

# Atau step by step
./vendor/bin/sail artisan migrate:fresh
./vendor/bin/sail artisan db:seed
```

### Production (VPS dengan Docker)

```bash
# Seed data ke production database
docker compose -f docker-compose.prod.yml exec app php artisan db:seed

# DANGER: Reset database + seed (hapus semua data!)
docker compose -f docker-compose.prod.yml exec app php artisan migrate:fresh --seed
```

### Local Development (Tanpa Docker)

```bash
# Fresh migration + seed
php artisan migrate:fresh --seed

# Seed aja (tanpa hapus data)
php artisan db:seed
```

---

## 📦 Available Seeders

Project ini punya seeders lengkap untuk semua data:

| Seeder | Description | Records |
|--------|-------------|---------|
| `DatabaseSeeder` | **Master seeder** - Jalankan semua seeders | All |
| `HeroBannerSeeder` | Hero banners untuk homepage | 5 banners |
| `ProductSeeder` | Products/properties dengan images | 12 products |
| `ArticleCategorySeeder` | Kategori artikel (Tips, News, Guide) | 3 categories |
| `ArticleSeeder` | Blog articles lengkap dengan content | 15 articles |
| `EventSeeder` | Events & promo | 5 events |
| `FacilitySeeder` | Facilities dengan images | 8 facilities |
| `MediaSeeder` | Media outlets & highlights | 6 media + highlights |
| `ContactSeeder` | Sample contact form submissions | 10 contacts |
| `AboutSeeder` | About Us page content | 1 record |
| `SettingSeeder` | Site settings | 8 settings |
| `PolicySeeder` | Privacy Policy & Terms | 2 policies |

---

## 🎯 Seeding Commands

### Run All Seeders

```bash
# Development (Sail)
./vendor/bin/sail artisan db:seed

# Production (Docker)
docker compose -f docker-compose.prod.yml exec app php artisan db:seed

# Local
php artisan db:seed
```

### Run Specific Seeder

```bash
# Development (Sail)
./vendor/bin/sail artisan db:seed --class=HeroBannerSeeder
./vendor/bin/sail artisan db:seed --class=ProductSeeder
./vendor/bin/sail artisan db:seed --class=ArticleSeeder

# Production (Docker)
docker compose -f docker-compose.prod.yml exec app php artisan db:seed --class=ProductSeeder

# Local
php artisan db:seed --class=ProductSeeder
```

### Fresh Database (Reset Everything)

```bash
# ⚠️ WARNING: This will DELETE all existing data!

# Development (Sail)
./vendor/bin/sail artisan migrate:fresh --seed

# Production (Docker)
docker compose -f docker-compose.prod.yml exec app php artisan migrate:fresh --seed

# Local
php artisan migrate:fresh --seed
```

### Rollback & Re-seed

```bash
# Rollback migrations
php artisan migrate:rollback

# Run migrations
php artisan migrate

# Seed data
php artisan db:seed
```

---

## 📊 Data Yang Di-Generate

### 1. Admin User

**Email**: `admin@skyhouse.com`
**Password**: `password`

```php
// Automatically created by DatabaseSeeder
User::create([
    'name' => 'Admin SkyHouse',
    'email' => 'admin@skyhouse.com',
    'password' => bcrypt('password')
]);
```

### 2. Hero Banners (5 items)

- Luxury Apartment banners
- Modern House banners
- Premium Villa banners
- With images, titles, subtitles, CTAs

### 3. Products (12 items)

**Categories:**
- Apartments (5 units)
- Houses (4 units)
- Villas (3 units)

**Each product includes:**
- Name, location, price
- Description (full content)
- Type, size, bedrooms, bathrooms
- Multiple images (primary + gallery)
- Status (available/sold/reserved)

**Sample Products:**
- Sky Tower Apartment
- Emerald Heights Residence
- Sunset Villa Paradise
- Urban Modern House
- etc.

### 4. Article Categories (3 items)

- **Tips Properti** - Tips & tricks
- **Berita Properti** - News & updates
- **Panduan Pembeli** - Buyer guides

### 5. Articles (15 items)

- 5 articles per category
- Full blog posts dengan content lengkap
- Images, slugs, published dates
- Realistic property-related content

**Sample Articles:**
- "Tips Memilih Lokasi Apartemen yang Strategis"
- "Cara Mendapatkan KPR dengan Bunga Rendah"
- "Investasi Properti untuk Pemula"
- etc.

### 6. Events (5 items)

- Open house events
- Property exhibitions
- Promo events
- With dates, locations, descriptions

### 7. Facilities (8 items)

**Sample Facilities:**
- Swimming Pool
- Fitness Center
- 24/7 Security
- Parking Area
- Children Playground
- BBQ Area
- Rooftop Garden
- Meeting Room

Each with icon, description, and gallery images.

### 8. Media & Media Highlights

**Media Outlets (6 items):**
- Kompas.com
- Detik.com
- CNN Indonesia
- Tempo.co
- Bisnis.com
- Kontan.co.id

Each media outlet has multiple highlights (press coverage articles).

### 9. Contact Submissions (10 items)

- Sample leads/inquiries
- Various statuses (unread/read)
- Different property types interests

### 10. About Us

- Company description
- Vision & mission
- Contact information

### 11. Settings (8 items)

- Site name, tagline
- Contact email, phone
- Social media links
- Business hours

### 12. Policies (2 items)

- Privacy Policy
- Terms of Service

---

## 🛠️ Custom Seeding

### Create New Seeder

```bash
# Development (Sail)
./vendor/bin/sail artisan make:seeder YourModelSeeder

# Local
php artisan make:seeder YourModelSeeder
```

**Example Seeder:**

```php
<?php

namespace Database\Seeders;

use App\Models\YourModel;
use Illuminate\Database\Seeder;

class YourModelSeeder extends Seeder
{
    public function run(): void
    {
        YourModel::create([
            'name' => 'Sample Name',
            'description' => 'Sample description',
            // ... more fields
        ]);
    }
}
```

### Add to DatabaseSeeder

```php
// database/seeders/DatabaseSeeder.php

public function run(): void
{
    // ... existing code

    $this->call([
        HeroBannerSeeder::class,
        ProductSeeder::class,
        YourModelSeeder::class, // ← Add your seeder here
        // ... other seeders
    ]);
}
```

### Using Factories

```php
// Create multiple records with factory
YourModel::factory()->count(10)->create();

// Create with specific data
YourModel::factory()->create([
    'name' => 'Specific Name',
    'status' => 'active'
]);
```

---

## 🔄 Production vs Development

### Development Seeding

**Use case:** Local development, testing, demo

```bash
# Fresh start with dummy data
./vendor/bin/sail artisan migrate:fresh --seed
```

**Characteristics:**
- ✅ Safe to reset anytime
- ✅ Use dummy/sample data
- ✅ Includes test contacts, sample users
- ✅ Can re-seed multiple times

### Production Seeding

**Use case:** Initial production data setup

```bash
# Seed production database (ONCE!)
docker compose -f docker-compose.prod.yml exec app php artisan db:seed
```

**⚠️ Production Warnings:**

1. **NEVER run `migrate:fresh` in production!**
   - It will delete all real data
   - Use only `db:seed` for initial setup

2. **Seed only ONCE during initial setup**
   - Subsequent runs may create duplicates
   - Or modify seeders to check existence first

3. **Customize production seeders:**
   - Remove dummy contacts
   - Update company info in AboutSeeder
   - Set real social media links in SettingSeeder
   - Adjust product data to real properties

### Production-Safe Seeder Pattern

```php
public function run(): void
{
    // Check if data already exists
    if (YourModel::count() > 0) {
        $this->command->warn('YourModel data already exists. Skipping...');
        return;
    }

    // Seed only if empty
    YourModel::create([...]);
}
```

---

## 📝 Seeding Workflow

### Initial Setup (Fresh Install)

```bash
# 1. Run migrations
php artisan migrate

# 2. Seed all data
php artisan db:seed

# 3. Login to admin
# Email: admin@skyhouse.com
# Password: password
```

### Adding New Data Type

```bash
# 1. Create migration
php artisan make:migration create_new_table

# 2. Create model
php artisan make:model NewModel

# 3. Create seeder
php artisan make:seeder NewModelSeeder

# 4. Write seeder logic
# Edit database/seeders/NewModelSeeder.php

# 5. Add to DatabaseSeeder
# Edit database/seeders/DatabaseSeeder.php

# 6. Run seeder
php artisan db:seed --class=NewModelSeeder
```

### Updating Existing Seeders

```bash
# 1. Edit seeder file
# database/seeders/ProductSeeder.php

# 2. Clear existing data (optional)
php artisan db:seed --class=ProductSeeder

# Or fresh start
php artisan migrate:fresh --seed
```

---

## 🆘 Troubleshooting

### Error: "Class does not exist"

**Problem:** Seeder class not found

**Solution:**
```bash
# Regenerate autoload files
composer dump-autoload

# Then try again
php artisan db:seed
```

### Error: "SQLSTATE[23000]: Integrity constraint violation"

**Problem:** Duplicate entries or foreign key constraint

**Solution:**
```bash
# Option 1: Fresh start
php artisan migrate:fresh --seed

# Option 2: Check seeder logic for duplicates
# Edit your seeder to check existence first
```

### Error: "Foreign key constraint fails"

**Problem:** Seeder order is wrong (child before parent)

**Solution:**
```php
// In DatabaseSeeder, ensure correct order:
$this->call([
    ArticleCategorySeeder::class, // Parent first!
    ArticleSeeder::class,          // Child after parent
]);
```

### Images Not Showing After Seeding

**Problem:** Storage symlink not created

**Solution:**
```bash
# Create storage symlink
php artisan storage:link

# Verify
ls -la public/storage  # Should be symlink to storage/app/public
```

### Seeder Taking Too Long

**Problem:** Too much data being created

**Solution:**
```php
// Use chunk() for large datasets
DB::table('products')->chunk(100, function ($products) {
    // Process in batches
});

// Or use DB::insert() for bulk inserts
DB::table('products')->insert([
    ['name' => 'Product 1'],
    ['name' => 'Product 2'],
    // ... more
]);
```

### "Access denied" Error in Production

**Problem:** Database credentials wrong

**Solution:**
```bash
# Check .env.production
cat .env.production | grep DB_

# Test database connection
docker compose -f docker-compose.prod.yml exec app php artisan tinker
# Then: DB::connection()->getPdo();
```

---

## 🎯 Common Seeding Scenarios

### Scenario 1: Fresh Development Environment

```bash
# Clone repository
git clone <repo-url>
cd skyhouse

# Install dependencies
./vendor/bin/sail up -d
./vendor/bin/sail composer install

# Setup database
./vendor/bin/sail artisan migrate:fresh --seed

# Access application
# http://localhost
# Admin: admin@skyhouse.com / password
```

### Scenario 2: Reset Development Data

```bash
# Complete reset
./vendor/bin/sail artisan migrate:fresh --seed

# Or just re-seed (keeps structure)
./vendor/bin/sail artisan db:seed
```

### Scenario 3: Add Products Only

```bash
# Seed only products
php artisan db:seed --class=ProductSeeder
```

### Scenario 4: Production Initial Setup

```bash
# 1. Deploy application
bash scripts/deployment/first-deploy.sh

# 2. Customize seeders for production
# Edit database/seeders/*.php files

# 3. Seed production data
docker compose -f docker-compose.prod.yml exec app php artisan db:seed

# 4. Create real admin user
docker compose -f docker-compose.prod.yml exec app php artisan tinker
# User::create(['name' => 'Admin', 'email' => 'real@email.com', 'password' => Hash::make('secure-password')]);
```

### Scenario 5: Update Single Model Data

```bash
# 1. Clear specific model data
docker compose -f docker-compose.prod.yml exec app php artisan tinker
# YourModel::truncate();

# 2. Re-seed that model
docker compose -f docker-compose.prod.yml exec app php artisan db:seed --class=YourModelSeeder
```

---

## 📚 Additional Resources

### Faker Library (for realistic data)

Seeders use Faker for generating realistic dummy data:

```php
use Faker\Factory as Faker;

$faker = Faker::create('id_ID'); // Indonesian locale

$name = $faker->name;
$email = $faker->unique()->safeEmail;
$address = $faker->address;
$phone = $faker->phoneNumber;
$date = $faker->dateTimeBetween('-1 year', 'now');
```

**Faker Documentation:** https://fakerphp.github.io/

### Model Factories

For more dynamic seeding:

```bash
# Create factory
php artisan make:factory ProductFactory
```

```php
// database/factories/ProductFactory.php
public function definition(): array
{
    return [
        'name' => $this->faker->sentence(3),
        'price' => $this->faker->numberBetween(500000, 5000000),
        // ... more fields
    ];
}

// Usage in seeder
Product::factory()->count(50)->create();
```

### Custom Seeder with Progress

```php
use Illuminate\Support\Facades\DB;

public function run(): void
{
    $this->command->info('Seeding products...');

    $products = [...]; // Your data array

    $bar = $this->command->getOutput()->createProgressBar(count($products));
    $bar->start();

    foreach ($products as $product) {
        Product::create($product);
        $bar->advance();
    }

    $bar->finish();
    $this->command->newLine();
    $this->command->info('Products seeded successfully!');
}
```

---

## ✅ Checklist: After Seeding

- [ ] Admin user can login (`admin@skyhouse.com`)
- [ ] Homepage shows hero banners
- [ ] Products page displays all properties
- [ ] Articles are visible
- [ ] Facilities are listed
- [ ] Admin panel accessible
- [ ] Images are loading (check storage symlink)
- [ ] No console errors

---

## 🎉 Summary

**Quick Commands Reference:**

```bash
# Development
./vendor/bin/sail artisan migrate:fresh --seed

# Production (initial setup)
docker compose -f docker-compose.prod.yml exec app php artisan db:seed

# Specific seeder
php artisan db:seed --class=ProductSeeder

# Create new seeder
php artisan make:seeder YourSeeder
```

**Default Login:**
- Email: `admin@skyhouse.com`
- Password: `password`

**Important:** Change admin credentials di production!

---

**Happy Seeding!** 🌱
