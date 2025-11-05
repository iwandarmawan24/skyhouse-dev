# SkyHouse Property CMS

A comprehensive property management CMS built with Laravel 11, React 19, Inertia.js, PostgreSQL, and Tailwind CSS v4. Features a modern admin panel with shadcn-style reusable UI components.

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9)

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Local Development (Docker Sail)](#local-development-docker-sail)
  - [Local Development (Manual)](#local-development-manual)
  - [Production Server](#production-server)
- [Project Structure](#-project-structure)
- [Development Guide](#-development-guide)
  - [Adding a New Entity](#adding-a-new-entity)
  - [Using Reusable UI Components](#using-reusable-ui-components)
  - [Working with Image Uploads](#working-with-image-uploads)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Database Seeding](#-database-seeding)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Admin Panel Modules
- **Authentication System** - Secure login/logout with Laravel Sanctum
- **Dashboard** - Overview statistics and recent activities
- **Hero Banners Management** - Homepage slideshow banners
- **Products Management** - Property listings with multiple images and gallery
- **Articles Management** - Blog/news with categories and SEO
- **Events Management** - Property events and open houses
- **Facilities Management** - Property amenities with image galleries
- **Contact/Leads Management** - Inquiry form submissions with status tracking
- **About Us Management** - Company information editor
- **Settings Management** - Key-value configuration system
- **Policy Management** - Legal policies (Privacy, Terms, Refund, Shipping)

### Technical Features
- 🎨 **Shadcn-style UI Components** - Reusable, accessible components
- 🖼️ **Image Upload & Management** - Multiple image support with ordering
- 🔍 **Search & Filters** - Powerful search across all modules
- 📄 **Pagination** - Efficient data loading
- 🎯 **Form Validation** - Client and server-side validation
- 📱 **Responsive Design** - Mobile-friendly admin panel
- ⚡ **Fast Navigation** - SPA experience with Inertia.js
- 🔐 **Secure** - CSRF protection, XSS prevention, SQL injection safe

## 🛠️ Tech Stack

### Backend
- **Laravel 11** - PHP framework
- **PostgreSQL 16** - Relational database
- **Laravel Sanctum** - API authentication
- **Inertia.js v2** - Server-side routing with SPA experience

### Frontend
- **React 19** - UI library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Frontend build tool
- **Headless UI** - Unstyled accessible components
- **Framer Motion** - Animation library

### Development Tools
- **Docker Sail** - Local development environment
- **Class Variance Authority** - Component variant management
- **Clsx + Tailwind Merge** - Conditional className utilities

## 📋 Prerequisites

### For Local Development (Docker Sail)
- **Docker Desktop** (20.10+)
- **Git**
- **Composer** (2.7+) - for initial setup only
- At least 4GB RAM available for Docker

### For Local Development (Manual)
- **PHP** (8.2+) with extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- **Composer** (2.7+)
- **Node.js** (20+) and npm (10+)
- **PostgreSQL** (16+)
- **Git**

### For Production Server
- **Ubuntu** (20.04+ or 22.04+) or similar Linux distribution
- **Nginx** or **Apache**
- **PHP-FPM** (8.2+)
- **PostgreSQL** (16+)
- **Supervisor** (for queue workers, optional)
- **SSL Certificate** (recommended)

## 🚀 Installation

### Local Development (Docker Sail)

This is the **recommended** method for local development.

#### 1. Clone the Repository

```bash
git clone git@github.com:iwandarmawan24/skyhouse-dev.git
cd skyhouse-dev
```

#### 2. Install PHP Dependencies

```bash
# If you have Composer installed locally
composer install

# OR use Docker to install
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

#### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
./vendor/bin/sail artisan key:generate
```

#### 4. Configure Environment Variables

Edit `.env` file:

```env
APP_NAME="SkyHouse Property CMS"
APP_ENV=local
APP_KEY=base64:... # Already generated
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=pgsql
DB_PORT=5432
DB_DATABASE=skyhouse
DB_USERNAME=sail
DB_PASSWORD=password
```

#### 5. Start Docker Containers

```bash
# Start all services (PostgreSQL, Redis, etc.)
./vendor/bin/sail up -d

# Check if containers are running
./vendor/bin/sail ps
```

#### 6. Database Setup

```bash
# Run migrations
./vendor/bin/sail artisan migrate

# Seed database with sample data
./vendor/bin/sail artisan db:seed
```

#### 7. Install Node Dependencies and Build Assets

```bash
# Install npm packages
./vendor/bin/sail npm install

# Build assets for development (with hot reload)
./vendor/bin/sail npm run dev

# OR build for production
./vendor/bin/sail npm run build
```

#### 8. Create Storage Link

```bash
./vendor/bin/sail artisan storage:link
```

#### 9. Access the Application

- **Admin Panel**: http://localhost/admin/dashboard
- **Login Credentials**:
  - Email: `admin@skyhouse.com`
  - Password: `password`

#### 10. Stopping the Environment

```bash
# Stop containers
./vendor/bin/sail down

# Stop and remove volumes (deletes database)
./vendor/bin/sail down -v
```

---

### Local Development (Manual)

If you prefer not to use Docker:

#### 1. Clone and Install Dependencies

```bash
git clone git@github.com:iwandarmawan24/skyhouse-dev.git
cd skyhouse-dev
composer install
npm install
```

#### 2. Setup Environment

```bash
cp .env.example .env
php artisan key:generate
```

#### 3. Configure Database

Edit `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=skyhouse
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Create PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE skyhouse;

# Create user (optional)
CREATE USER skyhouse_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE skyhouse TO skyhouse_user;
```

#### 4. Migrate and Seed

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

#### 5. Build Assets

```bash
# Development with hot reload
npm run dev

# Production build
npm run build
```

#### 6. Start Server

```bash
php artisan serve
```

Access at: http://localhost:8000

---

### Production Server

#### 1. Server Setup (Ubuntu 22.04)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.2 and extensions
sudo apt install -y php8.2-fpm php8.2-cli php8.2-common php8.2-pgsql \
    php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-bcmath \
    php8.2-gd php8.2-intl php8.2-redis

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

#### 2. Clone and Configure

```bash
# Create web directory
sudo mkdir -p /var/www/skyhouse
cd /var/www/skyhouse

# Clone repository
sudo git clone git@github.com:iwandarmawan24/skyhouse-dev.git .

# Set permissions
sudo chown -R www-data:www-data /var/www/skyhouse
sudo chmod -R 755 /var/www/skyhouse
sudo chmod -R 775 /var/www/skyhouse/storage /var/www/skyhouse/bootstrap/cache
```

#### 3. Install Dependencies

```bash
# Install PHP dependencies (production)
composer install --no-dev --optimize-autoloader

# Install Node dependencies and build
npm ci
npm run build
```

#### 4. Environment Configuration

```bash
# Copy and configure environment
cp .env.example .env
php artisan key:generate

# Edit .env for production
nano .env
```

Production `.env`:

```env
APP_NAME="SkyHouse Property CMS"
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=skyhouse_prod
DB_USERNAME=skyhouse_user
DB_PASSWORD=strong_password_here

SESSION_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

#### 5. Database Setup

```bash
# Create production database
sudo -u postgres psql
CREATE DATABASE skyhouse_prod;
CREATE USER skyhouse_user WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE skyhouse_prod TO skyhouse_user;
\q

# Run migrations
php artisan migrate --force

# Seed initial data (optional)
php artisan db:seed --force

# Create storage link
php artisan storage:link
```

#### 6. Configure Nginx

Create `/etc/nginx/sites-available/skyhouse`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/skyhouse/public;

    # SSL Configuration (use Certbot to generate)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

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
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Static file caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Limit upload size
    client_max_body_size 10M;
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/skyhouse /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Install SSL Certificate (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

#### 8. Optimize Application

```bash
# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize autoloader
composer dump-autoload --optimize
```

#### 9. Setup Queue Workers (Optional)

Create `/etc/supervisor/conf.d/skyhouse-worker.conf`:

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

Start supervisor:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start skyhouse-worker:*
```

#### 10. Setup Cron Jobs

```bash
sudo crontab -e
```

Add:

```cron
* * * * * cd /var/www/skyhouse && php artisan schedule:run >> /dev/null 2>&1
```

#### 11. Verify Installation

```bash
# Check PHP version
php -v

# Check permissions
ls -la /var/www/skyhouse/storage

# Test configuration
php artisan about
```

Visit: https://yourdomain.com/admin/dashboard

---

## 📁 Project Structure

```
skyhouse-dev/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Admin/
│   │   │       ├── AboutController.php
│   │   │       ├── ArticleController.php
│   │   │       ├── AuthController.php
│   │   │       ├── ContactController.php
│   │   │       ├── DashboardController.php
│   │   │       ├── EventController.php
│   │   │       ├── FacilityController.php
│   │   │       ├── HeroBannerController.php
│   │   │       ├── PolicyController.php
│   │   │       ├── ProductController.php
│   │   │       └── SettingController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   ├── Models/
│   │   ├── About.php
│   │   ├── Article.php
│   │   ├── ArticleCategory.php
│   │   ├── Contact.php
│   │   ├── Event.php
│   │   ├── Facility.php
│   │   ├── FacilityImage.php
│   │   ├── HeroBanner.php
│   │   ├── Policy.php
│   │   ├── Product.php
│   │   ├── ProductImage.php
│   │   ├── Setting.php
│   │   └── User.php
│   └── Providers/
│       └── AppServiceProvider.php
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2025_11_05_031610_create_hero_banners_table.php
│   │   ├── 2025_11_05_031611_create_products_table.php
│   │   ├── 2025_11_05_031612_create_product_images_table.php
│   │   ├── 2025_11_05_031613_create_article_categories_table.php
│   │   ├── 2025_11_05_031614_create_articles_table.php
│   │   ├── 2025_11_05_031615_create_events_table.php
│   │   ├── 2025_11_05_031616_create_facilities_table.php
│   │   ├── 2025_11_05_031617_create_facility_images_table.php
│   │   ├── 2025_11_05_031618_create_contacts_table.php
│   │   ├── 2025_11_05_031619_create_about_table.php
│   │   ├── 2025_11_05_031620_create_settings_table.php
│   │   └── 2025_11_05_031621_create_policies_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── AboutSeeder.php
│       ├── ArticleCategorySeeder.php
│       ├── ArticleSeeder.php
│       ├── ContactSeeder.php
│       ├── EventSeeder.php
│       ├── FacilitySeeder.php
│       ├── HeroBannerSeeder.php
│       ├── PolicySeeder.php
│       ├── ProductSeeder.php
│       └── SettingSeeder.php
├── public/
│   ├── build/           # Compiled assets (generated)
│   └── storage/         # Symlink to storage/app/public
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── Components/
│   │   │   └── ui/
│   │   │       ├── Alert.jsx
│   │   │       ├── Badge.jsx
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── FormField.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Label.jsx
│   │   │       ├── Select.jsx
│   │   │       ├── Textarea.jsx
│   │   │       └── index.js
│   │   ├── Layouts/
│   │   │   └── AdminLayout.jsx
│   │   ├── Pages/
│   │   │   └── Admin/
│   │   │       ├── About/
│   │   │       │   └── Edit.jsx
│   │   │       ├── Articles/
│   │   │       │   ├── Form.jsx
│   │   │       │   └── Index.jsx
│   │   │       ├── Auth/
│   │   │       │   └── Login.jsx
│   │   │       ├── Contacts/
│   │   │       │   ├── Index.jsx
│   │   │       │   └── Show.jsx
│   │   │       ├── Events/
│   │   │       │   ├── Form.jsx
│   │   │       │   └── Index.jsx
│   │   │       ├── Facilities/
│   │   │       │   ├── Form.jsx
│   │   │       │   └── Index.jsx
│   │   │       ├── HeroBanners/
│   │   │       │   ├── Form.jsx
│   │   │       │   └── Index.jsx
│   │   │       ├── Policies/
│   │   │       │   ├── Form.jsx
│   │   │       │   └── Index.jsx
│   │   │       ├── Products/
│   │   │       │   ├── Form.jsx
│   │   │       │   └── Index.jsx
│   │   │       ├── Settings/
│   │   │       │   └── Index.jsx
│   │   │       └── Dashboard.jsx
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── app.jsx
│   │   └── bootstrap.js
│   └── views/
│       └── app.blade.php
├── routes/
│   └── web.php
├── storage/
│   ├── app/
│   │   └── public/      # Public uploads (symlinked)
│   ├── framework/
│   └── logs/
├── .env.example
├── composer.json
├── jsconfig.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Development Guide

### Adding a New Entity

Follow this comprehensive guide to add a new entity (e.g., "Testimonials").

#### Step 1: Create Migration

```bash
# Using Sail
./vendor/bin/sail artisan make:migration create_testimonials_table

# Manual
php artisan make:migration create_testimonials_table
```

Edit `database/migrations/YYYY_MM_DD_HHMMSS_create_testimonials_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position')->nullable();
            $table->string('company')->nullable();
            $table->text('content');
            $table->string('avatar')->nullable();
            $table->integer('rating')->default(5);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
```

Run migration:

```bash
./vendor/bin/sail artisan migrate
```

#### Step 2: Create Model

```bash
./vendor/bin/sail artisan make:model Testimonial
```

Edit `app/Models/Testimonial.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'company',
        'content',
        'avatar',
        'rating',
        'is_featured',
        'is_published',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    // Scope for published testimonials
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    // Scope for featured testimonials
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
```

#### Step 3: Create Controller

```bash
./vendor/bin/sail artisan make:controller Admin/TestimonialController
```

Edit `app/Http/Controllers/Admin/TestimonialController.php`:

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query()->latest();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                    ->orWhere('company', 'ilike', "%{$search}%")
                    ->orWhere('content', 'ilike', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'published') {
                $query->published();
            } elseif ($request->status === 'draft') {
                $query->where('is_published', false);
            }
        }

        $testimonials = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Testimonials/Form', [
            'testimonial' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'rating' => 'required|integer|min:1|max:5',
            'is_featured' => 'required|boolean',
            'is_published' => 'required|boolean',
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('testimonials', 'public');
        }

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Form', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'rating' => 'required|integer|min:1|max:5',
            'is_featured' => 'required|boolean',
            'is_published' => 'required|boolean',
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($testimonial->avatar) {
                Storage::disk('public')->delete($testimonial->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('testimonials', 'public');
        }

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        // Delete avatar
        if ($testimonial->avatar) {
            Storage::disk('public')->delete($testimonial->avatar);
        }

        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }
}
```

#### Step 4: Add Routes

Edit `routes/web.php`:

```php
// Inside Route::middleware('auth')->group(function () {
    Route::resource('testimonials', TestimonialController::class)->except(['show']);
// });
```

Add import at top:

```php
use App\Http\Controllers\Admin\TestimonialController;
```

#### Step 5: Create Frontend - Index Page

Create `resources/js/Pages/Admin/Testimonials/Index.jsx`:

```jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, Star, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import { Alert } from '@/Components/ui/Alert';
import { Input } from '@/Components/ui/Input';
import { Select } from '@/Components/ui/Select';

export default function Index({ testimonials, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/testimonials', { search, status }, { preserveState: true });
    };

    const handleDelete = (id) => {
        router.delete(`/admin/testimonials/${id}`, {
            onSuccess: () => setShowDeleteConfirm(null),
        });
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
                    <p className="text-gray-600 mt-1">Manage customer testimonials and reviews</p>
                </div>
                <Link href="/admin/testimonials/create">
                    <Button>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Testimonial
                    </Button>
                </Link>
            </div>

            {/* Success Message */}
            {flash.success && (
                <Alert variant="success" className="mb-6">
                    {flash.success}
                </Alert>
            )}

            {/* Filters */}
            <Card className="mb-6 p-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Search testimonials..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </Select>
                    <Button type="submit">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </form>
            </Card>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.data.length > 0 ? (
                    testimonials.data.map((testimonial) => (
                        <Card key={testimonial.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {testimonial.avatar ? (
                                        <img
                                            src={`/storage/${testimonial.avatar}`}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold text-lg">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                        {testimonial.position && (
                                            <p className="text-sm text-gray-600">{testimonial.position}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {testimonial.is_featured && <Badge variant="warning">Featured</Badge>}
                                    {testimonial.is_published ? (
                                        <Badge variant="success">Published</Badge>
                                    ) : (
                                        <Badge variant="secondary">Draft</Badge>
                                    )}
                                </div>
                            </div>

                            <div className="flex mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < testimonial.rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{testimonial.content}</p>

                            {testimonial.company && (
                                <p className="text-sm text-gray-500 mb-4">{testimonial.company}</p>
                            )}

                            <div className="flex gap-2">
                                <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowDeleteConfirm(testimonial.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full">
                        <Card className="p-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
                            <p className="text-gray-600 mb-6">Get started by adding your first testimonial.</p>
                            <Link href="/admin/testimonials/create">
                                <Button>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Testimonial
                                </Button>
                            </Link>
                        </Card>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {testimonials.data.length > 0 && (
                <div className="mt-6 flex justify-center">
                    {/* Add pagination component here */}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-sm w-full mx-4 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Testimonial</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this testimonial? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>
                                Delete
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
}
```

#### Step 6: Create Frontend - Form Page

Create `resources/js/Pages/Admin/Testimonials/Form.jsx`:

```jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Upload, Star } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';
import { FormInput, FormTextarea } from '@/Components/ui/FormField';
import { Label } from '@/Components/ui/Label';

export default function Form({ testimonial }) {
    const isEdit = testimonial !== null;
    const { data, setData, post, processing, errors } = useForm({
        name: testimonial?.name || '',
        position: testimonial?.position || '',
        company: testimonial?.company || '',
        content: testimonial?.content || '',
        avatar: null,
        rating: testimonial?.rating || 5,
        is_featured: testimonial?.is_featured ?? false,
        is_published: testimonial?.is_published ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [avatarPreview, setAvatarPreview] = useState(
        testimonial?.avatar ? `/storage/${testimonial.avatar}` : null
    );

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/testimonials/${testimonial.id}` : '/admin/testimonials';
        post(url);
    };

    return (
        <AdminLayout>
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/admin/testimonials" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Testimonial' : 'Create Testimonial'}
                    </h1>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormInput
                            label="Name"
                            name="name"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="Customer name"
                        />

                        <FormInput
                            label="Position"
                            name="position"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            error={errors.position}
                            placeholder="Job title"
                        />

                        <FormInput
                            label="Company"
                            name="company"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            error={errors.company}
                            placeholder="Company name"
                        />

                        <FormTextarea
                            label="Testimonial Content"
                            name="content"
                            required
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            error={errors.content}
                            rows={5}
                            placeholder="Write the testimonial..."
                        />

                        <div>
                            <Label required>Rating</Label>
                            <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => setData('rating', rating)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${
                                                rating <= data.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && <p className="text-sm text-red-600 mt-1">{errors.rating}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {avatarPreview && (
                            <div className="flex justify-center">
                                <img
                                    src={avatarPreview}
                                    alt="Avatar preview"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="avatar"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> avatar
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 2MB)</p>
                                </div>
                                <input
                                    id="avatar"
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                        {errors.avatar && <p className="text-sm text-red-600">{errors.avatar}</p>}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="is_featured" className="ml-3 text-sm font-medium text-gray-700">
                                Feature this testimonial
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_published"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-700">
                                Publish testimonial
                            </label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-end gap-4 pt-6">
                        <Link href="/admin/testimonials">
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : isEdit ? 'Update Testimonial' : 'Create Testimonial'}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
```

#### Step 7: Create Seeder (Optional)

```bash
./vendor/bin/sail artisan make:seeder TestimonialSeeder
```

Edit `database/seeders/TestimonialSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'John Anderson',
                'position' => 'CEO',
                'company' => 'Tech Innovations Ltd',
                'content' => 'SkyHouse helped us find the perfect office space for our growing team. Their professionalism and attention to detail made the entire process seamless.',
                'rating' => 5,
                'is_featured' => true,
                'is_published' => true,
            ],
            [
                'name' => 'Sarah Williams',
                'position' => 'Real Estate Investor',
                'company' => 'Williams Properties',
                'content' => 'Excellent service and great property options. The team at SkyHouse went above and beyond to meet our requirements.',
                'rating' => 5,
                'is_featured' => true,
                'is_published' => true,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Business Owner',
                'company' => null,
                'content' => 'Professional, reliable, and trustworthy. I highly recommend SkyHouse for anyone looking for property solutions.',
                'rating' => 4,
                'is_featured' => false,
                'is_published' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
```

Add to `DatabaseSeeder.php`:

```php
public function run(): void
{
    // ... existing seeders
    $this->call(TestimonialSeeder::class);
}
```

#### Step 8: Update Navigation (Optional)

Edit `resources/js/Layouts/AdminLayout.jsx` to add the menu item:

```jsx
// Find the navigation section and add:
<Link
    href="/admin/testimonials"
    className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition ${
        url.startsWith('/admin/testimonials') ? 'bg-blue-50 text-blue-600' : ''
    }`}
>
    <Star className="w-5 h-5" />
    <span>Testimonials</span>
</Link>
```

#### Step 9: Build Assets

```bash
./vendor/bin/sail npm run build
```

#### Step 10: Test Your New Entity

1. Visit: http://localhost/admin/testimonials
2. Create a new testimonial
3. Edit and delete testimonials
4. Test search and filters

---

### Using Reusable UI Components

All UI components are available in `resources/js/Components/ui/`. Here's how to use them:

#### Import Components

```jsx
import { Button, Card, Input, Badge, Alert } from '@/Components/ui';
// OR import individually
import { Button } from '@/Components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/Card';
```

#### Button Component

```jsx
// Default button
<Button>Click me</Button>

// Variants
<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// Disabled state
<Button disabled>Disabled</Button>

// With icon
<Button>
    <Plus className="w-4 h-4 mr-2" />
    Add Item
</Button>
```

#### Input Component

```jsx
<Input
    type="text"
    placeholder="Enter text..."
    value={value}
    onChange={(e) => setValue(e.target.value)}
    error={errors.fieldName}
/>
```

#### Card Component

```jsx
<Card>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
    </CardHeader>
    <CardContent>
        Card content goes here
    </CardContent>
    <CardFooter>
        <Button>Action</Button>
    </CardFooter>
</Card>
```

#### FormField Components

```jsx
// FormInput - Input with label and error
<FormInput
    label="Title"
    name="title"
    required
    value={data.title}
    onChange={(e) => setData('title', e.target.value)}
    error={errors.title}
    placeholder="Enter title"
/>

// FormTextarea
<FormTextarea
    label="Description"
    name="description"
    value={data.description}
    onChange={(e) => setData('description', e.target.value)}
    error={errors.description}
    rows={5}
/>

// FormSelect
<FormSelect
    label="Category"
    name="category"
    required
    value={data.category}
    onChange={(e) => setData('category', e.target.value)}
    error={errors.category}
>
    <option value="">Select category</option>
    <option value="1">Category 1</option>
    <option value="2">Category 2</option>
</FormSelect>
```

#### Badge Component

```jsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="purple">Purple</Badge>
<Badge variant="outline">Outline</Badge>
```

#### Alert Component

```jsx
<Alert variant="success">
    Operation completed successfully!
</Alert>

<Alert variant="error">
    An error occurred. Please try again.
</Alert>

<Alert variant="warning">
    Please review before continuing.
</Alert>

<Alert variant="info">
    Here's some helpful information.
</Alert>
```

---

### Working with Image Uploads

#### Single Image Upload

```jsx
const [imagePreview, setImagePreview] = useState(
    existingImage ? `/storage/${existingImage}` : null
);

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setData('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

// In JSX
{imagePreview && (
    <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
)}

<input
    type="file"
    accept="image/jpeg,image/png,image/jpg,image/webp"
    onChange={handleImageChange}
/>
```

#### Multiple Image Upload

```jsx
const [images, setImages] = useState([]);

const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setData('images', files);

    const previews = files.map((file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    });

    Promise.all(previews).then(setImages);
};

// In JSX
<div className="grid grid-cols-3 gap-4">
    {images.map((preview, index) => (
        <img key={index} src={preview} alt={`Preview ${index}`} />
    ))}
</div>

<input
    type="file"
    multiple
    accept="image/jpeg,image/png,image/jpg,image/webp"
    onChange={handleImagesChange}
/>
```

#### Controller - Handle Upload

```php
// Single image
if ($request->hasFile('image')) {
    $path = $request->file('image')->store('folder-name', 'public');
    $validated['image'] = $path;
}

// Multiple images
if ($request->hasFile('images')) {
    foreach ($request->file('images') as $index => $image) {
        $path = $image->store('folder-name', 'public');
        ModelImage::create([
            'model_id' => $model->id,
            'image_path' => $path,
            'order' => $index + 1,
        ]);
    }
}
```

#### Controller - Delete Image

```php
use Illuminate\Support\Facades\Storage;

// Delete single image
if ($model->image) {
    Storage::disk('public')->delete($model->image);
}

// Delete multiple images
foreach ($model->images as $image) {
    Storage::disk('public')->delete($image->image_path);
    $image->delete();
}
```

---

## 📜 Available Scripts

### Using Docker Sail

```bash
# Start services
./vendor/bin/sail up -d

# Stop services
./vendor/bin/sail down

# Run artisan commands
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan db:seed
./vendor/bin/sail artisan cache:clear

# Install dependencies
./vendor/bin/sail composer install
./vendor/bin/sail npm install

# Build assets
./vendor/bin/sail npm run dev    # Development with hot reload
./vendor/bin/sail npm run build  # Production build

# Run tests
./vendor/bin/sail test
./vendor/bin/sail artisan test

# Access shell
./vendor/bin/sail shell
./vendor/bin/sail root-shell

# View logs
./vendor/bin/sail logs
./vendor/bin/sail logs -f  # Follow logs

# Database
./vendor/bin/sail mysql     # Access MySQL (if using)
./vendor/bin/sail psql      # Access PostgreSQL

# Create bash alias (optional)
alias sail='./vendor/bin/sail'
# Then use: sail up, sail artisan migrate, etc.
```

### Manual (Without Docker)

```bash
# Artisan commands
php artisan migrate
php artisan db:seed
php artisan serve

# Composer
composer install
composer update
composer dump-autoload

# NPM
npm install
npm run dev
npm run build

# Tests
php artisan test
./vendor/bin/phpunit
```

---

## 🔐 Environment Variables

Key environment variables to configure:

```env
# Application
APP_NAME="SkyHouse Property CMS"
APP_ENV=local  # local, staging, production
APP_KEY=       # Auto-generated
APP_DEBUG=true # false in production
APP_URL=http://localhost

# Database
DB_CONNECTION=pgsql
DB_HOST=pgsql  # or 127.0.0.1
DB_PORT=5432
DB_DATABASE=skyhouse
DB_USERNAME=sail
DB_PASSWORD=password

# Mail (for contact forms)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@skyhouse.com"
MAIL_FROM_NAME="${APP_NAME}"

# Cache/Session
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Redis
REDIS_HOST=redis  # or 127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# File Storage
FILESYSTEM_DISK=public
```

---

## 🌱 Database Seeding

### Seed All Data

```bash
./vendor/bin/sail artisan db:seed
```

### Seed Specific Seeder

```bash
./vendor/bin/sail artisan db:seed --class=ArticleSeeder
```

### Available Seeders

- `DatabaseSeeder` - Runs all seeders
- `AboutSeeder` - About page content
- `ArticleCategorySeeder` - Article categories
- `ArticleSeeder` - Sample articles
- `ContactSeeder` - Sample contact inquiries
- `EventSeeder` - Sample events
- `FacilitySeeder` - Sample facilities
- `HeroBannerSeeder` - Homepage banners
- `PolicySeeder` - Legal policies
- `ProductSeeder` - Sample properties
- `SettingSeeder` - System settings

### Fresh Migration with Seed

```bash
# WARNING: This will delete all data
./vendor/bin/sail artisan migrate:fresh --seed
```

---

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Configure production database credentials
- [ ] Set up proper `APP_URL` with HTTPS
- [ ] Configure mail settings
- [ ] Set strong `DB_PASSWORD`
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Run `php artisan view:cache`
- [ ] Run `npm run build`
- [ ] Set proper file permissions
- [ ] Configure SSL certificate
- [ ] Set up queue workers (if using queues)
- [ ] Set up cron jobs for scheduler
- [ ] Configure backup solution
- [ ] Set up monitoring and logging

### Quick Deployment Commands

```bash
# On server, in application directory
git pull origin master
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
sudo chown -R www-data:www-data storage bootstrap/cache
sudo systemctl restart nginx
sudo supervisorctl restart all  # if using queue workers
```

### Zero-Downtime Deployment

For production environments, consider using:
- **Laravel Envoyer** - Automated deployment service
- **Laravel Forge** - Server management and deployment
- **GitHub Actions** - CI/CD pipeline
- **GitLab CI/CD** - Continuous deployment

---

## ❗ Troubleshooting

### Issue: Permission Denied Errors

```bash
# Fix storage permissions
./vendor/bin/sail shell
chmod -R 775 storage bootstrap/cache
chown -R sail:sail storage bootstrap/cache

# On production
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Issue: npm run dev/build fails

```bash
# Clear npm cache
./vendor/bin/sail npm cache clean --force
rm -rf node_modules package-lock.json
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
```

### Issue: Images not showing

```bash
# Recreate storage link
./vendor/bin/sail artisan storage:link

# Check storage permissions
ls -la storage/app/public
ls -la public/storage
```

### Issue: Database connection failed

```bash
# Check if PostgreSQL is running
./vendor/bin/sail ps

# Restart database
./vendor/bin/sail down
./vendor/bin/sail up -d

# Check database credentials in .env
DB_HOST=pgsql  # for Docker Sail
DB_HOST=127.0.0.1  # for manual installation
```

### Issue: Class not found errors

```bash
# Clear and rebuild autoload
./vendor/bin/sail composer dump-autoload

# Clear all caches
./vendor/bin/sail artisan cache:clear
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan route:clear
./vendor/bin/sail artisan view:clear
```

### Issue: Inertia.js page not loading

```bash
# Clear browser cache
# Rebuild assets
./vendor/bin/sail npm run build

# Check Vite manifest
ls -la public/build/manifest.json

# Check app.blade.php has @vite directive
```

### Issue: Session/Authentication issues

```bash
# Clear session cache
./vendor/bin/sail artisan session:flush

# Check session driver in .env
SESSION_DRIVER=file  # or redis

# Clear all application cache
./vendor/bin/sail artisan optimize:clear
```

### Getting Help

- **Laravel Documentation**: https://laravel.com/docs
- **React Documentation**: https://react.dev
- **Inertia.js Documentation**: https://inertiajs.com
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   ./vendor/bin/sail test
   ```
5. **Build assets**
   ```bash
   ./vendor/bin/sail npm run build
   ```
6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Coding Standards

- Follow PSR-12 coding standards for PHP
- Use ESLint/Prettier for JavaScript/React
- Write meaningful commit messages
- Add comments for complex logic
- Create/update tests for new features
- Update documentation when needed

### Commit Message Format

```
Type: Brief description

Detailed explanation of the changes (optional)

Type can be:
- Add: New feature
- Update: Modify existing feature
- Fix: Bug fix
- Refactor: Code refactoring
- Docs: Documentation changes
- Test: Add or update tests
- Style: Code style changes
```

---

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

## 👨‍💻 Credits

Built with ❤️ using:
- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [PostgreSQL](https://www.postgresql.org)
- [Lucide Icons](https://lucide.dev)

---

## 📞 Support

For issues, questions, or contributions, please:
- Open an issue on GitHub
- Submit a pull request
- Contact the maintainers

---

**Happy Coding! 🚀**
