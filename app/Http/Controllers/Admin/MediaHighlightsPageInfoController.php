<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaHighlightsPageInfoResource;
use App\Models\MediaHighlightsPageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaHighlightsPageInfoController extends Controller
{
    const DEFAULT_TITLE = 'Media Highlights';
    const DEFAULT_SUBTITLE = 'Stay informed with our latest media coverage and press releases';
    const DEFAULT_BANNER = '/images/banner/Media-Banner.webp';

    public function edit()
    {
        $info = MediaHighlightsPageInfo::with('bannerImage')->first();

        if (!$info) {
            $info = MediaHighlightsPageInfo::create([
                'title' => self::DEFAULT_TITLE,
                'subtitle' => self::DEFAULT_SUBTITLE,
            ]);
            $info->load('bannerImage');
        }

        $resolved = (new MediaHighlightsPageInfoResource($info))->resolve();
        $resolved['default_banner'] = self::DEFAULT_BANNER;
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_subtitle'] = self::DEFAULT_SUBTITLE;

        return Inertia::render('Admin/MediaHighlightsPageInfo/Edit', [
            'info' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $info = MediaHighlightsPageInfo::firstOrFail();

        $validated = $request->validate([
            'banner_image_uid' => 'nullable|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
        ]);

        $info->update($validated);

        return redirect()->route('admin.media-highlights-page-info.edit')
            ->with('success', 'Media Highlights page information updated successfully.');
    }
}
