# Media Library System - Implementation Guide

## Overview

Sistem Media Library ini mirip dengan WordPress Media Library yang memungkinkan:
- Upload file terpusat
- Manajemen media yang reusable
- Auto-generate image variants (thumbnail, small, medium, large)
- Media picker modal untuk select existing media
- Tracking penggunaan media
- Search & filter capabilities

## Database Schema

### Tables

1. **media_library** - Main media storage table
   - Stores file information, metadata, SEO data
   - Tracks uploader and folder organization
   - Soft deletes untuk recovery

2. **media_variants** - Image size variants
   - Auto-generated: thumbnail (150x150), small (300x300), medium (768px), large (1024px)
   - Optimized untuk different use cases

3. **mediables** - Polymorphic relationships
   - Attach media to any model (Product, Article, etc)
   - Support field names dan ordering

4. **media_usage** - Usage tracking
   - Track dimana media digunakan
   - Prevent accidental deletion
   - Analytics

## Installation & Setup

### 1. Run Migrations

```bash
php artisan migrate
```

### 2. Install Intervention Image (if not installed)

```bash
composer require intervention/image
```

### 3. Configure Storage

Pastikan storage link sudah dibuat:

```bash
php artisan storage:link
```

### 4. Routes

Routes sudah ditambahkan di `routes/web.php`:

```php
Route::prefix('media-library')->name('media-library.')->group(function () {
    Route::get('/', [MediaLibraryController::class, 'index']);
    Route::post('/upload', [MediaLibraryController::class, 'upload']);
    Route::get('/picker', [MediaLibraryController::class, 'picker']);
    // ... etc
});
```

## Usage

### Frontend - Using MediaPicker Component

#### Basic Usage (Single Image)

```jsx
import { MediaPicker } from '@/Components/MediaPicker';
import { useState } from 'react';

function ProductForm() {
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [featuredImage, setFeaturedImage] = useState(null);

    const handleMediaSelect = (media) => {
        setFeaturedImage(media);
        // media object contains: uid, url, thumbnail_url, filename, etc
    };

    return (
        <>
            <div>
                {featuredImage ? (
                    <img src={featuredImage.url} alt={featuredImage.alt_text} />
                ) : (
                    <Button onClick={() => setShowMediaPicker(true)}>
                        Select Image
                    </Button>
                )}
            </div>

            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                accept="image"
            />
        </>
    );
}
```

#### Multiple Images (Gallery)

```jsx
const [selectedImages, setSelectedImages] = useState([]);

<MediaPicker
    open={showMediaPicker}
    onClose={() => setShowMediaPicker(false)}
    onSelect={(mediaArray) => setSelectedImages(mediaArray)}
    multiple={true}
    accept="image"
/>
```

#### Props

```typescript
interface MediaPickerProps {
    open: boolean;              // Control dialog visibility
    onClose: () => void;        // Callback when closing
    onSelect: (media) => void;  // Callback when selecting media
    multiple?: boolean;         // Allow multiple selection (default: false)
    accept?: string;            // 'image' | 'video' | 'document' (default: 'image')
    folder?: string;            // Organize uploads in folders
}
```

### Backend - Using MediaService

#### Upload Media

```php
use App\Services\MediaService;

class ProductController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    public function store(Request $request)
    {
        // Upload single file
        if ($request->hasFile('image')) {
            $media = $this->mediaService->upload($request->file('image'), [
                'folder' => 'products',
                'alt_text' => $request->name,
                'caption' => 'Product image',
            ]);

            // Save media UID instead of filepath
            $product->featured_image_uid = $media->uid;
        }

        // Upload multiple files
        if ($request->hasFile('gallery')) {
            $mediaItems = $this->mediaService->uploadMultiple(
                $request->file('gallery'),
                ['folder' => 'products/gallery']
            );

            // Save as JSON array of UIDs
            $product->gallery_uids = collect($mediaItems)->pluck('uid')->toArray();
        }
    }
}
```

#### Track Media Usage

```php
// When using media in a model
$this->mediaService->trackUsage(
    $media,
    'Product',
    $product->uid,
    'featured_image'
);
```

#### Delete Media

```php
// Safe delete (checks if in use)
$this->mediaService->delete($media);

// Force delete (ignore usage)
$this->mediaService->delete($media, force: true);
```

#### Replace Media

```php
// Replace file but keep same UID (useful for updates)
$updatedMedia = $this->mediaService->replace($media, $newFile);
```

### Model Integration

#### Add MediaLibrary Relationship

```php
use App\Models\MediaLibrary;

class Product extends Model
{
    // Single media relationship
    public function featuredImage()
    {
        return $this->belongsTo(MediaLibrary::class, 'featured_image_uid', 'uid');
    }

    // Multiple media via JSON
    public function getGalleryImagesAttribute()
    {
        if (empty($this->gallery_uids)) {
            return collect();
        }

        return MediaLibrary::whereIn('uid', $this->gallery_uids)
            ->orderByRaw('array_position(?, uid::text)', [$this->gallery_uids])
            ->get();
    }
}
```

## Migration dari Existing Code

### Before (Old Way)

```php
// Controller
if ($request->hasFile('image')) {
    $imagePath = $request->file('image')->store('products', 'public');
    $validated['image'] = $imagePath;
}

// Delete
if ($product->image) {
    Storage::disk('public')->delete($product->image);
}
```

### After (New Way)

```php
// Controller
if ($request->hasFile('image')) {
    $media = $this->mediaService->upload($request->file('image'), [
        'folder' => 'products',
        'alt_text' => $request->name,
    ]);
    $validated['featured_image_uid'] = $media->uid;
}

// Delete (automatic via usage tracking)
$this->mediaService->delete($media); // Will warn if in use
```

## Migration Steps for Existing Components

### 1. Products (PRIORITY)

#### Database Changes
```php
// Add migration
Schema::table('products', function (Blueprint $table) {
    $table->uuid('featured_image_uid')->nullable()->after('image');
    $table->foreign('featured_image_uid')->references('uid')->on('media_library');
    $table->json('gallery_uids')->nullable()->after('images');
});
```

#### Controller Updates
```php
// Replace ProductController upload logic
public function store(Request $request)
{
    // Old: $imagePath = $request->file('image')->store(...)
    // New:
    $media = $this->mediaService->upload($request->file('image'), [
        'folder' => 'products',
        'alt_text' => $validated['name'],
    ]);
    $validated['featured_image_uid'] = $media->uid;
}
```

#### Frontend Updates
```jsx
// Replace file input with MediaPicker
import { MediaPicker } from '@/Components/MediaPicker';

// Add state
const [showMediaPicker, setShowMediaPicker] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

// Replace input
<MediaPicker
    open={showMediaPicker}
    onClose={() => setShowMediaPicker(false)}
    onSelect={(media) => {
        setSelectedImage(media);
        setData('featured_image_uid', media.uid);
    }}
    accept="image"
    folder="products"
/>
```

### 2. Articles

Same pattern as Products:
- Add `featured_image_uid` column
- Update ArticleController
- Replace file input with MediaPicker
- Update Article model relationships

### 3. HeroBanners

Same pattern as Products

### 4. MediaHighlights

Same pattern as Products

## Benefits

### ✅ Reusability
- Upload once, use everywhere
- No duplicate files
- Centralized media management

### ✅ Performance
- Auto-optimized variants
- Lazy loading support
- CDN-ready structure

### ✅ Organization
- Folder structure
- Tagging system
- Search & filter

### ✅ Safety
- Usage tracking prevents accidental deletion
- Soft deletes for recovery
- File validation

### ✅ SEO
- Alt text untuk images
- Captions and descriptions
- Metadata storage

## Image Variants

Auto-generated sizes:

| Variant | Dimensions | Use Case |
|---------|-----------|----------|
| thumbnail | 150x150 (crop) | Admin grid, small previews |
| small | 300x300 (contain) | Cards, thumbnails |
| medium | 768px width | Mobile displays |
| large | 1024px width | Desktop displays |
| original | Full size | High-res needs |

Access variants:
```php
$media->url                    // Original
$media->thumbnail_url          // Thumbnail (150x150)
$media->variant('small')->url  // Specific variant
```

## API Endpoints

```
GET    /admin/media-library              - List media with filters
POST   /admin/media-library/upload       - Upload files
GET    /admin/media-library/picker       - Media picker data
GET    /admin/media-library/{uid}        - Get single media
PATCH  /admin/media-library/{uid}        - Update metadata
POST   /admin/media-library/{uid}/replace - Replace file
DELETE /admin/media-library/{uid}        - Delete media
POST   /admin/media-library/bulk-delete  - Bulk delete
```

## Advanced Features

### Custom Variant Sizes

```php
// In MediaService or AppServiceProvider
$mediaService->setVariantConfig([
    'hero' => ['width' => 1920, 'height' => 1080, 'fit' => 'crop'],
    'social' => ['width' => 1200, 'height' => 630, 'fit' => 'crop'],
]);
```

### Folder Organization

```php
// Upload to specific folder
$media = $mediaService->upload($file, [
    'folder' => 'products/featured',
]);

// Filter by folder
MediaLibrary::where('folder', 'products/featured')->get();
```

### Metadata & Tags

```php
$media->update([
    'tags' => ['featured', 'homepage', 'banner'],
    'metadata' => [
        'photographer' => 'John Doe',
        'location' => 'Jakarta',
    ],
]);
```

## Troubleshooting

### Images not showing
- Check storage link: `php artisan storage:link`
- Verify file permissions on `storage/app/public`
- Check `APP_URL` in `.env`

### Upload fails
- Check `upload_max_filesize` in php.ini
- Verify disk space
- Check file permissions

### Variants not generating
- Install Intervention Image: `composer require intervention/image`
- Check GD or Imagick extension installed
- Verify memory limit for large images

## Next Steps

1. Run migrations
2. Update ProductController to use MediaService
3. Replace product form upload with MediaPicker
4. Test upload and selection
5. Apply same pattern to Articles, HeroBanners, etc
6. Migrate existing files to media library (optional)

## Support

For issues or questions:
1. Check this documentation
2. Review MediaService.php for available methods
3. Check MediaLibraryController for API endpoints
4. Review MediaPicker.jsx for component usage
