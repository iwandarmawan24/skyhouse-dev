# 🚀 SkyHouse CMS - Deployment Guide

Panduan deployment SkyHouse CMS untuk berbagai skenario infrastruktur.

## 📊 Pilih Deployment Method

### Option 1: Docker Deployment (Recommended for 2GB+ RAM)
**[→ Docker Deployment Guide](docker-deployment.md)**

- **Pros:** Isolated environment, easy to manage, consistent across environments
- **Cons:** Requires more resources (~2GB RAM)
- **Best for:** VPS dengan 2GB+ RAM, 2+ CPU cores
- **Cost:** $10-20/bulan

**Tech Stack:**
- Docker Compose
- Nginx (Alpine)
- PHP 8.2 FPM (Alpine)
- PostgreSQL 16 (Alpine)
- Redis 7 (Alpine)

**Quick Start:**
```bash
bash scripts/deployment/first-deploy.sh
```

---

### Option 2: Lightweight Deployment (For Limited Resources)
**[→ Lightweight Deployment Guide](lightweight-deployment.md)**

- **Pros:** Hemat resource, cocok untuk VPS kecil atau shared hosting
- **Cons:** Setup manual lebih banyak
- **Best for:** VPS dengan 512MB-1GB RAM, shared hosting
- **Cost:** $3-10/bulan

**Includes:**
- **Option 0:** Optimize existing Docker setup (2GB → 1GB RAM)
- **Option 1:** Traditional LEMP stack deployment
- **Option 2:** Shared hosting (cPanel) deployment

**Build Strategy:**
- Build assets di local (hemat server resources)
- Upload hasil build ke server
- Server hanya run PHP, tidak compile

**Quick Start (VPS):**
```bash
# Local
npm run build
bash scripts/server-setup/install-lemp.sh

# Server
bash scripts/deployment/quick-deploy.sh
```

---

### Option 3: VPS Setup from Scratch
**[→ VPS Setup Guide](vps-setup.md)**

Panduan lengkap setup VPS dari awal:
- Initial server configuration
- Security hardening
- User management
- Firewall setup
- SSH configuration

---

## 📦 Deployment Scripts

All automation scripts are located in `scripts/`:

### Deployment Scripts (`scripts/deployment/`)
- `first-deploy.sh` - First-time Docker deployment
- `deploy-to-docker.sh` - Deploy updates to running Docker
- `quick-deploy.sh` - Quick update for traditional LEMP
- `build-for-deployment.sh` - Build package for VPS
- `build-for-shared-hosting.sh` - Build ZIP for cPanel

### Docker Scripts (`scripts/docker/`)
- `install-docker.sh` - Install Docker & Docker Compose
- `optimize-docker.sh` - Migrate to optimized Docker setup

### Server Setup Scripts (`scripts/server-setup/`)
- `install-lemp.sh` - One-command LEMP stack installation
- `setup-nginx.sh` - Configure Nginx virtual host
- `setup-supervisor.sh` - Setup Laravel queue workers

### Backup Scripts (`scripts/backup/`)
- `backup-database.sh` - Backup PostgreSQL database
- `backup-files.sh` - Backup application files
- `setup-cron-backup.sh` - Setup automated backups

---

## 🎯 Decision Tree

**Punya budget $10-20/bulan?**
- ✅ YES → Pakai [Docker Deployment](docker-deployment.md)
- ❌ NO → Lanjut ke pertanyaan berikut

**VPS sudah running dengan Docker?**
- ✅ YES → Pakai [Lightweight Deployment - Option 0](lightweight-deployment.md#option-0-optimize-existing-docker-setup) (Optimize Docker)
- ❌ NO → Lanjut ke pertanyaan berikut

**Punya akses VPS (root/sudo)?**
- ✅ YES → Pakai [Lightweight Deployment - Option 1](lightweight-deployment.md#option-1-deployment-ke-vps-minimal-ubuntu) (LEMP Stack)
- ❌ NO → Pakai [Lightweight Deployment - Option 2](lightweight-deployment.md#option-2-deployment-ke-shared-hosting) (Shared Hosting)

---

## ⚙️ Comparison Table

| Feature | Docker | Docker Optimized | LEMP Stack | Shared Hosting |
|---------|--------|------------------|------------|----------------|
| **RAM Required** | 2GB | 1GB | 512MB-1GB | 256MB-512MB |
| **CPU Required** | 2 cores | 1-2 cores | 1 core | Shared |
| **Storage** | 20GB | 10GB | 5GB | 1-5GB |
| **Setup Time** | 10-15 min | 2-5 min | 5-10 min | 15-20 min |
| **Maintenance** | Easy | Easy | Medium | Manual |
| **Scalability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Cost/Month** | $10-20 | $5-15 | $3-10 | $3-5 |
| **Use Case** | Production | Small-medium | Budget VPS | Personal/Dev |

---

## 🔐 Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] Domain configured (or using IP)
- [ ] SSL certificate ready (or use Let's Encrypt)
- [ ] Database password set (strong, unique)
- [ ] `.env` configured for production
- [ ] `APP_DEBUG=false` in `.env`
- [ ] `APP_ENV=production` in `.env`
- [ ] Email/SMTP configured (for contact forms)
- [ ] Storage permissions set correctly
- [ ] Backup strategy planned
- [ ] Monitoring/logging setup

---

## 🆘 Troubleshooting

Common issues and solutions:

### Permission Errors
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Database Connection Failed
Check `.env` database credentials and ensure database service is running.

### Assets Not Loading
```bash
php artisan storage:link
npm run build
```

### Docker Out of Memory
Switch to [optimized Docker setup](lightweight-deployment.md#option-0-optimize-existing-docker-setup).

---

## 📞 Need Help?

- Check [Troubleshooting Guide](../guides/troubleshooting.md)
- Review [Commands Reference](../guides/COMMANDS.md)
- Open an issue on GitHub
