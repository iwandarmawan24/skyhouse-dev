<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConstructionProgressItemResource;
use App\Models\ConstructionProgress;
use App\Models\ConstructionProgressItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructionProgressItemController extends Controller
{
    public function create()
    {
        $constructionProgress = ConstructionProgress::active()->firstOrFail();

        return Inertia::render('Admin/ConstructionProgress/ItemForm', [
            'item' => null,
            'constructionProgressUid' => $constructionProgress->uid,
        ]);
    }

    public function store(Request $request)
    {
        $constructionProgress = ConstructionProgress::active()->firstOrFail();

        $validated = $request->validate([
            'progress_date' => 'required|date',
            'image_uid' => 'required|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        $validated['construction_progress_uid'] = $constructionProgress->uid;

        ConstructionProgressItem::create($validated);

        return redirect()->route('admin.construction-progress.edit')
            ->with('success', 'Progress item created successfully.');
    }

    public function edit(ConstructionProgressItem $item)
    {
        $item->load('itemImage');

        return Inertia::render('Admin/ConstructionProgress/ItemForm', [
            'item' => (new ConstructionProgressItemResource($item))->resolve(),
            'constructionProgressUid' => $item->construction_progress_uid,
        ]);
    }

    public function update(Request $request, ConstructionProgressItem $item)
    {
        $validated = $request->validate([
            'progress_date' => 'required|date',
            'image_uid' => 'required|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        $item->update($validated);

        return redirect()->route('admin.construction-progress.edit')
            ->with('success', 'Progress item updated successfully.');
    }

    public function destroy(ConstructionProgressItem $item)
    {
        $item->delete();

        return redirect()->route('admin.construction-progress.edit')
            ->with('success', 'Progress item deleted successfully.');
    }
}
