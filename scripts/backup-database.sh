#!/bin/bash

# Database backup script for SkyHouse CMS
# Creates a PostgreSQL dump with timestamp
# Usage: bash scripts/backup-database.sh

set -e

# Configuration
BACKUP_DIR="./backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
CONTAINER_NAME="skyhouse-postgres"

# Load environment variables
if [ -f .env.production ]; then
    set -a
    source .env.production
    set +a
else
    echo "Error: .env.production not found"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup filename
BACKUP_FILE="$BACKUP_DIR/skyhouse_db_$DATE.sql.gz"

echo "======================================"
echo "Database Backup"
echo "======================================"
echo "Backup file: $BACKUP_FILE"
echo ""

# Create database backup
echo "Creating database backup..."
docker exec -t $CONTAINER_NAME pg_dump -U $DB_USERNAME $DB_DATABASE | gzip > "$BACKUP_FILE"

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
find "$BACKUP_DIR" -name "skyhouse_db_*.sql.gz" -type f -mtime +7 -delete

BACKUP_COUNT=$(ls -1 "$BACKUP_DIR" | wc -l)
echo "Current backups: $BACKUP_COUNT files"

echo ""
echo "======================================"
echo "Backup completed!"
echo "======================================"
