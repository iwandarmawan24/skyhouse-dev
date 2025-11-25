#!/bin/bash

# Files backup script for SkyHouse CMS
# Backs up uploaded files and storage directory
# Usage: bash scripts/backup-files.sh

set -e

# Configuration
BACKUP_DIR="./backups/files"
DATE=$(date +%Y%m%d_%H%M%S)
SOURCE_DIR="./storage"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup filename
BACKUP_FILE="$BACKUP_DIR/skyhouse_files_$DATE.tar.gz"

echo "======================================"
echo "Files Backup"
echo "======================================"
echo "Backup file: $BACKUP_FILE"
echo ""

# Create files backup
echo "Creating files backup..."
tar -czf "$BACKUP_FILE" \
    -C . \
    --exclude='storage/framework/cache/*' \
    --exclude='storage/framework/sessions/*' \
    --exclude='storage/framework/views/*' \
    --exclude='storage/logs/*' \
    storage/

# Check if backup was successful
if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo ""
    echo "✅ Backup completed successfully!"
    echo "   Size: $BACKUP_SIZE"
    echo "   Location: $BACKUP_FILE"
else
    echo ""
    echo "❌ Backup failed!"
    exit 1
fi

# Clean up old backups (keep last 7 days)
echo ""
echo "Cleaning up old backups (keeping last 7 days)..."
find "$BACKUP_DIR" -name "skyhouse_files_*.tar.gz" -type f -mtime +7 -delete

BACKUP_COUNT=$(ls -1 "$BACKUP_DIR" | wc -l)
echo "Current backups: $BACKUP_COUNT files"

echo ""
echo "======================================"
echo "Backup completed!"
echo "======================================"
