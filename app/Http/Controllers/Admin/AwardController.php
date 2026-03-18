<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AwardResource;
use App\Models\Award;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AwardController extends Controller
{
    public function edit()
    {
        $award = Award::with('awardImage')->active()->first();

        if (!$award) {
            $award = Award::create([
                'is_active' => true,
            ]);
            $award->load('awardImage');
        }

        return Inertia::render('Admin/Awards/Edit', [
            'award' => (new AwardResource($award))->resolve(),
        ]);
    }

    public function update(Request $request)
    {
        $award = Award::active()->firstOrFail();

        $validated = $request->validate([
            'image_uid' => 'required|exists:media_library,uid',
        ]);

        $validated['image'] = null;

        $award->update($validated);

        return redirect()->route('admin.awards.edit')
            ->with('success', 'Award image updated successfully.');
    }
}
