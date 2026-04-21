<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FacilitiesPageInfoResource;
use App\Models\FacilitiesPageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilitiesPageInfoController extends Controller
{
    const DEFAULT_TITLE = 'Our Facilities';
    const DEFAULT_SUBTITLE = 'Elevate your living experience with our premium amenities';
    const DEFAULT_BANNER = '/images/banner/Facilities-Banner.webp';

    public function edit()
    {
        $info = FacilitiesPageInfo::with('bannerImage')->first();

        if (!$info) {
            $info = FacilitiesPageInfo::create([
                'title' => self::DEFAULT_TITLE,
                'subtitle' => self::DEFAULT_SUBTITLE,
            ]);
            $info->load('bannerImage');
        }

        $resolved = (new FacilitiesPageInfoResource($info))->resolve();
        $resolved['default_banner'] = self::DEFAULT_BANNER;
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_subtitle'] = self::DEFAULT_SUBTITLE;

        return Inertia::render('Admin/FacilitiesPageInfo/Edit', [
            'info' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $info = FacilitiesPageInfo::firstOrFail();

        $validated = $request->validate([
            'banner_image_uid' => 'nullable|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
        ]);

        $info->update($validated);

        return redirect()->route('admin.facilities-page-info.edit')
            ->with('success', 'Facilities page information updated successfully.');
    }
}
