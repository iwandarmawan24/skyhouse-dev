<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationMapResource extends JsonResource
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
            'image' => $this->image,
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'map_image' => $this->whenLoaded('mapImage', function () {
                return [
                    'uid' => $this->mapImage->uid,
                    'filename' => $this->mapImage->filename,
                    'url' => $this->mapImage->url,
                    'thumbnail_url' => $this->mapImage->thumbnail_url,
                    'alt_text' => $this->mapImage->alt_text,
                ];
            }),
            'google_maps_link' => $this->google_maps_link,
            'is_active' => (bool) $this->is_active,
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
        if ($this->relationLoaded('mapImage') && $this->mapImage) {
            return $this->mapImage->url;
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
