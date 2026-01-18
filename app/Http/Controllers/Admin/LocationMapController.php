<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocationMapResource;
use App\Models\LocationMap;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationMapController extends Controller
{
    /**
     * Show the form for editing the location map.
     */
    public function edit()
    {
        // Get the active location map or create a default one
        $locationMap = LocationMap::with('mapImage')->active()->first();

        if (!$locationMap) {
            // Create default location map if none exists
            $locationMap = LocationMap::create([
                'title' => 'Strategic Location in CBD of Alam Sutera',
                'google_maps_link' => 'https://maps.app.goo.gl/Ru7myaVcPCSgNspo7',
                'is_active' => true,
            ]);
            $locationMap->load('mapImage');
        }

        return Inertia::render('Admin/LocationMap/Edit', [
            'locationMap' => (new LocationMapResource($locationMap))->resolve(),
        ]);
    }

    /**
     * Update the location map in storage.
     */
    public function update(Request $request)
    {
        $locationMap = LocationMap::active()->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image_uid' => 'required|exists:media_library,uid',
            'google_maps_link' => 'nullable|string|max:500',
        ]);

        // Only use media library - clear direct image field
        $validated['image'] = null;

        // Update the record
        $locationMap->update($validated);

        return redirect()->route('admin.location-map.edit')
            ->with('success', 'Location map updated successfully.');
    }
}
