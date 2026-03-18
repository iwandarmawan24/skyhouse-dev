<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AwardResource;
use App\Models\Award;

class AwardController extends Controller
{
    public function show()
    {
        $award = Award::with('awardImage')->active()->first();

        if (!$award) {
            return response()->json(['data' => null]);
        }

        return response()->json([
            'data' => new AwardResource($award)
        ]);
    }
}
