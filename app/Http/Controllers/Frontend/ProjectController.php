<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display the specified project.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // TODO: Fetch project data from database
        // For now, return dummy data
        $project = [
            'id' => $id,
            'name' => 'Kinary House',
            'type' => 'Residential',
            'price' => 'Rp 2.5 Billion',
            'description' => "You don't need to go far—this house brings a touch of tropical Bali vibes, making every day feel like a vacation. Please welcome the very first design of Kevin Tan Studio for Easton! This stunning residential property features modern architecture combined with natural elements, creating a perfect harmony between luxury and comfort. Located in a prime area of South Tangerang, this project offers an exceptional living experience with top-notch facilities and amenities.",
            'featured_image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
            'specifications' => [
                'land_area' => 120,
                'building_area' => 180,
                'bedrooms' => 4,
                'bathrooms' => 3,
                'floors' => 2,
                'carports' => 2,
            ],
            'gallery' => [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop',
            ],
        ];

        return Inertia::render('ProjectDetail', [
            'project' => $project
        ]);
    }
}
