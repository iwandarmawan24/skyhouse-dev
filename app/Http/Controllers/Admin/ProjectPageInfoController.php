<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectPageInfoResource;
use App\Models\ProjectPageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectPageInfoController extends Controller
{
    const DEFAULT_TITLE = 'Our Projects';
    const DEFAULT_SUBTITLE = 'Discover our portfolio of exceptional residential developments';
    const DEFAULT_BANNER = '/images/banner/Project-Banner.webp';

    public function edit()
    {
        $info = ProjectPageInfo::with('bannerImage')->first();

        if (!$info) {
            $info = ProjectPageInfo::create([
                'title' => self::DEFAULT_TITLE,
                'subtitle' => self::DEFAULT_SUBTITLE,
            ]);
            $info->load('bannerImage');
        }

        $resolved = (new ProjectPageInfoResource($info))->resolve();
        $resolved['default_banner'] = self::DEFAULT_BANNER;
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_subtitle'] = self::DEFAULT_SUBTITLE;

        return Inertia::render('Admin/ProjectPageInfo/Edit', [
            'info' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $info = ProjectPageInfo::firstOrFail();

        $validated = $request->validate([
            'banner_image_uid' => 'nullable|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
        ]);

        $info->update($validated);

        return redirect()->route('admin.project-page-info.edit')
            ->with('success', 'Project page information updated successfully.');
    }
}
