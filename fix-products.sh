#!/bin/bash

# Script to fix corrupted product data
# Run this with: bash fix-products.sh

echo "Fixing corrupted product data..."

# Option 1: Fresh migration (WARNING: This will delete ALL data)
# php artisan migrate:fresh --seed

# Option 2: Just reseed products (recommended)
php artisan db:seed --class=ProductSeeder

echo "Done! Products should now be fixed."
echo "Total products in database:"
php artisan tinker --execute="echo App\Models\Product::count();"
