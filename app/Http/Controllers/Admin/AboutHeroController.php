<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutHeroResource;
use App\Models\AboutHero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutHeroController extends Controller
{
    const DEFAULT_TITLE = 'Building Dreams, Creating Communities';
    const DEFAULT_SUBTITLE = "At Skyhouse Alamsutera, we believe that a home is more than just a place to live—it's where life's most precious moments unfold. Since our inception, we have been dedicated to creating residential communities that inspire, comfort, and endure.";
    const DEFAULT_DESCRIPTION = "Our commitment goes beyond constructing buildings; we craft living experiences that enhance the quality of life for every resident. With innovative designs, sustainable practices, and a customer-centric approach, we have established ourselves as a trusted name in Indonesia's real estate industry.";

    public function edit()
    {
        $hero = AboutHero::first();

        if (!$hero) {
            $hero = AboutHero::create([
                'title' => self::DEFAULT_TITLE,
                'subtitle' => self::DEFAULT_SUBTITLE,
                'description' => self::DEFAULT_DESCRIPTION,
            ]);
        }

        $resolved = (new AboutHeroResource($hero))->resolve();
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_subtitle'] = self::DEFAULT_SUBTITLE;
        $resolved['default_description'] = self::DEFAULT_DESCRIPTION;

        return Inertia::render('Admin/AboutHero/Edit', [
            'hero' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $hero = AboutHero::firstOrFail();

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:2000',
            'description' => 'nullable|string|max:5000',
        ]);

        $hero->update($validated);

        return redirect()->route('admin.about.hero.edit')
            ->with('success', 'About hero updated successfully.');
    }
}
