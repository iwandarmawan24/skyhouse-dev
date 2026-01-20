<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    /**
     * Display the facilities page with active facilities
     */
    public function index(): Response
    {
        $facilities = Facility::active()
            ->ordered()
            ->get()
            ->map(function ($facility) {
                // Get first image from media_images for card display
                $firstImage = $facility->media_images->first();

                return [
                    'id' => $facility->uid,
                    'image' => $firstImage?->url ?? $facility->banner_image,
                    'title' => $facility->name,
                    'description' => $facility->description,
                    'icon' => $facility->icon,
                    'slug' => $facility->slug,
                ];
            });

        return Inertia::render('Facilities', [
            'facilities' => $facilities,
        ]);
    }
}
