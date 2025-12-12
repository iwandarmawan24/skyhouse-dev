# Project Reorganization - 2025-01-26

Documentation dan scripts telah direorganisasi untuk struktur yang lebih baik.

## 📁 Struktur Baru

### Documentation (`docs/`)

```
docs/
├── README.md                           # Documentation index
├── deployment/                         # Deployment guides
│   ├── README.md                      # Deployment decision tree
│   ├── docker-deployment.md           # Docker setup (2GB+ RAM)
│   ├── lightweight-deployment.md      # Resource-limited options
│   └── vps-setup.md                   # VPS setup from scratch
├── development/                        # Development guides
│   ├── LOCAL-SETUP.md                 # Local dev setup (Docker Sail/Manual)
│   └── FRONTEND-GUIDE.md              # React & Tailwind guide
├── guides/                            # How-to guides
│   ├── SEEDING-GUIDE.md               # Database seeding
│   └── COMMANDS.md                    # Artisan commands
└── archive/                           # Historical docs
    ├── ARTICLE_SYSTEM_IMPLEMENTATION.md
    ├── COMPLETE_ARTICLE_SYSTEM.md
    ├── WYSIWYG_IMPLEMENTATION_COMPLETE.md
    └── HIDDEN_REGISTRATION.md
```

### Scripts (`scripts/`)

```
scripts/
├── README.md                          # Scripts index
├── deployment/                        # Deployment automation
│   ├── first-deploy.sh               # First-time Docker deployment
│   ├── deploy-to-docker.sh           # Update running Docker
│   ├── quick-deploy.sh               # LEMP quick update
│   ├── build-for-deployment.sh       # Build tar.gz for VPS
│   └── build-for-shared-hosting.sh   # Build ZIP for cPanel
├── docker/                            # Docker utilities
│   ├── install-docker.sh             # Install Docker
│   └── optimize-docker.sh            # Optimize Docker setup
├── server-setup/                      # Server configuration
│   ├── install-lemp.sh               # Install LEMP stack
│   ├── setup-nginx.sh                # Configure Nginx
│   └── setup-supervisor.sh           # Setup queue workers
└── backup/                            # Backup automation
    ├── backup-database.sh            # Backup PostgreSQL
    ├── backup-files.sh               # Backup files
    └── setup-cron-backup.sh          # Automated backups
```

## 📝 Perubahan File

### Relocated Files

**From root → `docs/deployment/`:**
- `DEPLOYMENT.md` → `docker-deployment.md`
- `deployment-lightweight.md` → `lightweight-deployment.md`
- `VPS-SETUP.md` → `vps-setup.md`

**From root → `docs/development/`:**
- `FRONTEND-GUIDE.md`

**From root → `docs/guides/`:**
- `SEEDING-GUIDE.md`
- `COMMANDS.md`

**From root → `docs/archive/`:**
- `ARTICLE_SYSTEM_IMPLEMENTATION.md`
- `COMPLETE_ARTICLE_SYSTEM.md`
- `WYSIWYG_IMPLEMENTATION_COMPLETE.md`
- `HIDDEN_REGISTRATION.md`

### Script Organization

**From `scripts/` → `scripts/deployment/`:**
- `first-deploy.sh`
- `deploy-to-docker.sh`
- `quick-deploy.sh`
- `build-for-deployment.sh`
- `build-for-shared-hosting.sh`

**From `scripts/` → `scripts/docker/`:**
- `install-docker.sh`
- `optimize-docker.sh`

**From `scripts/` → `scripts/server-setup/`:**
- `install-lemp.sh`
- `setup-nginx.sh`
- `setup-supervisor.sh`

**From `scripts/` → `scripts/backup/`:**
- `backup-database.sh`
- `backup-files.sh`
- `setup-cron-backup.sh`

## ✏️ Updated Files

### README.md
- Simplified to index-style (dari 62KB → 5KB)
- Removed technical implementation details
- Added links to all documentation
- Clear project structure overview

### All Documentation Files
- Updated script paths:
  - `scripts/first-deploy.sh` → `scripts/deployment/first-deploy.sh`
  - `scripts/build-for-deployment.sh` → `scripts/deployment/build-for-deployment.sh`
  - `scripts/install-lemp.sh` → `scripts/server-setup/install-lemp.sh`
  - etc.

## 🆕 New Files

- `docs/README.md` - Documentation index
- `docs/deployment/README.md` - Deployment decision tree
- `docs/development/LOCAL-SETUP.md` - Local development setup guide (Docker Sail/Manual)
- `scripts/README.md` - Scripts index

## 🔗 Quick Links

**Main Entry Points:**
- [README.md](README.md) - Project overview & quick start
- [docs/](docs/) - All documentation
- [docs/deployment/](docs/deployment/) - Deployment guides
- [scripts/](scripts/) - All automation scripts

**Most Used:**
- [Deployment Guide](docs/deployment/README.md)
- [Docker Deployment](docs/deployment/docker-deployment.md)
- [Lightweight Deployment](docs/deployment/lightweight-deployment.md)
- [Scripts Index](scripts/README.md)

## ✅ Benefits

1. **Better Organization** - Logical grouping by category
2. **Easier Navigation** - Clear folder structure
3. **Reduced Redundancy** - Merged overlapping content
4. **Simpler README** - Index-style instead of massive technical doc
5. **Discoverable** - Clear entry points with README files

## 🔄 Migration Notes

If you have bookmarks or references to old paths:

**Old Path** → **New Path**
- `DEPLOYMENT.md` → `docs/deployment/docker-deployment.md`
- `deployment-lightweight.md` → `docs/deployment/lightweight-deployment.md`
- `FRONTEND-GUIDE.md` → `docs/development/FRONTEND-GUIDE.md`
- `scripts/first-deploy.sh` → `scripts/deployment/first-deploy.sh`
- `scripts/install-lemp.sh` → `scripts/server-setup/install-lemp.sh`

All documentation has been updated with correct paths.

---

**Reorganized:** 2025-01-26
**Author:** Claude
