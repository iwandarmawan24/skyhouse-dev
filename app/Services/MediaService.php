<?php

namespace App\Services;

use App\Models\MediaLibrary;
use App\Models\MediaVariant;
use App\Models\MediaUsage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MediaService
{
    protected ImageManager $imageManager;

    // Image variants configuration
    protected array $imageVariants = [
        'thumbnail' => ['width' => 150, 'height' => 150, 'fit' => 'crop'],
        'small' => ['width' => 300, 'height' => 300, 'fit' => 'contain'],
        'medium' => ['width' => 768, 'height' => null, 'fit' => 'contain'],
        'large' => ['width' => 1024, 'height' => null, 'fit' => 'contain'],
    ];

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
    }

    /**
     * Upload and process a file
     */
    public function upload(UploadedFile $file, array $options = []): MediaLibrary
    {
        $disk = $options['disk'] ?? 'public';
        $folder = $options['folder'] ?? null;

        // Generate unique filename
        $filename = $this->generateFilename($file);
        $year = date('Y');
        $month = date('m');
        $path = "media/{$year}/{$month}/{$filename}";

        // Store file
        $file->storeAs(dirname($path), basename($path), $disk);

        // Determine file type
        $fileType = $this->determineFileType($file->getMimeType());

        // Get image dimensions if it's an image
        $dimensions = null;
        if ($fileType === 'image') {
            $dimensions = $this->getImageDimensions($file);
        }

        // Create media record
        $media = MediaLibrary::create([
            'filename' => $file->getClientOriginalName(),
            'filepath' => $path,
            'file_type' => $fileType,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'disk' => $disk,
            'width' => $dimensions['width'] ?? null,
            'height' => $dimensions['height'] ?? null,
            'alt_text' => $options['alt_text'] ?? null,
            'caption' => $options['caption'] ?? null,
            'description' => $options['description'] ?? null,
            'folder' => $folder,
            'tags' => $options['tags'] ?? null,
            'uploaded_by' => auth()->id(),
        ]);

        // Generate variants for images
        if ($fileType === 'image') {
            $this->generateVariants($media, $file, $disk);
        }

        return $media->fresh(['variants', 'uploader']);
    }

    /**
     * Upload multiple files
     */
    public function uploadMultiple(array $files, array $options = []): array
    {
        $uploadedMedia = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploadedMedia[] = $this->upload($file, $options);
            }
        }

        return $uploadedMedia;
    }

    /**
     * Generate image variants (thumbnails, different sizes)
     */
    protected function generateVariants(MediaLibrary $media, UploadedFile $file, string $disk): void
    {
        $image = $this->imageManager->read($file->getRealPath());

        foreach ($this->imageVariants as $variantName => $config) {
            $variantImage = clone $image;

            // Resize based on configuration
            if ($config['fit'] === 'crop') {
                $variantImage->cover($config['width'], $config['height']);
            } else {
                if ($config['height']) {
                    $variantImage->scale($config['width'], $config['height']);
                } else {
                    $variantImage->scaleDown($config['width']);
                }
            }

            // Generate variant filename
            $pathInfo = pathinfo($media->filepath);
            $variantFilename = $pathInfo['filename'] . "_{$variantName}." . $pathInfo['extension'];
            $variantPath = $pathInfo['dirname'] . '/' . $variantFilename;

            // Save variant
            $encoded = $variantImage->toJpeg(quality: 85);
            Storage::disk($disk)->put($variantPath, $encoded);

            // Create variant record
            MediaVariant::create([
                'media_uid' => $media->uid,
                'variant_name' => $variantName,
                'filepath' => $variantPath,
                'width' => $variantImage->width(),
                'height' => $variantImage->height(),
                'file_size' => strlen($encoded),
                'mime_type' => 'image/jpeg',
            ]);
        }
    }

    /**
     * Update media metadata
     */
    public function updateMetadata(MediaLibrary $media, array $data): MediaLibrary
    {
        $media->update([
            'alt_text' => $data['alt_text'] ?? $media->alt_text,
            'caption' => $data['caption'] ?? $media->caption,
            'description' => $data['description'] ?? $media->description,
            'folder' => $data['folder'] ?? $media->folder,
            'tags' => $data['tags'] ?? $media->tags,
        ]);

        return $media->fresh();
    }

    /**
     * Track media usage
     */
    public function trackUsage(MediaLibrary $media, string $usedInType, string $usedInUid, ?string $field = null): void
    {
        MediaUsage::updateOrCreate(
            [
                'media_uid' => $media->uid,
                'used_in_type' => $usedInType,
                'used_in_uid' => $usedInUid,
                'used_in_field' => $field,
            ],
            [
                'last_used_at' => now(),
            ]
        );
    }

    /**
     * Delete media and all its files
     */
    public function delete(MediaLibrary $media, bool $force = false): bool
    {
        // Check if media is in use
        if (!$force && $media->isInUse()) {
            throw new \Exception('Media is being used and cannot be deleted. Use force delete to override.');
        }

        // Delete will trigger model event to delete files
        return $media->delete();
    }

    /**
     * Replace media file (keep same record, update file)
     */
    public function replace(MediaLibrary $media, UploadedFile $newFile): MediaLibrary
    {
        // Delete old files
        $media->deleteFiles();

        // Upload new file to same path structure
        $year = date('Y');
        $month = date('m');
        $filename = $this->generateFilename($newFile);
        $path = "media/{$year}/{$month}/{$filename}";

        $newFile->storeAs(dirname($path), basename($path), $media->disk);

        // Get new dimensions
        $dimensions = $this->getImageDimensions($newFile);

        // Update media record
        $media->update([
            'filename' => $newFile->getClientOriginalName(),
            'filepath' => $path,
            'mime_type' => $newFile->getMimeType(),
            'file_size' => $newFile->getSize(),
            'width' => $dimensions['width'] ?? null,
            'height' => $dimensions['height'] ?? null,
        ]);

        // Delete old variants
        $media->variants()->delete();

        // Generate new variants
        if ($media->file_type === 'image') {
            $this->generateVariants($media, $newFile, $media->disk);
        }

        return $media->fresh(['variants']);
    }

    /**
     * Generate unique filename
     */
    protected function generateFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        return Str::random(40) . '.' . $extension;
    }

    /**
     * Determine file type from MIME type
     */
    protected function determineFileType(string $mimeType): string
    {
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        }

        if (str_starts_with($mimeType, 'video/')) {
            return 'video';
        }

        if (str_starts_with($mimeType, 'audio/')) {
            return 'audio';
        }

        $documentTypes = ['pdf', 'msword', 'document', 'sheet', 'presentation'];
        foreach ($documentTypes as $type) {
            if (str_contains($mimeType, $type)) {
                return 'document';
            }
        }

        return 'other';
    }

    /**
     * Get image dimensions
     */
    protected function getImageDimensions(UploadedFile $file): ?array
    {
        try {
            $image = $this->imageManager->read($file->getRealPath());
            return [
                'width' => $image->width(),
                'height' => $image->height(),
            ];
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get variant configuration
     */
    public function getVariantConfig(): array
    {
        return $this->imageVariants;
    }

    /**
     * Set custom variant configuration
     */
    public function setVariantConfig(array $config): void
    {
        $this->imageVariants = array_merge($this->imageVariants, $config);
    }
}
