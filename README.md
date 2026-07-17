# SkyHouse Property CMS

Modern property management CMS built with Laravel 11, React 19, and PostgreSQL.

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

## Quick Start

### Local Development (Docker Sail - Recommended)

**Prerequisites:** Docker Desktop installed

```bash
# Clone repository
git clone <repository-url>
cd skyhouse

# Install PHP dependencies
composer install
# OR if no local PHP: docker run --rm -v $(pwd):/app composer install

# Setup environment
cp .env.example .env

# Start Docker services (PostgreSQL, Redis, etc)
./vendor/bin/sail up -d

# Generate app key & run migrations
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed

# Install frontend dependencies & build
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

Visit: `http://localhost/admin/dashboard`
Login: `admin@skyhouse.com` / `password`

**Tip:** Create alias for easier commands:
```bash
alias sail='./vendor/bin/sail'
# Then use: sail up, sail artisan migrate, etc.
```

### Local Development (Manual - Without Docker)

If you prefer not to use Docker:

```bash
# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure .env for local database
# DB_HOST=127.0.0.1 (not 'pgsql')

# Run migrations
php artisan migrate --seed

# Start servers (2 terminals)
php artisan serve    # Terminal 1
npm run dev          # Terminal 2
```

Visit: `http://localhost:8000/admin/dashboard`

## Documentation

### 💻 Local Development
- **[Local Setup Guide](docs/development/LOCAL-SETUP.md)** - Docker Sail or Manual setup
- **[Frontend Development](docs/development/FRONTEND-GUIDE.md)** - React components & styling
- **[Seeding Guide](docs/guides/SEEDING-GUIDE.md)** - Database seeding
- **[Commands Reference](docs/guides/COMMANDS.md)** - Available artisan commands

### 🚀 Production Deployment
- **[Deployment Guide](DEPLOYMENT.md)** - Current method: bare-metal nginx + PHP-FPM (domain setup, update/deploy flow, troubleshooting)
- **[Production Re-Deployment](docs/deployment/PRODUCTION-REDEPLOYMENT-GUIDE.md)** - Complete redeploy from scratch
- **[Fix 404 Error](docs/deployment/FIX-404.md)** - Production 404 troubleshooting
- Older Docker-based guides in `docs/deployment/` (docker-deployment.md, lightweight-deployment.md, vps-setup.md) are deprecated — kept for reference only

### 🛠️ Scripts
All deployment and utility scripts are organized in `scripts/`:
- **[scripts/deployment/](scripts/deployment/)** - Deployment automation (Docker scripts stale, see `scripts/README.md`)
- **[scripts/server-setup/](scripts/server-setup/)** - Server configuration
- **[scripts/backup/](scripts/backup/)** - Backup automation

## Tech Stack

**Backend:**
- Laravel 11 (PHP 8.2+)
- PostgreSQL 16
- Redis 7

**Frontend:**
- React 19
- Inertia.js 2.0
- Tailwind CSS 4.0
- Vite 7

**Infrastructure:**
- Docker / LEMP Stack
- Nginx / Apache
- Supervisor (Queue workers)

## Features

### Admin Panel
- Dashboard with statistics
- Hero Banners Management
- Products/Properties Management
- Articles & Blog (with SEO analyzer)
- Events Management
- Facilities Management
- Media Gallery
- Contact/Leads Management
- Settings & Policies

### Technical
- Rich Text Editor (TipTap)
- Real-time SEO Analysis
- Image Upload & Management
- Search & Filters
- Form Validation
- Responsive Design
- Role-based Access

## Project Structure

```
skyhouse/
├── app/                    # Laravel application
│   ├── Http/Controllers/  # Controllers
│   ├── Models/            # Eloquent models
│   └── Services/          # Business logic
├── resources/
│   ├── js/                # React components
│   │   ├── Components/   # Reusable components
│   │   ├── Pages/        # Page components
│   │   └── Layouts/      # Layout components
│   └── css/              # Stylesheets
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/          # Data seeders
├── docs/                 # Documentation
│   ├── deployment/       # Deployment guides
│   ├── development/      # Development guides
│   ├── guides/           # How-to guides
│   └── archive/          # Implementation notes
├── scripts/              # Automation scripts
│   ├── deployment/       # Deployment scripts
│   ├── docker/           # Docker utilities
│   ├── server-setup/     # Server setup scripts
│   └── backup/           # Backup scripts
└── docker/               # Docker configuration
    ├── nginx/           # Nginx configs
    └── php/             # PHP configs
```

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check documentation in `docs/`
- Review implementation notes in `docs/archive/`

## License

MIT License

---

**Happy Coding!** 🚀
