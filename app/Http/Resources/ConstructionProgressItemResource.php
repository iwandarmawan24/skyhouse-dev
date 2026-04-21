<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConstructionProgressItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $imageUrl = $this->getImageUrl();

        return [
            'uid' => $this->uid,
            'construction_progress_uid' => $this->construction_progress_uid,
            'progress_date' => $this->progress_date?->format('Y-m-d'),
            'progress_month' => $this->progress_date?->format('F Y'),
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'title' => $this->title,
            'description' => $this->description,
            'item_image' => $this->whenLoaded('itemImage', function () {
                return [
                    'uid' => $this->itemImage->uid,
                    'filename' => $this->itemImage->filename,
                    'url' => $this->itemImage->url,
                    'thumbnail_url' => $this->itemImage->thumbnail_url,
                    'alt_text' => $this->itemImage->alt_text,
                ];
            }),
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    private function getImageUrl(): ?string
    {
        if ($this->relationLoaded('itemImage') && $this->itemImage) {
            return $this->itemImage->url;
        }

        return null;
    }
}
