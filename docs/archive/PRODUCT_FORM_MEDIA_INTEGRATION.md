# Product Form - MediaPicker Integration Example

## Quick Integration Guide

Berikut cara mengintegrasikan MediaPicker ke Product Form:

### 1. Import MediaPicker Component

```jsx
import { MediaPicker } from '@/Components/MediaPicker';
```

### 2. Add State untuk MediaPicker

```jsx
const [showMediaPicker, setShowMediaPicker] = useState(false);
const [mediaPickerMode, setMediaPickerMode] = useState('featured'); // 'featured' atau 'gallery'
```

### 3. Update useForm data

```jsx
const { data, setData, post, processing, errors } = useForm({
    // ... existing fields
    featured_image_uid: product?.featured_image_uid || null,
    gallery_uids: product?.gallery_uids || [],
    _method: isEdit ? 'PUT' : 'POST',
});
```

### 4. Add State untuk Preview

```jsx
const [featuredImagePreview, setFeaturedImagePreview] = useState(product?.featured_image || null);
const [galleryPreviews, setGalleryPreviews] = useState(product?.gallery_images || []);
```

### 5. Replace File Input dengan MediaPicker Button

#### Featured Image

```jsx
{/* OLD WAY - File Input */}
<input
    type="file"
    onChange={handleImageChange}
    accept="image/*"
/>

{/* NEW WAY - MediaPicker */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Featured Image
    </label>

    {featuredImagePreview ? (
        <div className="relative inline-block">
            <img
                src={featuredImagePreview.url || featuredImagePreview.thumbnail_url}
                alt="Featured"
                className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300"
            />
            <button
                type="button"
                onClick={() => {
                    setFeaturedImagePreview(null);
                    setData('featured_image_uid', null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    ) : (
        <button
            type="button"
            onClick={() => {
                setMediaPickerMode('featured');
                setShowMediaPicker(true);
            }}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
        >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Click to select image</p>
        </button>
    )}
</div>
```

#### Gallery Images

```jsx
<div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Gallery Images
    </label>

    {/* Preview Grid */}
    <div className="grid grid-cols-4 gap-4 mb-4">
        {galleryPreviews.map((image, index) => (
            <div key={index} className="relative">
                <img
                    src={image.thumbnail_url || image.url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                    type="button"
                    onClick={() => {
                        const newGallery = galleryPreviews.filter((_, i) => i !== index);
                        setGalleryPreviews(newGallery);
                        setData('gallery_uids', newGallery.map(img => img.uid));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        ))}

        {/* Add More Button */}
        <button
            type="button"
            onClick={() => {
                setMediaPickerMode('gallery');
                setShowMediaPicker(true);
            }}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
        >
            <Plus className="h-8 w-8 text-gray-400" />
            <p className="text-xs text-gray-600 mt-1">Add Images</p>
        </button>
    </div>
</div>
```

### 6. Add MediaPicker Component

```jsx
<MediaPicker
    open={showMediaPicker}
    onClose={() => setShowMediaPicker(false)}
    onSelect={(media) => {
        if (mediaPickerMode === 'featured') {
            // Single image for featured
            setFeaturedImagePreview(media);
            setData('featured_image_uid', media.uid);
        } else {
            // Multiple images for gallery
            const newGallery = [...galleryPreviews, ...media];
            setGalleryPreviews(newGallery);
            setData('gallery_uids', newGallery.map(img => img.uid));
        }
        setShowMediaPicker(false);
    }}
    multiple={mediaPickerMode === 'gallery'}
    accept="image"
    folder="products"
/>
```

### 7. Update Controller Store/Update Method

Controller akan otomatis menerima `featured_image_uid` dan `gallery_uids` karena sudah ada di fillable.

Jika ingin track usage:

```php
public function store(Request $request)
{
    $validated = $request->validate([
        // ... other fields
        'featured_image_uid' => 'nullable|exists:media_library,uid',
        'gallery_uids' => 'nullable|array',
        'gallery_uids.*' => 'exists:media_library,uid',
    ]);

    $product = Product::create($validated);

    // Track media usage
    if ($validated['featured_image_uid']) {
        $this->mediaService->trackUsage(
            MediaLibrary::find($validated['featured_image_uid']),
            'Product',
            $product->uid,
            'featured_image'
        );
    }

    return redirect()->route('admin.products.index')
        ->with('success', 'Product created successfully');
}
```

## Complete Component Example

Buat file baru untuk contoh lengkap:
`resources/js/Pages/Admin/Products/FormWithMedia.jsx`

```jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { MediaPicker } from '@/Components/MediaPicker';
import { Upload, X, Plus } from 'lucide-react';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Label } from '@/Components/ui/Label';
import { Textarea } from '@/Components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/Card';

export default function FormWithMedia({ product }) {
    const isEdit = product !== null;

    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        type: product?.type || 'house',
        description: product?.description || '',
        price: product?.price || '',
        // ... other fields
        featured_image_uid: product?.featured_image_uid || null,
        gallery_uids: product?.gallery_uids || [],
        _method: isEdit ? 'PUT' : 'POST',
    });

    // MediaPicker state
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [mediaPickerMode, setMediaPickerMode] = useState('featured');

    // Preview state
    const [featuredImagePreview, setFeaturedImagePreview] = useState(product?.featured_image || null);
    const [galleryPreviews, setGalleryPreviews] = useState(product?.gallery_images || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/products/${product.uid}` : '/admin/products';
        post(url);
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                            />
                        </div>

                        {/* More fields... */}
                    </CardContent>
                </Card>

                {/* Media Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Featured Image */}
                        <div>
                            <Label>Featured Image</Label>
                            {featuredImagePreview ? (
                                <div className="relative inline-block mt-2">
                                    <img
                                        src={featuredImagePreview.url || featuredImagePreview.thumbnail_url}
                                        alt="Featured"
                                        className="w-48 h-48 object-cover rounded-lg border-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFeaturedImagePreview(null);
                                            setData('featured_image_uid', null);
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaPickerMode('featured');
                                        setShowMediaPicker(true);
                                    }}
                                    className="mt-2 border-2 border-dashed rounded-lg p-8 w-48 h-48 flex flex-col items-center justify-center hover:border-primary"
                                >
                                    <Upload className="h-12 w-12 text-muted-foreground" />
                                    <p className="mt-2 text-sm">Select Image</p>
                                </button>
                            )}
                        </div>

                        {/* Gallery */}
                        <div>
                            <Label>Gallery Images</Label>
                            <div className="grid grid-cols-4 gap-4 mt-2">
                                {galleryPreviews.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.thumbnail_url || image.url}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full aspect-square object-cover rounded-lg border-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newGallery = galleryPreviews.filter((_, i) => i !== index);
                                                setGalleryPreviews(newGallery);
                                                setData('gallery_uids', newGallery.map(img => img.uid));
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaPickerMode('gallery');
                                        setShowMediaPicker(true);
                                    }}
                                    className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center hover:border-primary"
                                >
                                    <Plus className="h-8 w-8 text-muted-foreground" />
                                    <p className="text-xs mt-1">Add</p>
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex gap-4">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/admin/products">Cancel</Link>
                    </Button>
                </div>
            </form>

            {/* MediaPicker Modal */}
            <MediaPicker
                open={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(media) => {
                    if (mediaPickerMode === 'featured') {
                        setFeaturedImagePreview(media);
                        setData('featured_image_uid', media.uid);
                    } else {
                        const mediaArray = Array.isArray(media) ? media : [media];
                        const newGallery = [...galleryPreviews, ...mediaArray];
                        setGalleryPreviews(newGallery);
                        setData('gallery_uids', newGallery.map(img => img.uid));
                    }
                    setShowMediaPicker(false);
                }}
                multiple={mediaPickerMode === 'gallery'}
                accept="image"
                folder="products"
            />
        </AdminLayout>
    );
}
```

## Benefits

✅ **Reusable Media** - Upload once, use everywhere
✅ **Better UX** - Modal picker dengan preview
✅ **Organized** - All media in one place
✅ **Optimized** - Auto-generated thumbnails
✅ **Searchable** - Find media easily
✅ **Trackable** - Know where media is used

## Next Steps

1. Run migrations
2. Test MediaPicker in Product form
3. Apply same pattern to:
   - Articles (`featured_image_uid`)
   - HeroBanners (`image_uid`)
   - MediaHighlights (`image_uid`)
   - Events (`banner_uid`, `gallery_uids`)
   - Facilities (`images_uids`)

## Migration dari Old to New

Kalau mau migrate existing images:

```php
// Artisan command untuk migrate existing product images
php artisan make:command MigrateProductImagesToMediaLibrary

// In command:
$products = Product::whereNotNull('primary_image')->get();

foreach ($products as $product) {
    // Upload existing image to media library
    $filePath = storage_path('app/public/' . $product->primary_image);

    if (file_exists($filePath)) {
        $file = new \Illuminate\Http\UploadedFile($filePath, basename($filePath));
        $media = $mediaService->upload($file, [
            'folder' => 'products',
            'alt_text' => $product->name,
        ]);

        $product->update(['featured_image_uid' => $media->uid]);
    }
}
```
