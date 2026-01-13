<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
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
        // Fetch active products (projects) from database
        $projects = Product::with('featuredImage')
            ->active()
            ->latest()
            ->get()
            ->map(function ($product) {
                // Map product type to status for filtering
                $status = $product->is_sold ? 'sold-out' : 'available';

                return [
                    'id' => $product->uid,
                    'image' => $product->featuredImage ? $product->featuredImage->url : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                    'location' => $product->location,
                    'units' => 1, // Products don't have units field, you can add it or default to 1
                    'title' => $product->name,
                    'description' => $product->description,
                    'status' => $status,
                    'category' => $product->type,
                    'type' => $status, // For filtering
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
            'status' => $featuredProject->is_sold ? 'Sold Out' : 'Available',
            'title' => $featuredProject->name,
            'description' => $featuredProject->description,
            'location' => $featuredProject->location,
            'units' => 1, // Products don't have units field
        ] : null;

        return Inertia::render('Project', [
            'projects' => $projects,
            'featuredProject' => $featuredProjectData,
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
        // Fetch product (project) from database
        $product = Product::with('featuredImage')
            ->where('uid', $id)
            ->active()
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
                'land_area' => $product->land_area ?? 0,
                'building_area' => $product->building_area ?? 0,
                'bedrooms' => $product->bedrooms ?? 0,
                'bathrooms' => $product->bathrooms ?? 0,
                'floors' => $product->floors ?? 0,
                'carports' => $product->garage ?? 0,
            ],
            'gallery' => $gallery,
            'location' => $product->location,
            'city' => $product->city,
            'province' => $product->province,
            'latitude' => $product->latitude,
            'longitude' => $product->longitude,
            'facilities' => $product->facilities ?? [],
            'video_url' => $product->video_url,
            'video_360_url' => $product->video_360_url,
        ];

        return Inertia::render('ProjectDetail', [
            'project' => $projectData
        ]);
    }
}
