<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventsPageInfoResource;
use App\Models\EventsPageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventsPageInfoController extends Controller
{
    const DEFAULT_TITLE = 'Events & Activities';
    const DEFAULT_SUBTITLE = 'Discover our upcoming events and past activities';
    const DEFAULT_BANNER = '/images/banner/Event-Banner.webp';

    public function edit()
    {
        $info = EventsPageInfo::with('bannerImage')->first();

        if (!$info) {
            $info = EventsPageInfo::create([
                'title' => self::DEFAULT_TITLE,
                'subtitle' => self::DEFAULT_SUBTITLE,
            ]);
            $info->load('bannerImage');
        }

        $resolved = (new EventsPageInfoResource($info))->resolve();
        $resolved['default_banner'] = self::DEFAULT_BANNER;
        $resolved['default_title'] = self::DEFAULT_TITLE;
        $resolved['default_subtitle'] = self::DEFAULT_SUBTITLE;

        return Inertia::render('Admin/EventsPageInfo/Edit', [
            'info' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $info = EventsPageInfo::firstOrFail();

        $validated = $request->validate([
            'banner_image_uid' => 'nullable|exists:media_library,uid',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
        ]);

        $info->update($validated);

        return redirect()->route('admin.events-page-info.edit')
            ->with('success', 'Events page information updated successfully.');
    }
}
