# 🖥️ VPS Setup Guide - SkyHouse CMS

Panduan step-by-step untuk setup VPS dari awal sampai siap production.

## 📋 Requirements

- **VPS Specifications**:
  - RAM: Minimal 2GB (recommended 4GB)
  - CPU: Minimal 2 cores
  - Storage: Minimal 20GB SSD
  - OS: Ubuntu 22.04 atau 24.04 LTS

- **Provider Recommendations**:
  - DigitalOcean (Droplet $12/mo)
  - Vultr (Cloud Compute $12/mo)
  - Linode (Nanode $10/mo)
  - AWS Lightsail ($10/mo)

## 🚀 Step-by-Step Setup

### 1. Initial Server Setup

```bash
# Login sebagai root
ssh root@your-vps-ip

# Update system packages
apt update && apt upgrade -y

# Set timezone ke Jakarta
timedatectl set-timezone Asia/Jakarta

# Check timezone
timedatectl
```

### 2. Create Non-Root User (Recommended)

```bash
# Create user
adduser deploy

# Add to sudo group
usermod -aG sudo deploy

# Setup SSH for new user
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Test login (dari terminal lain)
ssh deploy@your-vps-ip

# Jika berhasil, disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### 3. Setup Firewall

```bash
# Install UFW
sudo apt install ufw -y

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 4. Install Docker

**Option A: Using Script (Recommended)**

```bash
# Clone repository
git clone https://github.com/your-username/skyhouse.git
cd skyhouse

# Run Docker installation script
sudo bash scripts/install-docker.sh

# Logout and login again untuk apply docker group
exit
ssh deploy@your-vps-ip
```

**Option B: Manual Installation**

```bash
# Install prerequisites
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER

# Logout dan login lagi
exit
```

### 5. Verify Docker Installation

```bash
# Check Docker version
docker --version
# Output: Docker version 24.x.x

# Check Docker Compose version
docker compose version
# Output: Docker Compose version v2.x.x

# Test Docker
docker run hello-world
```

### 6. Install Git (if not installed)

```bash
# Install Git
sudo apt install git -y

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 7. Setup SSH Keys untuk GitHub (Optional - untuk CI/CD)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your@email.com"

# Display public key
cat ~/.ssh/id_ed25519.pub

# Copy output dan tambahkan ke GitHub:
# https://github.com/settings/keys
```

### 8. Clone Repository

```bash
# Ke directory yang diinginkan (misal /var/www)
cd /var/www

# Clone repository
sudo git clone https://github.com/your-username/skyhouse.git
sudo chown -R $USER:$USER skyhouse
cd skyhouse
```

### 9. Setup Environment

```bash
# Copy production environment
cp .env.production.example .env.production

# Edit environment
nano .env.production
```

**Update values di `.env.production`:**

```env
APP_NAME="SkyHouse"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://your-vps-ip

DB_DATABASE=skyhouse
DB_USERNAME=skyhouse
DB_PASSWORD=CHANGE_THIS_TO_SECURE_PASSWORD

REDIS_PASSWORD=CHANGE_THIS_IF_NEEDED
```

### 10. First Deployment

```bash
# Run first deployment
bash scripts/deployment/first-deploy.sh
```

**Script akan memakan waktu 5-10 menit** dan akan:
- Build Docker images
- Start all containers
- Install dependencies
- Run migrations
- Setup application

### 11. Create Admin User

```bash
# Access Laravel Tinker
docker compose -f docker-compose.prod.yml exec app php artisan tinker

# Create admin
User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('SecurePassword123!')
]);

# Exit
exit
```

### 12. Test Application

Buka browser:
```
http://your-vps-ip
http://your-vps-ip/admin/login
```

## 🔐 Security Hardening (Optional but Recommended)

### 1. Setup Fail2Ban

```bash
# Install fail2ban
sudo apt install fail2ban -y

# Copy configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status
```

### 2. Setup Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install unattended-upgrades -y

# Enable automatic updates
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Setup Log Rotation

```bash
# Create logrotate config for application
sudo nano /etc/logrotate.d/skyhouse

# Add configuration:
/var/www/skyhouse/storage/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

## 📊 Monitoring Setup

### 1. Install htop

```bash
# Install htop
sudo apt install htop -y

# Run to monitor
htop
```

### 2. Setup Docker Stats Monitoring

```bash
# View real-time container stats
docker stats

# Or use ctop (better UI)
sudo wget https://github.com/bcicen/ctop/releases/download/0.7.7/ctop-0.7.7-linux-amd64 -O /usr/local/bin/ctop
sudo chmod +x /usr/local/bin/ctop
ctop
```

## 💾 Setup Automatic Backups

```bash
# Setup automatic daily backups
sudo bash scripts/setup-cron-backup.sh
```

Backup akan berjalan setiap hari jam 2 pagi.

## 🔄 Setup CI/CD (GitHub Actions)

### 1. Generate SSH Key untuk CI/CD

```bash
# Generate dedicated key untuk CI/CD
ssh-keygen -t ed25519 -f ~/.ssh/github_actions -C "github-actions"

# Add to authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Display private key (untuk GitHub Secrets)
cat ~/.ssh/github_actions
```

### 2. Add GitHub Secrets

Go to GitHub Repository → Settings → Secrets and variables → Actions

Add:
- `SSH_PRIVATE_KEY`: Content dari `~/.ssh/github_actions`
- `VPS_HOST`: IP VPS (contoh: `123.456.789.0`)
- `VPS_USER`: Username SSH (contoh: `deploy`)
- `VPS_PATH`: Path project (contoh: `/var/www/skyhouse`)

### 3. Create Production Branch

```bash
# Create and push production branch
git checkout -b production
git push origin production
```

Sekarang setiap push ke branch `production` akan auto-deploy!

## 🌐 Setup Domain (Optional)

### 1. Point Domain ke VPS

Di DNS provider (Cloudflare, Namecheap, etc):

```
Type: A
Name: @
Value: your-vps-ip
TTL: Automatic

Type: A
Name: www
Value: your-vps-ip
TTL: Automatic
```

### 2. Update .env.production

```env
APP_URL=https://yourdomain.com
SESSION_DOMAIN=.yourdomain.com
```

### 3. Install SSL Certificate

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Stop nginx container temporarily
docker compose -f docker-compose.prod.yml stop nginx

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Start nginx
docker compose -f docker-compose.prod.yml start nginx
```

### 4. Update Nginx Config

Edit `docker/nginx/nginx.conf` untuk support HTTPS (lihat DEPLOYMENT.md untuk detail).

## ✅ Checklist Final

Sebelum go live, pastikan:

- [ ] Firewall configured (SSH, HTTP, HTTPS)
- [ ] Docker & Docker Compose installed
- [ ] Application running (`http://your-vps-ip` accessible)
- [ ] Admin user created dan bisa login
- [ ] Automatic backups configured
- [ ] SSL certificate installed (jika pakai domain)
- [ ] Environment variables properly set
- [ ] Log rotation configured
- [ ] Monitoring tools installed

## 🆘 Troubleshooting

### Docker permission denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login
exit
```

### Port already in use (80 or 443)

**Common during first deployment!** VPS sering sudah punya Apache/Nginx terinstall.

```bash
# Check what's using port 80
sudo lsof -i :80

# Stop the service
sudo systemctl stop apache2
sudo systemctl disable apache2  # Prevent auto-start

# Or if Nginx
sudo systemctl stop nginx
sudo systemctl disable nginx

# Verify port is free
sudo lsof -i :80  # Should return nothing

# Optional: Remove completely if not needed
sudo apt remove apache2  # or nginx
sudo apt autoremove
```

### Out of memory

```bash
# Check memory
free -h

# If needed, add swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 📞 Next Steps

- Read: [DEPLOYMENT.md](./DEPLOYMENT.md) untuk deployment workflow
- Setup monitoring dengan Uptime Robot atau StatusCake
- Configure email (SMTP) untuk notifications
- Setup database backups ke remote storage (S3, etc)

---

**Congratulations!** 🎉 VPS Anda sekarang siap untuk production!
