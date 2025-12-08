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
        return [
            'uid' => $this->uid ?? $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'button_text' => $this->button_text,
            'button_link' => $this->button_link,
            'is_active' => (bool) $this->is_active,
            'order' => $this->order,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
