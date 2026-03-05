<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\TopSales;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $topSales = TopSales::with('mediaImage')
            ->active()
            ->ordered()
            ->limit(5)
            ->get()
            ->map(function ($sales) {
                return [
                    'id' => $sales->uid,
                    'name' => $sales->name,
                    'role' => $sales->job_title,
                    'position' => $sales->position,
                    'image' => $sales->image_url,
                ];
            });

        return Inertia::render('About', [
            'topSales' => $topSales,
        ]);
    }
}
