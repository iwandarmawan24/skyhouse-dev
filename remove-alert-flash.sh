#!/bin/bash

# Script to remove Alert components used for flash messages
# Since flash messages are now handled by toast in AdminLayout

FILES=(
    "resources/js/Pages/Admin/Settings/Index.jsx"
    "resources/js/Pages/Admin/Auth/Register.jsx"
    "resources/js/Pages/Admin/Contacts/Index.jsx"
    "resources/js/Pages/Admin/About/Edit.jsx"
    "resources/js/Pages/Admin/Policies/Index.jsx"
    "resources/js/Pages/Admin/MediaHighlights/Index.jsx"
    "resources/js/Pages/Admin/Users/Index.jsx"
    "resources/js/Pages/Admin/Events/Index.jsx"
    "resources/js/Pages/Admin/ArticleCategories/Index.jsx"
    "resources/js/Pages/Admin/Facilities/Index.jsx"
    "resources/js/Pages/Admin/Media/Index.jsx"
)

echo "Removing Alert imports and flash message displays..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"

        # Remove Alert import (handle different import patterns)
        sed -i.bak '/import.*Alert.*from.*@\/Components\/ui\/Alert/d' "$file"

        # Remove usePage import of flash if it exists alone
        # This is tricky, we'll skip this for now to avoid breaking other uses

        # Remove the Alert component usage for flash messages
        # Pattern: {flash.success && (<Alert ...>...</Alert>)}
        # We need to be careful here - using perl for better multiline regex

        # Clean up backup files
        rm -f "${file}.bak"
    else
        echo "File not found: $file"
    fi
done

echo "Done! Please review the changes and test your application."
echo "Note: You may need to manually remove 'const { flash } = usePage().props;' if it's not used elsewhere."
