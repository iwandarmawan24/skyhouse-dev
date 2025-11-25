# SkyHouse Property CMS

Modern property management CMS built with Laravel 11, React 19, and PostgreSQL.

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

## Quick Start

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd skyhouse

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate --seed

# Start development server
php artisan serve
npm run dev
```

Visit: `http://localhost:8000/admin/dashboard`
Login: `admin@skyhouse.com` / `password`

## Documentation

### 📖 Guides
- **[Deployment Guide](docs/deployment/)** - Production deployment options
  - [Docker Deployment](docs/deployment/docker-deployment.md) - Full Docker stack
  - [Lightweight Deployment](docs/deployment/lightweight-deployment.md) - Resource-limited VPS
  - [VPS Setup Guide](docs/deployment/vps-setup.md) - Server setup from scratch

### 💻 Development
- **[Frontend Development](docs/development/FRONTEND-GUIDE.md)** - React components & styling
- **[Seeding Guide](docs/guides/SEEDING-GUIDE.md)** - Database seeding
- **[Commands Reference](docs/guides/COMMANDS.md)** - Available artisan commands

### 🛠️ Scripts
All deployment and utility scripts are organized in `scripts/`:
- **[scripts/deployment/](scripts/deployment/)** - Deployment automation
- **[scripts/docker/](scripts/docker/)** - Docker utilities
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
