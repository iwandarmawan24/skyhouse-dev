<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConstructionProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrl = $this->getImageUrl();

        return [
            'uid' => $this->uid ?? $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'progress_image' => $this->whenLoaded('progressImage', function () {
                return [
                    'uid' => $this->progressImage->uid,
                    'filename' => $this->progressImage->filename,
                    'url' => $this->progressImage->url,
                    'thumbnail_url' => $this->progressImage->thumbnail_url,
                    'alt_text' => $this->progressImage->alt_text,
                ];
            }),
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
        if ($this->relationLoaded('progressImage') && $this->progressImage) {
            return $this->progressImage->url;
        }

        if ($this->image) {
            return str_starts_with($this->image, 'http')
                ? $this->image
                : '/storage/' . $this->image;
        }

        return null;
    }
}
