<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageExperience;
use App\Models\HomepageExperienceCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageExperienceCardController extends Controller
{
    public function index()
    {
        $cards = HomepageExperienceCard::ordered()->get();

        $mainCard = HomepageExperience::first();

        return Inertia::render('Admin/HomepageExperience/Index', [
            'cards'    => $cards,
            'mainCard' => $mainCard ? [
                'main_description' => $mainCard->main_description,
            ] : null,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/HomepageExperience/Form', [
            'card' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'order'       => 'nullable|integer',
            'is_active'   => 'boolean',
            'images'      => 'nullable|array',
            'images.*'    => 'string',
        ]);

        HomepageExperienceCard::create([
            'title'       => $request->title,
            'description' => $request->description,
            'order'       => $request->order ?? HomepageExperienceCard::max('order') + 1,
            'is_active'   => $request->boolean('is_active', true),
            'images'      => $request->input('images', []),
        ]);

        return redirect()->route('admin.homepage-experience.index')
            ->with('success', 'Experience card created successfully.');
    }

    public function edit(HomepageExperienceCard $card)
    {
        return Inertia::render('Admin/HomepageExperience/Form', [
            'card' => $card,
        ]);
    }

    public function update(Request $request, HomepageExperienceCard $card)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'order'       => 'nullable|integer',
            'is_active'   => 'boolean',
            'images'      => 'nullable|array',
            'images.*'    => 'string',
        ]);

        $card->update([
            'title'       => $request->title,
            'description' => $request->description,
            'order'       => $request->order ?? $card->order,
            'is_active'   => $request->boolean('is_active', true),
            'images'      => $request->input('images', []),
        ]);

        return redirect()->route('admin.homepage-experience.index')
            ->with('success', 'Experience card updated successfully.');
    }

    public function destroy(HomepageExperienceCard $card)
    {
        $card->delete();

        return redirect()->route('admin.homepage-experience.index')
            ->with('success', 'Experience card deleted successfully.');
    }

    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'updates'         => 'required|array',
            'updates.*.uid'   => 'required|string|exists:homepage_experience_cards,uid',
            'updates.*.order' => 'required|integer',
        ]);

        foreach ($validated['updates'] as $update) {
            HomepageExperienceCard::where('uid', $update['uid'])
                ->update(['order' => $update['order']]);
        }

        return back()->with('success', 'Order updated.');
    }

    public function updateMainCard(Request $request)
    {
        $validated = $request->validate([
            'main_description' => 'nullable|string|max:5000',
        ]);

        $mainCard = HomepageExperience::firstOrCreate([]);
        $mainCard->update($validated);

        return back()->with('success', 'Main card updated.');
    }
}
