<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\MilestoneResource;
use App\Models\Milestone;
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

        $milestones = Milestone::with('milestoneImage')
            ->active()
            ->ordered()
            ->get();

        return Inertia::render('About', [
            'topSales' => $topSales,
            'milestones' => MilestoneResource::collection($milestones)->resolve(),
        ]);
    }
}
