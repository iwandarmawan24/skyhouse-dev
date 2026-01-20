<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\InstagramGallery;
use Illuminate\Http\JsonResponse;

class InstagramGalleryController extends Controller
{
    /**
     * Get active Instagram gallery images for frontend display
     */
    public function index(): JsonResponse
    {
        // Get all 6 positions, returning image URLs
        $images = [];
        for ($i = 1; $i <= 6; $i++) {
            $gallery = InstagramGallery::with('mediaImage')
                ->where('position', $i)
                ->where('is_active', true)
                ->first();

            $images[] = $gallery?->image_url;
        }

        return response()->json([
            'success' => true,
            'data' => $images,
        ]);
    }
}
