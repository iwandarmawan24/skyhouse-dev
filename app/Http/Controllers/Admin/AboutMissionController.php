<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutMissionResource;
use App\Models\AboutMission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutMissionController extends Controller
{
    const DEFAULT_TITLE = 'Our Mission';
    const DEFAULT_STATEMENT = "To be Indonesia's premier residential developer by creating exceptional living environments that combine innovative design, quality construction, and sustainable practices, while fostering vibrant communities where families thrive and create lasting memories.";

    public function edit()
    {
        $mission = AboutMission::first();

        if (!$mission) {
            $mission = AboutMission::create([
                'title' => self::DEFAULT_TITLE,
                'statement' => self::DEFAULT_STATEMENT,
            ]);
        }

        $resolved = (new AboutMissionResource($mission))->resolve();
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_statement'] = self::DEFAULT_STATEMENT;

        return Inertia::render('Admin/AboutMission/Edit', [
            'mission' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $mission = AboutMission::firstOrFail();

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'statement' => 'nullable|string|max:5000',
        ]);

        $mission->update($validated);

        return redirect()->route('admin.about.mission.edit')
            ->with('success', 'Mission statement updated successfully.');
    }
}
