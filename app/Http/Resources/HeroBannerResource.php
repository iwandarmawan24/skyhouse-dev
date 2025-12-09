<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HeroBannerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Determine the image URL to use
        $imageUrl = $this->getImageUrl();

        return [
            'uid' => $this->uid ?? $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'banner_image' => $this->whenLoaded('bannerImage', function () {
                return [
                    'uid' => $this->bannerImage->uid,
                    'filename' => $this->bannerImage->filename,
                    'url' => $this->bannerImage->url,
                    'thumbnail_url' => $this->bannerImage->thumbnail_url,
                    'alt_text' => $this->bannerImage->alt_text,
                ];
            }),
            'button_text' => $this->button_text,
            'button_link' => $this->button_link,
            'is_active' => (bool) $this->is_active,
            'order' => $this->order,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Get the appropriate image URL based on image source.
     *
     * @return string|null
     */
    private function getImageUrl(): ?string
    {
        // Priority 1: Use media library image if available
        if ($this->relationLoaded('bannerImage') && $this->bannerImage) {
            return $this->bannerImage->url;
        }

        // Priority 2: Use direct upload image
        if ($this->image) {
            return str_starts_with($this->image, 'http')
                ? $this->image
                : '/storage/' . $this->image;
        }

        return null;
    }
}
