<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MilestoneResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $imageUrl = $this->getImageUrl();

        return [
            'uid' => $this->uid,
            'year' => $this->year,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'milestone_image' => $this->whenLoaded('milestoneImage', function () {
                return [
                    'uid' => $this->milestoneImage->uid,
                    'filename' => $this->milestoneImage->filename,
                    'url' => $this->milestoneImage->url,
                    'thumbnail_url' => $this->milestoneImage->thumbnail_url,
                    'alt_text' => $this->milestoneImage->alt_text,
                ];
            }),
            'order' => $this->order,
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    private function getImageUrl(): ?string
    {
        if ($this->relationLoaded('milestoneImage') && $this->milestoneImage) {
            return $this->milestoneImage->url;
        }

        if ($this->image) {
            return str_starts_with($this->image, 'http')
                ? $this->image
                : '/storage/' . $this->image;
        }

        return null;
    }
}
