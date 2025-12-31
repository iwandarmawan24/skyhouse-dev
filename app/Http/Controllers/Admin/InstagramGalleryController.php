<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InstagramGallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstagramGalleryController extends Controller
{
    /**
     * Display the Instagram gallery grid (max 6 images)
     */
    public function index()
    {
        // Get all 6 positions, fill empty slots with null
        $galleries = [];
        for ($i = 1; $i <= 6; $i++) {
            $gallery = InstagramGallery::with('mediaImage')
                ->where('position', $i)
                ->first();

            $galleries[$i] = $gallery;
        }

        return Inertia::render('Admin/InstagramGallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Update or create image for a specific position
     */
    public function updatePosition(Request $request)
    {
        $validated = $request->validate([
            'position' => 'required|integer|min:1|max:6',
            'image_uid' => 'required|string|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        // Find existing gallery at this position or create new
        $gallery = InstagramGallery::where('position', $validated['position'])->first();

        if ($gallery) {
            $gallery->update([
                'image_uid' => $validated['image_uid'],
                'is_active' => $validated['is_active'],
            ]);
        } else {
            InstagramGallery::create($validated);
        }

        return back()->with('success', 'Instagram gallery updated successfully.');
    }

    /**
     * Remove image from a specific position
     */
    public function deletePosition(Request $request)
    {
        $validated = $request->validate([
            'position' => 'required|integer|min:1|max:6',
        ]);

        $gallery = InstagramGallery::where('position', $validated['position'])->first();

        if ($gallery) {
            $gallery->delete();
        }

        return back()->with('success', 'Image removed successfully.');
    }

    /**
     * Toggle active status for a position
     */
    public function toggleActive(Request $request)
    {
        $validated = $request->validate([
            'position' => 'required|integer|min:1|max:6',
        ]);

        $gallery = InstagramGallery::where('position', $validated['position'])->first();

        if ($gallery) {
            $gallery->update(['is_active' => !$gallery->is_active]);
        }

        return back()->with('success', 'Status updated successfully.');
    }
}
