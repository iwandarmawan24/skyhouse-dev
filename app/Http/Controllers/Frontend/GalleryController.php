<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display the gallery page with galleries data
     */
    public function index(): Response
    {
        $galleries = Gallery::active()
            ->ordered()
            ->get()
            ->map(function ($gallery) {
                return [
                    'id' => $gallery->uid,
                    'url' => $gallery->image_url,
                    'title' => $gallery->title,
                    'description' => $gallery->description,
                    'category' => $gallery->category,
                ];
            });

        return Inertia::render('Gallery', [
            'galleries' => $galleries,
        ]);
    }
}
