<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CareerSettingResource;
use App\Models\CareerSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerSettingController extends Controller
{
    public function edit()
    {
        $settings = CareerSetting::first();

        if (!$settings) {
            $settings = CareerSetting::create([
                'apply_email' => null,
            ]);
        }

        return Inertia::render('Admin/CareerSettings/Edit', [
            'settings' => (new CareerSettingResource($settings))->resolve(),
        ]);
    }

    public function update(Request $request)
    {
        $settings = CareerSetting::firstOrFail();

        $validated = $request->validate([
            'apply_email' => 'nullable|email|max:255',
        ]);

        $settings->update($validated);

        return redirect()->route('admin.career-settings.edit')
            ->with('success', 'Career settings updated successfully.');
    }
}
