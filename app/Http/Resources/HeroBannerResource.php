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
        // Determine the image URLs to use
        $imageUrl = $this->getImageUrl();
        $mobileImageUrl = $this->getMobileImageUrl();

        return [
            'uid' => $this->uid ?? $this->id,
            'image' => $this->image,
            'image_uid' => $this->image_uid,
            'image_url' => $imageUrl,
            'mobile_image' => $this->mobile_image,
            'mobile_image_uid' => $this->mobile_image_uid,
            'mobile_image_url' => $mobileImageUrl,
            'banner_image' => $this->whenLoaded('bannerImage', function () {
                return [
                    'uid' => $this->bannerImage->uid,
                    'filename' => $this->bannerImage->filename,
                    'url' => $this->bannerImage->url,
                    'thumbnail_url' => $this->bannerImage->thumbnail_url,
                    'alt_text' => $this->bannerImage->alt_text,
                ];
            }),
            'mobile_banner_image' => $this->whenLoaded('mobileBannerImage', function () {
                return [
                    'uid' => $this->mobileBannerImage->uid,
                    'filename' => $this->mobileBannerImage->filename,
                    'url' => $this->mobileBannerImage->url,
                    'thumbnail_url' => $this->mobileBannerImage->thumbnail_url,
                    'alt_text' => $this->mobileBannerImage->alt_text,
                ];
            }),
            'banner_link' => $this->banner_link,
            'is_active' => (bool) $this->is_active,
            'order' => $this->order,
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
        if ($this->relationLoaded('bannerImage') && $this->bannerImage) {
            return $this->bannerImage->url;
        }

        // Priority 2: Use direct upload image
        if ($this->image) {
            return str_starts_with($this->image, 'http')
                ? $this->image
                : '/storage/' . $this->image;
        }

        return null;
    }

    /**
     * Get the appropriate mobile image URL based on image source.
     */
    private function getMobileImageUrl(): ?string
    {
        // Priority 1: Use media library mobile image if available
        if ($this->relationLoaded('mobileBannerImage') && $this->mobileBannerImage) {
            return $this->mobileBannerImage->url;
        }

        // Priority 2: Use direct upload mobile image
        if ($this->mobile_image) {
            return str_starts_with($this->mobile_image, 'http')
                ? $this->mobile_image
                : '/storage/' . $this->mobile_image;
        }

        return null;
    }
}
