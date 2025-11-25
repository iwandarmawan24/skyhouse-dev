#!/bin/bash
# Install LEMP stack untuk Ubuntu minimal
# Tested on: Ubuntu 20.04, 22.04

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Installing LEMP Stack for SkyHouse CMS${NC}"
echo ""
echo "This script will install:"
echo "  - Nginx"
echo "  - PHP 8.2 + extensions"
echo "  - PostgreSQL or MySQL"
echo "  - Redis"
echo "  - Composer"
echo "  - Supervisor"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

echo ""
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

echo ""
echo -e "${YELLOW}📦 Installing Nginx...${NC}"
apt install nginx -y
systemctl enable nginx
systemctl start nginx
echo -e "${GREEN}✅ Nginx installed${NC}"

echo ""
echo -e "${YELLOW}📦 Installing PHP 8.2...${NC}"
apt install software-properties-common -y
add-apt-repository ppa:ondrej/php -y
apt update

apt install -y \
    php8.2-fpm \
    php8.2-cli \
    php8.2-common \
    php8.2-mysql \
    php8.2-pgsql \
    php8.2-zip \
    php8.2-gd \
    php8.2-mbstring \
    php8.2-curl \
    php8.2-xml \
    php8.2-bcmath \
    php8.2-redis \
    php8.2-intl

echo -e "${GREEN}✅ PHP 8.2 installed${NC}"

echo ""
echo -e "${YELLOW}🗄️  Choose database:${NC}"
echo "  1) PostgreSQL 14 (Recommended)"
echo "  2) MySQL 8.0"
read -p "Enter choice [1]: " db_choice
db_choice=${db_choice:-1}

if [ "$db_choice" = "1" ]; then
    echo ""
    echo -e "${YELLOW}📦 Installing PostgreSQL...${NC}"
    apt install postgresql postgresql-contrib -y
    systemctl enable postgresql
    systemctl start postgresql

    # Create database and user
    echo ""
    read -p "Enter database name [skyhouse]: " DB_NAME
    DB_NAME=${DB_NAME:-skyhouse}

    read -p "Enter database user [skyhouse]: " DB_USER
    DB_USER=${DB_USER:-skyhouse}

    read -sp "Enter database password: " DB_PASS
    echo ""

    # Create PostgreSQL user and database
    sudo -u postgres psql << EOF
CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
CREATE DATABASE $DB_NAME OWNER $DB_USER;
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\q
EOF

    echo -e "${GREEN}✅ PostgreSQL installed${NC}"
    echo -e "Database: $DB_NAME"
    echo -e "User: $DB_USER"
else
    echo ""
    echo -e "${YELLOW}📦 Installing MySQL...${NC}"
    apt install mysql-server -y
    systemctl enable mysql
    systemctl start mysql

    # Secure MySQL installation
    echo ""
    echo -e "${YELLOW}Securing MySQL installation...${NC}"
    mysql_secure_installation

    # Create database and user
    echo ""
    read -p "Enter database name [skyhouse]: " DB_NAME
    DB_NAME=${DB_NAME:-skyhouse}

    read -p "Enter database user [skyhouse]: " DB_USER
    DB_USER=${DB_USER:-skyhouse}

    read -sp "Enter database password: " DB_PASS
    echo ""

    # Create MySQL user and database
    mysql << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

    echo -e "${GREEN}✅ MySQL installed${NC}"
    echo -e "Database: $DB_NAME"
    echo -e "User: $DB_USER"
fi

echo ""
echo -e "${YELLOW}📦 Installing Redis...${NC}"
apt install redis-server -y
systemctl enable redis-server
systemctl start redis-server
echo -e "${GREEN}✅ Redis installed${NC}"

echo ""
echo -e "${YELLOW}📦 Installing Composer...${NC}"
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
echo -e "${GREEN}✅ Composer installed${NC}"

echo ""
echo -e "${YELLOW}📦 Installing Supervisor (for queue workers)...${NC}"
apt install supervisor -y
systemctl enable supervisor
systemctl start supervisor
echo -e "${GREEN}✅ Supervisor installed${NC}"

echo ""
echo -e "${YELLOW}⚙️  Configuring PHP...${NC}"
# Increase upload limits
sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 100M/' /etc/php/8.2/fpm/php.ini
sed -i 's/post_max_size = 8M/post_max_size = 100M/' /etc/php/8.2/fpm/php.ini
sed -i 's/max_execution_time = 30/max_execution_time = 300/' /etc/php/8.2/fpm/php.ini
sed -i 's/memory_limit = 128M/memory_limit = 512M/' /etc/php/8.2/fpm/php.ini

# Enable OPcache for better performance
cat >> /etc/php/8.2/fpm/conf.d/99-opcache.ini << EOF
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.validate_timestamps=0
opcache.save_comments=1
EOF

systemctl restart php8.2-fpm
echo -e "${GREEN}✅ PHP configured${NC}"

echo ""
echo -e "${YELLOW}🔥 Setting up firewall...${NC}"
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable
echo -e "${GREEN}✅ Firewall configured${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ LEMP Stack installed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Installation Summary:"
echo "  - Nginx: http://$(hostname -I | awk '{print $1}')"
echo "  - PHP: $(php -v | head -n 1)"
echo "  - Database: $DB_NAME"
echo "  - Database User: $DB_USER"
echo ""
echo "📝 Next Steps:"
echo "  1. Upload your application to /var/www/skyhouse"
echo "  2. Run: bash /var/www/skyhouse/scripts/setup-nginx.sh"
echo "  3. Configure your .env file"
echo "  4. Run migrations: php artisan migrate --force"
echo ""
echo "⚠️  Save this database information:"
echo "  DB_CONNECTION=$([ "$db_choice" = "1" ] && echo "pgsql" || echo "mysql")"
echo "  DB_HOST=localhost"
echo "  DB_PORT=$([ "$db_choice" = "1" ] && echo "5432" || echo "3306")"
echo "  DB_DATABASE=$DB_NAME"
echo "  DB_USERNAME=$DB_USER"
echo "  DB_PASSWORD=$DB_PASS"
echo ""
