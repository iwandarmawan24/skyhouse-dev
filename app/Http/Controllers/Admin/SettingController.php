<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display settings page.
     */
    public function index()
    {
        $settings = Setting::orderBy('key')->get()->groupBy('group');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Store a new setting.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:settings,key|max:255',
            'value' => 'nullable',
            'type' => 'required|string|in:text,textarea,number,boolean,image',
            'group' => 'required|string|max:255',
        ]);

        Setting::create($validated);

        return back()->with('success', 'Setting created successfully.');
    }

    /**
     * Update settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable',
        ]);

        foreach ($validated['settings'] as $settingData) {
            $setting = Setting::where('key', $settingData['key'])->first();

            if ($setting) {
                $setting->update(['value' => $settingData['value']]);

                // Clear cache for this setting
                Cache::forget("setting_{$settingData['key']}");
            }
        }

        return back()->with('success', 'Settings updated successfully.');
    }

    /**
     * Delete a setting.
     */
    public function destroy(Setting $setting)
    {
        // Clear cache for this setting
        Cache::forget("setting_{$setting->key}");

        $setting->delete();

        return back()->with('success', 'Setting deleted successfully.');
    }
}
