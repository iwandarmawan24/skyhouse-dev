<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MilestoneResource;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MilestoneController extends Controller
{
    public function index()
    {
        $milestones = Milestone::with('milestoneImage')->ordered()->get();

        return Inertia::render('Admin/Milestones/Index', [
            'milestones' => MilestoneResource::collection($milestones)->resolve(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Milestones/Form', [
            'milestone' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_uid' => 'nullable|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        Milestone::create($validated);

        return redirect()->route('admin.milestones.index')
            ->with('success', 'Milestone created successfully.');
    }

    public function edit(Milestone $milestone)
    {
        $milestone->load('milestoneImage');

        return Inertia::render('Admin/Milestones/Form', [
            'milestone' => (new MilestoneResource($milestone))->resolve(),
        ]);
    }

    public function update(Request $request, Milestone $milestone)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_uid' => 'nullable|exists:media_library,uid',
            'is_active' => 'required|boolean',
        ]);

        if ($request->filled('image_uid')) {
            $validated['image'] = null;
        }

        $milestone->update($validated);

        return redirect()->route('admin.milestones.index')
            ->with('success', 'Milestone updated successfully.');
    }

    public function destroy(Milestone $milestone)
    {
        if ($milestone->image) {
            Storage::disk('public')->delete($milestone->image);
        }

        $milestone->delete();

        return redirect()->route('admin.milestones.index')
            ->with('success', 'Milestone deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:milestones,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            Milestone::where('uid', $update['uid'])->update(['order' => $update['order']]);
        }

        return redirect()->route('admin.milestones.index')
            ->with('success', 'Milestone order updated successfully.');
    }
}
