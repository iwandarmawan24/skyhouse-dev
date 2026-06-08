<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function edit()
    {
        $about = About::first();

        if (!$about) {
            $about = About::create([
                'opening_statement' => 'Welcome to SkyHouse Property',
                'vision' => '',
                'mission' => '',
            ]);
        }

        $about->load('featuredImage');

        return Inertia::render('Admin/About/Edit', [
            'about' => $about,
        ]);
    }

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
            'image_uid' => 'nullable|exists:media_library,uid',
        ]);

        $about->fill($validated)->save();

        return back()->with('success', 'About page updated successfully.');
    }
}
