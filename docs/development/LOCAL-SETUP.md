# Local Development Setup

Panduan lengkap untuk setup local development environment SkyHouse CMS.

## 🎯 Pilihan Setup

Ada 2 cara untuk development lokal:

1. **Docker Sail (Recommended)** - All-in-one, isolated environment
2. **Manual Setup** - Direct installation di mesin lokal

---

## 🐳 Option 1: Docker Sail (Recommended)

Laravel Sail adalah Docker environment yang sudah dikonfigurasi untuk Laravel.

### Keuntungan
- ✅ Isolated environment (tidak bentrok dengan project lain)
- ✅ Consistent dengan production Docker setup
- ✅ Semua services included (PostgreSQL, Redis)
- ✅ No need install PHP/PostgreSQL/Redis di mesin lokal
- ✅ Easy switching PHP versions

### Prerequisites

- **Docker Desktop** (Windows/Mac) atau **Docker Engine** (Linux)
- **Git**
- **Composer** (untuk initial install, atau bisa pakai Docker)
- Minimal 4GB RAM untuk Docker

### Step-by-Step Setup

#### 1. Clone Repository

```bash
git clone <repository-url>
cd skyhouse
```

#### 2. Install PHP Dependencies

**Jika punya Composer lokal:**
```bash
composer install
```

**Jika tidak punya Composer:**
```bash
# Mac/Linux
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs

# Windows (PowerShell)
docker run --rm `
    -v ${PWD}:/var/www/html `
    -w /var/www/html `
    laravelsail/php83-composer:latest `
    composer install --ignore-platform-reqs
```

#### 3. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
./vendor/bin/sail artisan key:generate
```

#### 4. Configure .env for Sail

File `.env` sudah dikonfigurasi untuk Sail by default:

```env
APP_NAME="SkyHouse CMS"
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=pgsql          # ← Pakai 'pgsql' untuk Sail (bukan 127.0.0.1)
DB_PORT=5432
DB_DATABASE=skyhouse
DB_USERNAME=sail
DB_PASSWORD=password

REDIS_HOST=redis       # ← Pakai 'redis' untuk Sail
REDIS_PORT=6379

# Vite config
VITE_APP_URL=http://localhost
```

#### 5. Start Docker Services

```bash
# Start all containers in background
./vendor/bin/sail up -d

# Check if all containers running
./vendor/bin/sail ps
```

Services yang akan running:
- **laravel.test** (port 80) - Application
- **pgsql** (port 5432) - PostgreSQL database
- **redis** (port 6379) - Redis cache
- **mailpit** (port 8025) - Email testing

#### 6. Database Setup

```bash
# Run migrations
./vendor/bin/sail artisan migrate

# Seed sample data
./vendor/bin/sail artisan db:seed
```

#### 7. Install Frontend Dependencies

```bash
# Install npm packages
./vendor/bin/sail npm install

# Build assets with hot reload
./vendor/bin/sail npm run dev
```

#### 8. Access Application

- **Frontend**: http://localhost
- **Admin Panel**: http://localhost/admin/dashboard
- **Mailpit (Email testing)**: http://localhost:8025

**Default Login:**
- Email: `admin@skyhouse.com`
- Password: `password`

### Common Sail Commands

```bash
# Start services
./vendor/bin/sail up -d

# Stop services
./vendor/bin/sail down

# View logs
./vendor/bin/sail logs
./vendor/bin/sail logs -f  # Follow logs

# Artisan commands
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan tinker

# Run tests
./vendor/bin/sail test

# Access shell
./vendor/bin/sail shell
./vendor/bin/sail root-shell

# Database access
./vendor/bin/sail psql

# Composer commands
./vendor/bin/sail composer require package/name

# NPM commands
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
```

### Create Bash Alias (Optional but Recommended)

Tambahkan ke `~/.bashrc` atau `~/.zshrc`:

```bash
alias sail='./vendor/bin/sail'
```

Reload shell:
```bash
source ~/.bashrc  # or ~/.zshrc
```

Sekarang bisa pakai command lebih singkat:
```bash
sail up -d
sail artisan migrate
sail npm run dev
```

### Troubleshooting Sail

**Port already in use:**
```bash
# Check what's using port 80
lsof -i :80  # Mac/Linux
netstat -ano | findstr :80  # Windows

# Change Sail port in docker-compose.yml
# Or stop conflicting service
```

**Slow performance on Mac/Windows:**
```bash
# Add to .env
SAIL_SKIP_CHECKS=true

# Use native filesystem in docker-compose.yml
# Remove :delegated from volumes
```

**Database connection failed:**
```bash
# Ensure using correct host in .env
DB_HOST=pgsql  # NOT 127.0.0.1 or localhost

# Restart containers
sail down && sail up -d
```

---

## 💻 Option 2: Manual Setup

Setup tanpa Docker, install semua service langsung di mesin lokal.

### Keuntungan
- ✅ Potentially faster (no Docker overhead)
- ✅ Direct access to files
- ✅ Less RAM usage

### Kekurangan
- ❌ Need to install PHP, PostgreSQL, Redis locally
- ❌ Potential conflicts with other projects
- ❌ Different environment dari production

### Prerequisites

**Mac (menggunakan Homebrew):**
```bash
brew install php@8.2
brew install postgresql@16
brew install redis
brew install composer
brew install node
```

**Ubuntu/Debian:**
```bash
# PHP 8.2
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.2 php8.2-{cli,fpm,pgsql,mbstring,xml,curl,zip,bcmath,gd,intl}

# PostgreSQL
sudo apt install postgresql postgresql-contrib

# Redis
sudo apt install redis-server

# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs

# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

**Windows:**
- Download PHP 8.2 dari https://windows.php.net/download
- Download PostgreSQL dari https://www.postgresql.org/download/windows/
- Download Redis dari https://github.com/microsoftarchive/redis/releases
- Download Node.js dari https://nodejs.org
- Download Composer dari https://getcomposer.org/download/

### Step-by-Step Setup

#### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd skyhouse

composer install
npm install
```

#### 2. Setup Environment

```bash
cp .env.example .env
php artisan key:generate
```

#### 3. Configure .env for Local Setup

```env
APP_NAME="SkyHouse CMS"
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1      # ← Pakai 127.0.0.1 atau localhost
DB_PORT=5432
DB_DATABASE=skyhouse
DB_USERNAME=your_pg_user
DB_PASSWORD=your_pg_password

REDIS_HOST=127.0.0.1   # ← Pakai 127.0.0.1
REDIS_PORT=6379
```

#### 4. Create Database

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE skyhouse;

# Create user (optional)
CREATE USER skyhouse WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE skyhouse TO skyhouse;
\q
```

#### 5. Run Migrations & Seed

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

#### 6. Build Frontend Assets

```bash
npm run dev  # Development with hot reload
# OR
npm run build  # Production build
```

#### 7. Start Development Server

**Terminal 1 - Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite (hot reload):**
```bash
npm run dev
```

#### 8. Access Application

- **Application**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin/dashboard

**Default Login:**
- Email: `admin@skyhouse.com`
- Password: `password`

### Start Services (Manual Setup)

**Mac (Homebrew services):**
```bash
brew services start postgresql@16
brew services start redis
```

**Linux (systemd):**
```bash
sudo systemctl start postgresql
sudo systemctl start redis-server
```

**Windows:**
- PostgreSQL: Start dari Services
- Redis: Start dari Services atau command line

---

## 🔄 Switching Between Environments

### From Sail to Manual

```bash
# Stop Sail
./vendor/bin/sail down

# Update .env
DB_HOST=127.0.0.1  # Change from 'pgsql'
REDIS_HOST=127.0.0.1  # Change from 'redis'

# Start local services
php artisan serve
```

### From Manual to Sail

```bash
# Stop local PHP server
# Ctrl+C on terminal running php artisan serve

# Update .env
DB_HOST=pgsql  # Change from '127.0.0.1'
REDIS_HOST=redis  # Change from '127.0.0.1'

# Start Sail
./vendor/bin/sail up -d
```

---

## 📚 Next Steps

After setup, check these guides:

- [Frontend Development Guide](FRONTEND-GUIDE.md) - React components & styling
- [Seeding Guide](../guides/SEEDING-GUIDE.md) - Add sample data
- [Commands Reference](../guides/COMMANDS.md) - Available artisan commands

---

## 🆘 Common Issues

### Port Conflicts

**Problem:** Port 80 or 5432 already in use

**Solution:**
```bash
# Sail: Edit docker-compose.yml ports
# Manual: Use different port
php artisan serve --port=8001
```

### Database Connection Refused

**Problem:** Can't connect to database

**Solution:**
- Sail: Check `DB_HOST=pgsql` in .env
- Manual: Check `DB_HOST=127.0.0.1` and PostgreSQL is running

### Assets Not Loading

**Problem:** CSS/JS not loading

**Solution:**
```bash
# Rebuild assets
npm run build

# Clear cache
php artisan optimize:clear
```

### Permission Denied (Sail)

**Problem:** Permission errors on storage/

**Solution:**
```bash
./vendor/bin/sail shell
chmod -R 775 storage bootstrap/cache
chown -R sail:sail storage bootstrap/cache
```

---

**Need help?** Check [Deployment Guides](../deployment/) or open an issue.
