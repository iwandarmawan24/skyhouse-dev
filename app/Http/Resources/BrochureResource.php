<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrochureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uid' => $this->uid,
            'file_uid' => $this->file_uid,
            'file' => $this->file ? [
                'uid' => $this->file->uid,
                'filename' => $this->file->filename,
                'url' => $this->file->url,
                'thumbnail_url' => $this->file->thumbnail_url,
                'mime_type' => $this->file->mime_type,
                'size' => $this->file->size,
            ] : null,
            'file_url' => $this->file?->url,
            'is_active' => $this->is_active,
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
