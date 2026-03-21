<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConstructionProgressItemResource;
use App\Http\Resources\ConstructionProgressResource;
use App\Models\ConstructionProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructionProgressController extends Controller
{
    /**
     * Show the form for editing the construction progress.
     */
    public function edit()
    {
        $constructionProgress = ConstructionProgress::with('progressImage')->active()->first();

        if (!$constructionProgress) {
            $constructionProgress = ConstructionProgress::create([
                'title' => 'Construction Progress',
                'description' => 'With each passing day and every brick laid, we move closer to deliver your dream home. Reflecting our commitment to quality and promises.',
                'is_active' => true,
            ]);
            $constructionProgress->load('progressImage');
        }

        $items = $constructionProgress->items()
            ->with('itemImage')
            ->orderBy('progress_date', 'desc')
            ->get();

        return Inertia::render('Admin/ConstructionProgress/Edit', [
            'constructionProgress' => (new ConstructionProgressResource($constructionProgress))->resolve(),
            'items' => ConstructionProgressItemResource::collection($items)->resolve(),
        ]);
    }

    /**
     * Update the construction progress in storage.
     */
    public function update(Request $request)
    {
        $constructionProgress = ConstructionProgress::active()->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_uid' => 'required|exists:media_library,uid',
        ]);

        // Only use media library - clear direct image field
        $validated['image'] = null;

        $constructionProgress->update($validated);

        return redirect()->route('admin.construction-progress.edit')
            ->with('success', 'Construction progress updated successfully.');
    }
}
