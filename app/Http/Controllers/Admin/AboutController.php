<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Show the form for editing the about page.
     */
    public function edit()
    {
        $about = About::first();

        // Create default if doesn't exist
        if (!$about) {
            $about = About::create([
                'title' => 'About SkyHouse Property',
                'content' => '',
                'mission' => '',
                'vision' => '',
            ]);
        }

        return Inertia::render('Admin/About/Edit', [
            'about' => $about,
        ]);
    }

    /**
     * Update the about page.
     */
    public function update(Request $request)
    {
        $about = About::first();

        if (!$about) {
            $about = new About();
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'mission' => 'nullable|string',
            'vision' => 'nullable|string',
            'team_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($about->image) {
                Storage::disk('public')->delete($about->image);
            }

            $imagePath = $request->file('image')->store('about', 'public');
            $validated['image'] = $imagePath;
        }

        $about->fill($validated)->save();

        return back()->with('success', 'About page updated successfully.');
    }
}
