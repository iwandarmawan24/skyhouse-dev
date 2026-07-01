<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageExperience;
use App\Models\HomepageExperienceCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'title'            => 'required|string|max:255',
            'description'      => 'nullable|string|max:2000',
            'order'            => 'nullable|integer',
            'is_active'        => 'boolean',
            'existing_images'  => 'nullable|array',
            'existing_images.*' => 'string',
            'new_images'       => 'nullable|array',
            'new_images.*'     => 'image|mimes:jpeg,png,jpg,webp,gif|max:5120',
        ]);

        $uploadedPaths = [];
        foreach ($request->file('new_images', []) as $file) {
            $path = $file->store('experience-cards', 'public');
            $uploadedPaths[] = '/storage/' . $path;
        }

        $images = array_values(array_merge(
            $request->input('existing_images', []),
            $uploadedPaths
        ));

        HomepageExperienceCard::create([
            'title'       => $request->title,
            'description' => $request->description,
            'order'       => $request->order ?? HomepageExperienceCard::max('order') + 1,
            'is_active'   => $request->boolean('is_active', true),
            'images'      => $images,
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
            'title'             => 'required|string|max:255',
            'description'       => 'nullable|string|max:2000',
            'order'             => 'nullable|integer',
            'is_active'         => 'boolean',
            'existing_images'   => 'nullable|array',
            'existing_images.*' => 'string',
            'new_images'        => 'nullable|array',
            'new_images.*'      => 'image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'removed_images'    => 'nullable|array',
            'removed_images.*'  => 'string',
        ]);

        foreach ($request->input('removed_images', []) as $path) {
            if (str_starts_with($path, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $path));
            }
        }

        $uploadedPaths = [];
        foreach ($request->file('new_images', []) as $file) {
            $path = $file->store('experience-cards', 'public');
            $uploadedPaths[] = '/storage/' . $path;
        }

        $images = array_values(array_merge(
            $request->input('existing_images', []),
            $uploadedPaths
        ));

        $card->update([
            'title'       => $request->title,
            'description' => $request->description,
            'order'       => $request->order ?? $card->order,
            'is_active'   => $request->boolean('is_active', true),
            'images'      => $images,
        ]);

        return redirect()->route('admin.homepage-experience.index')
            ->with('success', 'Experience card updated successfully.');
    }

    public function destroy(HomepageExperienceCard $card)
    {
        foreach ($card->images ?? [] as $path) {
            if (str_starts_with($path, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $path));
            }
        }

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
            'main_description' => 'nullable|string|max:1000',
        ]);

        $mainCard = HomepageExperience::firstOrCreate([]);
        $mainCard->update($validated);

        return back()->with('success', 'Main card updated.');
    }
}
