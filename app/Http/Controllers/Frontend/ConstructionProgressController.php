<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConstructionProgressResource;
use App\Models\ConstructionProgress;

class ConstructionProgressController extends Controller
{
    /**
     * Get active construction progress for frontend display.
     */
    public function show()
    {
        $constructionProgress = ConstructionProgress::with([
                'progressImage',
                'items' => function ($query) {
                    $query->active()
                        ->with('itemImage')
                        ->orderBy('progress_date', 'desc');
                },
            ])
            ->active()
            ->first();

        if (!$constructionProgress) {
            return response()->json(['data' => null]);
        }

        return response()->json([
            'data' => new ConstructionProgressResource($constructionProgress)
        ]);
    }
}
