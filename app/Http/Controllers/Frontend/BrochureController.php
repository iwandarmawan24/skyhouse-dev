<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Brochure;
use Illuminate\Http\JsonResponse;

class BrochureController extends Controller
{
    /**
     * Get the active brochure for download
     */
    public function show(): JsonResponse
    {
        $brochure = Brochure::with('file')->active()->first();

        if (!$brochure || !$brochure->file) {
            return response()->json([
                'success' => false,
                'message' => 'Brochure not available',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Brochure retrieved successfully',
            'data' => [
                'uid' => $brochure->uid,
                'file_url' => $brochure->file->url,
                'filename' => $brochure->file->filename,
                'mime_type' => $brochure->file->mime_type,
                'size' => $brochure->file->size,
            ],
        ]);
    }
}
