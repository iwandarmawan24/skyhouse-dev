<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutAchievementResource;
use App\Models\AboutAchievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutAchievementController extends Controller
{
    public function index()
    {
        $achievements = AboutAchievement::ordered()->get();

        return Inertia::render('Admin/AboutAchievements/Index', [
            'achievements' => AboutAchievementResource::collection($achievements)->resolve(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AboutAchievements/Form', [
            'achievement' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validatePayload($request);

        AboutAchievement::create($validated);

        return redirect()->route('admin.about.achievements.index')
            ->with('success', 'Achievement created successfully.');
    }

    public function edit(AboutAchievement $achievement)
    {
        return Inertia::render('Admin/AboutAchievements/Form', [
            'achievement' => (new AboutAchievementResource($achievement))->resolve(),
        ]);
    }

    public function update(Request $request, AboutAchievement $achievement)
    {
        $validated = $this->validatePayload($request);

        $achievement->update($validated);

        return redirect()->route('admin.about.achievements.index')
            ->with('success', 'Achievement updated successfully.');
    }

    public function destroy(AboutAchievement $achievement)
    {
        $achievement->delete();

        return redirect()->route('admin.about.achievements.index')
            ->with('success', 'Achievement deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.uid' => 'required|string|exists:about_achievements,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            AboutAchievement::where('uid', $update['uid'])->update(['order' => $update['order']]);
        }

        return redirect()->route('admin.about.achievements.index')
            ->with('success', 'Order updated successfully.');
    }

    private function validatePayload(Request $request): array
    {
        return $request->validate([
            'number' => 'required|string|max:64',
            'label' => 'required|string|max:255',
            'is_active' => 'required|boolean',
        ]);
    }
}
