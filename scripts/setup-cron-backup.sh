#!/bin/bash

# Setup automatic daily backups via crontab
# This will backup database and files every day at 2 AM
# Usage: sudo bash scripts/setup-cron-backup.sh

set -e

# Get the current directory (project root)
PROJECT_DIR=$(pwd)

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root or with sudo"
    exit 1
fi

# Get the actual user (not root)
if [ -n "$SUDO_USER" ]; then
    ACTUAL_USER=$SUDO_USER
else
    ACTUAL_USER=$(whoami)
fi

echo "======================================"
echo "Setup Automatic Backups"
echo "======================================"
echo "Project directory: $PROJECT_DIR"
echo "User: $ACTUAL_USER"
echo ""

# Create backup scripts wrapper
BACKUP_WRAPPER="/usr/local/bin/skyhouse-backup.sh"
cat > $BACKUP_WRAPPER << EOF
#!/bin/bash
cd $PROJECT_DIR
bash scripts/backup-database.sh >> $PROJECT_DIR/backups/backup.log 2>&1
bash scripts/backup-files.sh >> $PROJECT_DIR/backups/backup.log 2>&1
EOF

chmod +x $BACKUP_WRAPPER

# Create cron job
CRON_JOB="0 2 * * * $BACKUP_WRAPPER"

# Check if cron job already exists
(crontab -u $ACTUAL_USER -l 2>/dev/null | grep -v "skyhouse-backup.sh"; echo "$CRON_JOB") | crontab -u $ACTUAL_USER -

echo "✅ Cron job added successfully!"
echo ""
echo "Backup schedule:"
echo "  - Time: Every day at 2:00 AM"
echo "  - Database: backups/database/"
echo "  - Files: backups/files/"
echo "  - Log: backups/backup.log"
echo ""
echo "Current crontab for $ACTUAL_USER:"
crontab -u $ACTUAL_USER -l | grep skyhouse-backup

echo ""
echo "To view backup logs:"
echo "  tail -f $PROJECT_DIR/backups/backup.log"
echo ""
echo "To manually run backup:"
echo "  bash scripts/backup-database.sh"
echo "  bash scripts/backup-files.sh"
echo ""
echo "======================================"
echo "Setup completed!"
echo "======================================"
