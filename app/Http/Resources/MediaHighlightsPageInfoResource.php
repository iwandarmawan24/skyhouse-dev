<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaHighlightsPageInfoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uid' => $this->uid,
            'banner_image_uid' => $this->banner_image_uid,
            'banner_image' => $this->bannerImage ? [
                'uid' => $this->bannerImage->uid,
                'filename' => $this->bannerImage->filename,
                'url' => $this->bannerImage->url,
                'thumbnail_url' => $this->bannerImage->thumbnail_url,
            ] : null,
            'banner_image_url' => $this->bannerImage?->url,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
