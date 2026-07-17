# Scripts Directory

Automation scripts untuk deployment, backup, dan server management.

## 📁 Directory Structure

```
scripts/
├── deployment/         # Deployment automation
├── docker/            # Docker utilities
├── server-setup/      # Server configuration
└── backup/            # Backup automation
```

## 🚀 Deployment Scripts

**Location:** `scripts/deployment/`

Scripts untuk deployment dan build process.

| Script | Description | Usage |
|--------|-------------|-------|
| `first-deploy.sh` ⚠️ stale | First-time Docker deployment (not used in prod) | `bash scripts/deployment/first-deploy.sh` |
| `deploy-to-docker.sh` ⚠️ stale | Deploy updates to running Docker (not used in prod) | `bash scripts/deployment/deploy-to-docker.sh` |
| `deploy-to-sail.sh` | Deploy updates to Sail (local dev only) | `bash scripts/deployment/deploy-to-sail.sh` |
| `quick-deploy.sh` | Quick update for LEMP stack (current prod method) | `bash scripts/deployment/quick-deploy.sh` |
| `build-vite.sh` | Build Vite assets only (with error handling) | `bash scripts/deployment/build-vite.sh` |
| `build-vite-sail.sh` | Build Vite assets in Sail environment | `bash scripts/deployment/build-vite-sail.sh` |
| `build-for-deployment.sh` | Build tar.gz for VPS | `bash scripts/deployment/build-for-deployment.sh` |
| `build-for-shared-hosting.sh` | Build ZIP for cPanel | `bash scripts/deployment/build-for-shared-hosting.sh` |

## 🐳 Docker Scripts (⚠️ STALE — not used in production)

**Location:** `scripts/docker/`

Production sekarang bare-metal nginx + PHP-FPM (lihat [DEPLOYMENT.md](../DEPLOYMENT.md)). Docker scripts kept for historical/local-Sail reference only.

| Script | Description | Usage |
|--------|-------------|-------|
| `install-docker.sh` | Install Docker & Docker Compose | `bash scripts/docker/install-docker.sh` |
| `optimize-docker.sh` | Optimize Docker resource usage | `bash scripts/docker/optimize-docker.sh` |

## ⚙️ Server Setup Scripts

**Location:** `scripts/server-setup/`

Server configuration and setup automation.

| Script | Description | Usage |
|--------|-------------|-------|
| `install-lemp.sh` | Install LEMP stack (Ubuntu) | `bash scripts/server-setup/install-lemp.sh` |
| `setup-nginx.sh` | Configure Nginx virtual host | `bash scripts/server-setup/setup-nginx.sh` |
| `setup-supervisor.sh` | Setup Laravel queue workers | `bash scripts/server-setup/setup-supervisor.sh` |

## 💾 Backup Scripts

**Location:** `scripts/backup/`

Database and file backup automation.

| Script | Description | Usage |
|--------|-------------|-------|
| `backup-database.sh` | Backup PostgreSQL database | `bash scripts/backup/backup-database.sh` |
| `backup-files.sh` | Backup application files | `bash scripts/backup/backup-files.sh` |
| `setup-cron-backup.sh` | Setup automated backups via cron | `bash scripts/backup/setup-cron-backup.sh` |

## 📖 Related Documentation

- [Deployment Guide](../docs/deployment/) - Production deployment options
- [Docker Deployment](../docs/deployment/docker-deployment.md) - Full Docker stack
- [Lightweight Deployment](../docs/deployment/lightweight-deployment.md) - Resource-limited VPS

## ⚠️ Important Notes

- Most scripts require **root/sudo access**
- Always review scripts before executing
- Make backups before running destructive operations
- Scripts are tested on **Ubuntu 20.04/22.04 LTS**

## 🆘 Troubleshooting

If a script fails:

1. Check script permissions: `chmod +x scripts/path/to/script.sh`
2. Review error messages carefully
3. Verify you have required permissions (root/sudo)
4. Check system requirements (OS version, installed packages)
5. See [Deployment Guide](../docs/deployment/README.md) for detailed instructions
