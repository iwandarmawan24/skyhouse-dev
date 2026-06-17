<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutSectionInfoController extends Controller
{
    const DEFAULTS = [
        'about_journey_subtitle'     => 'A journey of growth, innovation, and achievement that reflects our commitment to creating exceptional living experiences and sustainable long-term value.',
        'about_values_subtitle'      => 'Our values serve as the foundation of everything we do, guiding the way we plan, develop, and deliver exceptional living environments that stand the test of time.',
        'top_sales_subtitle'         => 'Meet our top performing sales consultants, ready to assist you every step of the way.',
        'facilities_section_subtitle'=> 'Click on each card to explore our complete range of facilities.',
    ];

    public function edit()
    {
        $sections = Setting::getGroup('sections');

        return Inertia::render('Admin/About/SectionInfo', [
            'subtitles' => [
                'about_journey_subtitle'      => $sections['about_journey_subtitle']      ?? self::DEFAULTS['about_journey_subtitle'],
                'about_values_subtitle'       => $sections['about_values_subtitle']       ?? self::DEFAULTS['about_values_subtitle'],
                'top_sales_subtitle'          => $sections['top_sales_subtitle']          ?? self::DEFAULTS['top_sales_subtitle'],
                'facilities_section_subtitle' => $sections['facilities_section_subtitle'] ?? self::DEFAULTS['facilities_section_subtitle'],
            ],
            'defaults' => self::DEFAULTS,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'about_journey_subtitle'      => 'nullable|string|max:500',
            'about_values_subtitle'       => 'nullable|string|max:500',
            'top_sales_subtitle'          => 'nullable|string|max:500',
            'facilities_section_subtitle' => 'nullable|string|max:500',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value ?? '', 'text', 'sections');
        }

        return redirect()->route('admin.about.section-info.edit')
            ->with('success', 'Section subtitles updated successfully.');
    }
}
