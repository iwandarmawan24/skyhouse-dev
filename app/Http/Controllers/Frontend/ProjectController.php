<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProjectPageInfo;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Fetch active products (projects) from database — include sold, just mark as Not Available
        $projects = Product::with('featuredImage')
            ->where('is_active', true)
            ->latest()
            ->get()
            ->map(function ($product) {
                $status = $product->is_sold ? 'Not Available' : 'Available';

                // Build gallery: featured first, then gallery images
                $gallery = $product->gallery_images->map(fn($m) => $m->url)->toArray();
                $featuredUrl = $product->featuredImage ? $product->featuredImage->url : null;
                if ($featuredUrl && !in_array($featuredUrl, $gallery)) {
                    array_unshift($gallery, $featuredUrl);
                }
                if (empty($gallery)) {
                    $gallery = [
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
                    ];
                }

                return [
                    'id' => $product->uid,
                    'image' => $gallery[0],
                    'gallery' => $gallery,
                    'location' => $product->location,
                    'units' => 1,
                    'title' => $product->name,
                    'short_description' => $product->short_description,
                    'description' => $product->description,
                    'status' => $status,
                    'category' => $product->type,
                    'type' => $status,
                ];
            });

        // Get featured project for hero section
        $featuredProject = Product::with('featuredImage')
            ->active()
            ->featured()
            ->latest()
            ->first();

        // If no featured project exists, use the first available project
        if (!$featuredProject && $projects->isNotEmpty()) {
            $featuredProject = Product::with('featuredImage')
                ->active()
                ->latest()
                ->first();
        }

        // Format featured project for frontend
        $featuredProjectData = $featuredProject ? [
            'id' => $featuredProject->uid,
            'image' => $featuredProject->featuredImage ? $featuredProject->featuredImage->url : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
            'category' => ucfirst($featuredProject->type),
            'status' => $featuredProject->is_sold ? 'Not Available' : 'Available',
            'title' => $featuredProject->name,
            'short_description' => $featuredProject->short_description,
            'description' => $featuredProject->description,
            'location' => $featuredProject->location,
            'units' => 1, // Products don't have units field
        ] : null;

        // Project page hero info (banner image, title, subtitle)
        $info = ProjectPageInfo::with('bannerImage')->first();
        $pageInfo = [
            'banner_image' => $info?->bannerImage?->url ?? '/images/banner/Project-Banner.webp',
            'title' => $info?->title ?? 'Our Projects',
            'subtitle' => $info?->subtitle ?? 'Discover our portfolio of exceptional residential developments',
        ];

        return Inertia::render('Project', [
            'projects' => $projects,
            'featuredProject' => $featuredProjectData,
            'pageInfo' => $pageInfo,
        ]);
    }

    /**
     * Display the specified project.
     *
     * @param  string  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Fetch product (project) from database — allow access even if inactive
        $product = Product::with('featuredImage')
            ->where('uid', $id)
            ->firstOrFail();

        // Increment views
        $product->incrementViews();

        // Format price
        $price = $product->price ? 'Rp ' . number_format($product->price, 0, ',', '.') : 'Contact us for price';

        // Format gallery images (using accessor)
        $gallery = $product->gallery_images->map(function ($media) {
            return $media->url;
        })->toArray();

        // Add featured image to gallery if not already there
        $featuredImageUrl = $product->featuredImage ? $product->featuredImage->url : null;
        if ($featuredImageUrl && !in_array($featuredImageUrl, $gallery)) {
            array_unshift($gallery, $featuredImageUrl);
        }

        // If no gallery images, use placeholder
        if (empty($gallery)) {
            $gallery = [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
            ];
        }

        $projectData = [
            'id' => $product->uid,
            'name' => $product->name,
            'type' => ucfirst($product->type),
            'price' => $price,
            'description' => $product->description,
            'featured_image' => $featuredImageUrl ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
            'specifications' => [
                'bedrooms' => $product->bedrooms ?? 0,
                'bathrooms' => $product->bathrooms ?? 0,
                'living_room' => (bool) $product->living_room,
                'balcony' => (bool) $product->is_balcon_exist,
                'kitchen' => (bool) $product->kitchen,
                'furnished' => $product->is_furnished ?? 'unfurnished',
            ],
            'gallery' => $gallery,
            'facilities' => $product->facilities ?? [],
            'video_url' => $product->video_url,
            'video_360_url' => $product->video_360_url,
        ];

        return Inertia::render('ProjectDetail', [
            'project' => $projectData
        ]);
    }
}
