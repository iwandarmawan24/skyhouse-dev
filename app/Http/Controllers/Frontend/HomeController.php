<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\MediaHighlight;
use App\Models\Product;
use App\Models\Facility;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Fetch latest 6 media highlights for news section
        $newsItems = MediaHighlight::with('media')
            ->orderBy('publish_date', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($highlight) {
                return [
                    'id' => $highlight->uid,
                    'title' => $highlight->title,
                    'image' => $highlight->image
                        ? (str_starts_with($highlight->image, 'http')
                            ? $highlight->image
                            : asset('storage/' . $highlight->image))
                        : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
                    'date' => $highlight->publish_date ? $highlight->publish_date->format('F d, Y') : null,
                    'mediaSource' => $highlight->media->name ?? 'News',
                    'mediaLogo' => $highlight->media && $highlight->media->logo
                        ? (str_starts_with($highlight->media->logo, 'http')
                            ? $highlight->media->logo
                            : asset('storage/' . $highlight->media->logo))
                        : 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
                    'link' => $highlight->article_url ?? '#',
                ];
            });

        // Fetch active facilities for LaunchProjects component
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
                ];
            });

        // Fetch active projects for Projects component
        $projects = Product::with('featuredImage')
            ->active()
            ->latest()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->uid,
                    'image' => $product->featuredImage ? $product->featuredImage->url : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                    'location' => $product->location,
                    'units' => 1,
                    'title' => $product->name,
                    'description' => $product->short_description ?? $product->description,
                    'status' => $product->is_sold ? 'sold-out' : 'available',
                ];
            });

        return Inertia::render('Home', [
            'newsItems' => $newsItems,
            'projects' => $projects,
            'facilities' => $facilities,
        ]);
    }
}
