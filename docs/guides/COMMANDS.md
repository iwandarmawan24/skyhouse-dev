# ⚡ Quick Commands Reference - SkyHouse CMS

Cheat sheet untuk command-command yang sering dipakai.

---

## 🐳 Docker Commands

### Development (Laravel Sail)

```bash
# Start containers
./vendor/bin/sail up -d

# Stop containers
./vendor/bin/sail down

# View logs
./vendor/bin/sail logs -f

# Access shell
./vendor/bin/sail shell

# Artisan commands
./vendor/bin/sail artisan <command>

# Composer
./vendor/bin/sail composer install
./vendor/bin/sail composer update

# NPM
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
./vendor/bin/sail npm run build
```

### Production (Docker Compose)

```bash
# Start all services
docker compose -f docker-compose.prod.yml up -d

# Stop all services
docker compose -f docker-compose.prod.yml down

# View logs
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f nginx

# Restart services
docker compose -f docker-compose.prod.yml restart
docker compose -f docker-compose.prod.yml restart app
docker compose -f docker-compose.prod.yml restart nginx

# Access container shell
docker compose -f docker-compose.prod.yml exec app sh

# Artisan commands
docker compose -f docker-compose.prod.yml exec app php artisan <command>

# Container status
docker compose -f docker-compose.prod.yml ps

# Rebuild images
docker compose -f docker-compose.prod.yml build --no-cache
```

---

## 🗄️ Database Commands

### Migrations

```bash
# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Reset all migrations
php artisan migrate:reset

# Fresh migrations (drop all tables and re-run)
php artisan migrate:fresh

# Fresh migrations with seeding
php artisan migrate:fresh --seed

# Check migration status
php artisan migrate:status

# Create new migration
php artisan make:migration create_table_name
```

### Seeding

```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=ProductSeeder

# Fresh migrate + seed
php artisan migrate:fresh --seed

# Create new seeder
php artisan make:seeder ModelSeeder
```

### Database Access

```bash
# Laravel Tinker (REPL)
php artisan tinker

# PostgreSQL shell (Production)
docker compose -f docker-compose.prod.yml exec postgres psql -U skyhouse skyhouse

# PostgreSQL shell (Sail)
./vendor/bin/sail psql
```

---

## 🎨 Frontend Commands

### Development

```bash
# Install dependencies
npm install

# Dev server (with HMR)
npm run dev

# Production build
npm run build

# Lint check
npm run lint
```

---

## 🔧 Artisan Commands

### Cache Management

```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Cache config (production)
php artisan config:cache
php artisan route:cache  # Skip if Laravel 12 issue
php artisan view:cache

# Clear compiled classes
php artisan clear-compiled
php artisan optimize:clear
```

### Key & Storage

```bash
# Generate app key
php artisan key:generate

# Create storage symlink
php artisan storage:link
```

### Queue & Schedule

```bash
# Run queue worker
php artisan queue:work

# Run queue with options
php artisan queue:work --sleep=3 --tries=3

# Restart queue workers
php artisan queue:restart

# Run scheduler (once)
php artisan schedule:run

# List scheduled tasks
php artisan schedule:list
```

### Maintenance Mode

```bash
# Enable maintenance mode
php artisan down

# Enable with retry after 60s
php artisan down --retry=60

# Disable maintenance mode
php artisan up
```

---

## 🚀 Deployment Commands

### First Deployment

```bash
# Run first deployment script
bash scripts/deployment/first-deploy.sh
```

### Update Deployment

```bash
# Pull latest code
git pull origin master

# Run deployment script
bash deploy.sh

# Or manual deployment
docker compose -f docker-compose.prod.yml exec app php artisan down
git pull origin master
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml exec app composer install --no-dev --optimize-autoloader
docker compose -f docker-compose.prod.yml exec app npm ci
docker compose -f docker-compose.prod.yml exec app npm run build
docker compose -f docker-compose.prod.yml exec app php artisan migrate --force
docker compose -f docker-compose.prod.yml exec app php artisan config:cache
docker compose -f docker-compose.prod.yml exec app php artisan view:cache
docker compose -f docker-compose.prod.yml restart app nginx
docker compose -f docker-compose.prod.yml exec app php artisan up
```

---

## 💾 Backup Commands

### Database Backup

```bash
# Run database backup
bash scripts/backup-database.sh

# Manual backup
docker exec -t skyhouse-postgres pg_dump -U skyhouse skyhouse | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Files Backup

```bash
# Run files backup
bash scripts/backup-files.sh

# Manual backup
tar -czf backup_files_$(date +%Y%m%d).tar.gz storage/
```

### Setup Auto Backup

```bash
# Setup daily backup cron
sudo bash scripts/setup-cron-backup.sh

# View backup logs
tail -f backups/backup.log
```

### Restore

```bash
# Restore database
gunzip < backup.sql.gz | docker exec -i skyhouse-postgres psql -U skyhouse skyhouse

# Restore files
tar -xzf backup_files.tar.gz
```

---

## 👤 User Management

### Create Admin User

```bash
# Via Tinker
php artisan tinker

# Then execute:
User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => Hash::make('password')]);
```

### Via Seeder

```bash
# Seed includes admin user
php artisan db:seed
# Email: admin@skyhouse.com
# Password: password
```

---

## 📊 Monitoring Commands

### System Status

```bash
# Check all containers
docker compose -f docker-compose.prod.yml ps

# Check specific service
docker compose -f docker-compose.prod.yml ps app

# Container stats
docker stats

# Disk usage
df -h

# Memory usage
free -h

# Check port 80
sudo lsof -i :80
```

### Health Checks

```bash
# PostgreSQL
docker compose -f docker-compose.prod.yml exec postgres pg_isready

# Redis
docker compose -f docker-compose.prod.yml exec redis redis-cli ping

# Application
curl http://your-vps-ip
```

### Logs

```bash
# All logs
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f nginx
docker compose -f docker-compose.prod.yml logs -f postgres
docker compose -f docker-compose.prod.yml logs -f queue

# Laravel logs
docker compose -f docker-compose.prod.yml exec app tail -f storage/logs/laravel.log

# Nginx logs
docker compose -f docker-compose.prod.yml exec nginx tail -f /var/log/nginx/access.log
docker compose -f docker-compose.prod.yml exec nginx tail -f /var/log/nginx/error.log
```

---

## 🔍 Debugging Commands

### Check Environment

```bash
# Show environment
php artisan env

# Check config
php artisan config:show

# Route list
php artisan route:list

# Event list
php artisan event:list
```

### Database Connection

```bash
# Test connection
php artisan tinker
# Then: DB::connection()->getPdo();

# Show queries
php artisan tinker
# Then: DB::enableQueryLog();
```

### Permission Issues

```bash
# Fix storage permissions
docker compose -f docker-compose.prod.yml exec app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
docker compose -f docker-compose.prod.yml exec app chmod -R 775 /var/www/storage /var/www/bootstrap/cache
```

---

## 🧹 Cleanup Commands

### Docker Cleanup

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a --volumes

# Clean Laravel caches
php artisan optimize:clear
```

### Log Cleanup

```bash
# Clear Laravel logs
truncate -s 0 storage/logs/*.log

# Clear old logs
find storage/logs -name "*.log" -mtime +30 -delete
```

---

## 🛠️ Generator Commands

### Create New Components

```bash
# Model with migration
php artisan make:model ModelName -m

# Model with migration, factory, seeder
php artisan make:model ModelName -mfs

# Controller
php artisan make:controller ControllerName

# Resource Controller
php artisan make:controller ControllerName --resource

# Request
php artisan make:request RequestName

# Migration
php artisan make:migration create_table_name

# Seeder
php artisan make:seeder SeederName

# Factory
php artisan make:factory FactoryName

# Policy
php artisan make:policy PolicyName

# Middleware
php artisan make:middleware MiddlewareName

# Command
php artisan make:command CommandName

# Job
php artisan make:job JobName

# Event
php artisan make:event EventName

# Listener
php artisan make:listener ListenerName

# Mail
php artisan make:mail MailName

# Notification
php artisan make:notification NotificationName
```

---

## 📦 Composer Commands

```bash
# Install dependencies
composer install

# Update dependencies
composer update

# Install production only
composer install --no-dev --optimize-autoloader

# Add package
composer require vendor/package

# Remove package
composer remove vendor/package

# Dump autoload
composer dump-autoload

# Show installed packages
composer show

# Check for updates
composer outdated
```

---

## 🌐 Git Commands

```bash
# Check status
git status

# Pull latest
git pull origin master

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin master

# View log
git log --oneline

# Create branch
git checkout -b feature-name

# Switch branch
git checkout branch-name

# Merge branch
git merge branch-name

# Stash changes
git stash
git stash pop
```

---

## 🔐 Security Commands

### Update Packages

```bash
# Composer security audit
composer audit

# NPM security audit
npm audit

# Fix npm vulnerabilities
npm audit fix
```

### SSL/HTTPS

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d yourdomain.com

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

---

## 📱 Testing Commands

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter TestName

# Run with coverage
php artisan test --coverage

# PHPUnit
./vendor/bin/phpunit

# Pest (if installed)
./vendor/bin/pest
```

---

## 🎯 Quick Scenarios

### Scenario: Fresh Local Development

```bash
git clone <repo>
cd skyhouse
./vendor/bin/sail up -d
./vendor/bin/sail composer install
./vendor/bin/sail npm install
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail npm run dev
# Access: http://localhost
```

### Scenario: Deploy Update to Production

```bash
ssh root@your-vps-ip
cd /var/www/skyhouse
git pull origin master
bash deploy.sh
```

### Scenario: Fix Permission Error

```bash
docker compose -f docker-compose.prod.yml exec app chown -R www-data:www-data storage bootstrap/cache
docker compose -f docker-compose.prod.yml exec app chmod -R 775 storage bootstrap/cache
docker compose -f docker-compose.prod.yml restart app
```

### Scenario: Reset Development Data

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```

### Scenario: Create New Feature

```bash
# Model + Migration + Seeder
php artisan make:model Feature -ms

# Controller
php artisan make:controller FeatureController --resource

# Edit files, then:
php artisan migrate
php artisan db:seed --class=FeatureSeeder
```

---

## 📞 Need Help?

- **Documentation**: Check README.md, DEPLOYMENT.md, VPS-SETUP.md
- **Logs**: `docker compose -f docker-compose.prod.yml logs -f`
- **Laravel Docs**: https://laravel.com/docs
- **Inertia Docs**: https://inertiajs.com

---

**Keep this file handy for quick reference!** ⚡
