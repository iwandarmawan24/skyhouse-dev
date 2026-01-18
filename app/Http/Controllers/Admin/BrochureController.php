<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrochureResource;
use App\Models\Brochure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrochureController extends Controller
{
    /**
     * Show the form for editing the brochure.
     */
    public function edit()
    {
        // Get the active brochure or create a default one
        $brochure = Brochure::with('file')->active()->first();

        if (!$brochure) {
            // Create default brochure if none exists
            $brochure = Brochure::create([
                'is_active' => true,
            ]);
            $brochure->load('file');
        }

        return Inertia::render('Admin/Brochures/Edit', [
            'brochure' => (new BrochureResource($brochure))->resolve(),
        ]);
    }

    /**
     * Update the brochure in storage.
     */
    public function update(Request $request)
    {
        $brochure = Brochure::active()->firstOrFail();

        $validated = $request->validate([
            'file_uid' => 'required|exists:media_library,uid',
        ]);

        // Update the record
        $brochure->update($validated);

        return redirect()->route('admin.brochures.edit')
            ->with('success', 'Brochure updated successfully.');
    }
}
