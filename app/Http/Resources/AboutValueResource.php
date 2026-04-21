<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutValueResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uid' => $this->uid,
            'icon_emoji' => $this->icon_emoji,
            'icon_uid' => $this->icon_uid,
            'icon_url' => $this->iconImage?->url,
            'icon_image' => $this->whenLoaded('iconImage', function () {
                if (!$this->iconImage) {
                    return null;
                }
                return [
                    'uid' => $this->iconImage->uid,
                    'filename' => $this->iconImage->filename,
                    'url' => $this->iconImage->url,
                    'thumbnail_url' => $this->iconImage->thumbnail_url,
                ];
            }),
            'title' => $this->title,
            'description' => $this->description,
            'order' => $this->order,
            'is_active' => (bool) $this->is_active,
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
