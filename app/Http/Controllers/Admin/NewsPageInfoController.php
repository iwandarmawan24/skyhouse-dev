<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsPageInfoResource;
use App\Models\NewsPageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsPageInfoController extends Controller
{
    const DEFAULT_TITLE = 'News & Articles';
    const DEFAULT_SUBTITLE = 'Stay informed with our latest articles and updates';
    const DEFAULT_BANNER = '/images/banner/Article-Banner.webp';

    public function edit()
    {
        $info = NewsPageInfo::with('bannerImage')->first();

        if (!$info) {
            $info = NewsPageInfo::create([
                'title' => self::DEFAULT_TITLE,
                'subtitle' => self::DEFAULT_SUBTITLE,
            ]);
            $info->load('bannerImage');
        }

        $resolved = (new NewsPageInfoResource($info))->resolve();
        $resolved['default_banner'] = self::DEFAULT_BANNER;
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_subtitle'] = self::DEFAULT_SUBTITLE;

        return Inertia::render('Admin/NewsPageInfo/Edit', [
            'info' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $info = NewsPageInfo::firstOrFail();

        $validated = $request->validate([
            'banner_image_uid' => 'nullable|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
        ]);

        $info->update($validated);

        return redirect()->route('admin.news-page-info.edit')
            ->with('success', 'News page information updated successfully.');
    }
}
