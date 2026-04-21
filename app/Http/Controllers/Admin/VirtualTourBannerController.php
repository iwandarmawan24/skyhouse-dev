<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VirtualTourBannerResource;
use App\Models\VirtualTourBanner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VirtualTourBannerController extends Controller
{
    const DEFAULT_URL = 'https://epic.spindonesia.com/skyhousealsut/index.html';
    const DEFAULT_IMAGE = '/images/360/360 feature.png';

    public function edit()
    {
        $banner = VirtualTourBanner::with('image')->first();

        if (!$banner) {
            $banner = VirtualTourBanner::create([
                'url' => self::DEFAULT_URL,
                'is_active' => true,
            ]);
            $banner->load('image');
        }

        $resolved = (new VirtualTourBannerResource($banner))->resolve();
        $resolved['default_image'] = self::DEFAULT_IMAGE;
        $resolved['default_url'] = self::DEFAULT_URL;

        return Inertia::render('Admin/VirtualTourBanners/Edit', [
            'banner' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $banner = VirtualTourBanner::firstOrFail();

        $validated = $request->validate([
            'image_uid' => 'nullable|exists:media_library,uid',
            'url' => 'nullable|url|max:500',
            'is_active' => 'required|boolean',
        ]);

        $banner->update($validated);

        return redirect()->route('admin.virtual-tour-banner.edit')
            ->with('success', 'Virtual tour banner updated successfully.');
    }
}
