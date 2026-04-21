<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VirtualTourBannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uid' => $this->uid,
            'image_uid' => $this->image_uid,
            'image' => $this->image ? [
                'uid' => $this->image->uid,
                'filename' => $this->image->filename,
                'url' => $this->image->url,
                'thumbnail_url' => $this->image->thumbnail_url,
                'mime_type' => $this->image->mime_type,
                'size' => $this->image->size,
            ] : null,
            'image_url' => $this->image?->url,
            'url' => $this->url,
            'is_active' => $this->is_active,
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
