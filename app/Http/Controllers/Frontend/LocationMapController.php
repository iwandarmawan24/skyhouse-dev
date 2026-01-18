<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocationMapResource;
use App\Models\LocationMap;

class LocationMapController extends Controller
{
    /**
     * Get active location map for frontend display.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        $locationMap = LocationMap::with('mapImage')
            ->active()
            ->first();

        if (!$locationMap) {
            return response()->json([
                'data' => null
            ]);
        }

        return response()->json([
            'data' => (new LocationMapResource($locationMap))->resolve()
        ]);
    }
}
