<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageExperience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageExperienceController extends Controller
{
    const DEFAULTS = [
        'main_description'            => 'Surrounded by Top Universities, daily conveniences, entertainment destinations, and thriving business hubs, Sky House Alam Sutera+ places everything you need within easy reach.',
        'card_daily_title'            => 'Effortless Grocery Shopping',
        'card_daily_description'      => 'Groceries made effortless. From everyday essentials to fresh produce, everything you need is just minutes away at AEON Store, All Fresh, Duta Buah, Pasar 8 Alam Sutera, and Rumah Buah.',
        'card_entertainment_title'    => 'Urban Lifestyle Living',
        'card_entertainment_description' => 'Enjoy seamless access to Jakarta Premium Outlet, IKEA, Mall @ Alam Sutera, Decathlon at Flavor Bliss, and Living World Alam Sutera. Step outside and immerse yourself in a vibrant lifestyle destination where shopping, dining, leisure, and entertainment are always within reach.',
        'card_university_title'       => 'Top Universities Nearby',
        'card_university_description' => 'Located near Binus University, Bunda Mulia University, Swiss German University, BINUS ASO School of Engineering, providing access to more than 30,000 students.',
        'card_business_title'         => 'Thriving Business Hub',
        'card_business_description'   => 'A built-in ecosystem of professionals surrounded by Synergy Building, The Prominence, Alfa Tower, Menara Top Food, Prima Sejahtera Building, Kino Tower, and Marks Building.',
    ];

    public function edit()
    {
        $experience = HomepageExperience::first();

        if (!$experience) {
            $experience = HomepageExperience::create(self::DEFAULTS);
        }

        return Inertia::render('Admin/HomepageExperience/Edit', [
            'experience' => $experience->only(array_keys(self::DEFAULTS) + ['uid']),
            'defaults'   => self::DEFAULTS,
        ]);
    }

    public function update(Request $request)
    {
        $experience = HomepageExperience::firstOrFail();

        $validated = $request->validate([
            'main_description'               => 'nullable|string|max:1000',
            'card_daily_title'               => 'nullable|string|max:255',
            'card_daily_description'         => 'nullable|string|max:1000',
            'card_entertainment_title'       => 'nullable|string|max:255',
            'card_entertainment_description' => 'nullable|string|max:1000',
            'card_university_title'          => 'nullable|string|max:255',
            'card_university_description'    => 'nullable|string|max:1000',
            'card_business_title'            => 'nullable|string|max:255',
            'card_business_description'      => 'nullable|string|max:1000',
        ]);

        $experience->update($validated);

        return redirect()->route('admin.homepage-experience.edit')
            ->with('success', 'Experience section updated successfully.');
    }
}
