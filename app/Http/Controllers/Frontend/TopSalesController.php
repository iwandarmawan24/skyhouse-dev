<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\TopSales;
use Illuminate\Http\JsonResponse;

class TopSalesController extends Controller
{
    /**
     * Get top 5 active sales for frontend display
     */
    public function index(): JsonResponse
    {
        $topSales = TopSales::with('mediaImage')
            ->active()
            ->ordered()
            ->limit(5)
            ->get()
            ->map(function ($sales) {
                return [
                    'name' => $sales->name,
                    'position' => $sales->position,
                    'image' => $sales->image_url,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $topSales,
        ]);
    }
}
