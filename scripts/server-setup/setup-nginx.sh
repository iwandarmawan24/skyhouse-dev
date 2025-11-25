#!/bin/bash
# Setup Nginx untuk SkyHouse CMS

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up Nginx for SkyHouse CMS${NC}"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Ask for domain or use IP
echo "Enter your domain name (or press Enter to use server IP):"
read -p "Domain: " DOMAIN

if [ -z "$DOMAIN" ]; then
    DOMAIN=$(hostname -I | awk '{print $1}')
    echo -e "${YELLOW}Using server IP: $DOMAIN${NC}"
fi

# Create Nginx configuration
echo ""
echo -e "${YELLOW}Creating Nginx configuration...${NC}"

cat > /etc/nginx/sites-available/skyhouse << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;
    root /var/www/skyhouse/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    index index.php;

    charset utf-8;

    # Logging
    access_log /var/log/nginx/skyhouse-access.log;
    error_log /var/log/nginx/skyhouse-error.log;

    # Root location
    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    # Security headers
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    # Handle 404
    error_page 404 /index.php;

    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;

        # Increase timeout for large operations
        fastcgi_read_timeout 300;
    }

    # Deny access to hidden files
    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/x-javascript
        application/xml
        application/xml+rss
        image/svg+xml;

    # Client body size (for file uploads)
    client_max_body_size 100M;
}
EOF

# Enable site
echo -e "${YELLOW}Enabling site...${NC}"
ln -sf /etc/nginx/sites-available/skyhouse /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo ""
echo -e "${YELLOW}Testing Nginx configuration...${NC}"
if nginx -t; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration has errors${NC}"
    exit 1
fi

# Restart Nginx
echo ""
echo -e "${YELLOW}Restarting Nginx...${NC}"
systemctl restart nginx

# Check if Nginx is running
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx is running${NC}"
else
    echo -e "${RED}❌ Nginx failed to start${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Nginx configured successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Configuration Details:"
echo "  - Domain: $DOMAIN"
echo "  - Root: /var/www/skyhouse/public"
echo "  - Config: /etc/nginx/sites-available/skyhouse"
echo "  - Access Log: /var/log/nginx/skyhouse-access.log"
echo "  - Error Log: /var/log/nginx/skyhouse-error.log"
echo ""
echo "🌐 Access your application at:"
echo "  http://$DOMAIN"
echo ""
echo "📝 Next Steps:"
echo "  1. Configure your .env file"
echo "  2. Run: php artisan migrate --force"
echo "  3. Run: php artisan storage:link"
echo "  4. Run: php artisan config:cache"
echo ""
echo "🔐 To setup SSL (HTTPS):"
echo "  sudo apt install certbot python3-certbot-nginx"
echo "  sudo certbot --nginx -d $DOMAIN"
echo ""
