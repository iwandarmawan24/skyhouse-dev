<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\HeroBannerResource;
use App\Models\HeroBanner;
use Illuminate\Http\Request;

class HeroBannerController extends Controller
{
    /**
     * Get active hero banners for frontend display.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $banners = HeroBanner::with('bannerImage')
            ->active()
            ->ordered()
            ->get();

        return response()->json([
            'data' => HeroBannerResource::collection($banners)
        ]);
    }
}
