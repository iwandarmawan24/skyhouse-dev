<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AwardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $imageUrl = $this->getImageUrl();

        return [
            'uid' => $this->uid ?? $this->id,
            'image' => $this->image,
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'award_image' => $this->whenLoaded('awardImage', function () {
                return [
                    'uid' => $this->awardImage->uid,
                    'filename' => $this->awardImage->filename,
                    'url' => $this->awardImage->url,
                    'thumbnail_url' => $this->awardImage->thumbnail_url,
                    'alt_text' => $this->awardImage->alt_text,
                ];
            }),
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    private function getImageUrl(): ?string
    {
        if ($this->relationLoaded('awardImage') && $this->awardImage) {
            return $this->awardImage->url;
        }

        if ($this->image) {
            return str_starts_with($this->image, 'http')
                ? $this->image
                : '/storage/' . $this->image;
        }

        return null;
    }
}
