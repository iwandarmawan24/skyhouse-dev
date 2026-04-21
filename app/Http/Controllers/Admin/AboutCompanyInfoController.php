<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutCompanyInfoResource;
use App\Models\AboutCompanyInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutCompanyInfoController extends Controller
{
    const DEFAULT_HEADING_LINE_1 = 'About';
    const DEFAULT_HEADING_LINE_2 = 'Company';
    const DEFAULT_DESCRIPTION = 'Risland Holdings is a Hong Kong–based multinational real estate company engaged in residential development, commercial real estate, property management, and infrastructure construction and operation. By 2018, it had developed projects across multiple countries, including the United States, New Zealand, Thailand, India, and Indonesia.';

    public function edit()
    {
        $info = AboutCompanyInfo::first();

        if (!$info) {
            $info = AboutCompanyInfo::create([
                'heading_line_1' => self::DEFAULT_HEADING_LINE_1,
                'heading_line_2' => self::DEFAULT_HEADING_LINE_2,
                'description' => self::DEFAULT_DESCRIPTION,
            ]);
        }

        $resolved = (new AboutCompanyInfoResource($info))->resolve();
        $resolved['default_heading_line_1'] = self::DEFAULT_HEADING_LINE_1;
        $resolved['default_heading_line_2'] = self::DEFAULT_HEADING_LINE_2;
        $resolved['default_description'] = self::DEFAULT_DESCRIPTION;

        return Inertia::render('Admin/AboutCompanyInfo/Edit', [
            'info' => $resolved,
        ]);
    }

    public function update(Request $request)
    {
        $info = AboutCompanyInfo::firstOrFail();

        $validated = $request->validate([
            'heading_line_1' => 'nullable|string|max:255',
            'heading_line_2' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:5000',
        ]);

        $info->update($validated);

        return redirect()->route('admin.about.company-intro.edit')
            ->with('success', 'Company information updated successfully.');
    }
}
