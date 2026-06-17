<?php

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $settings = [
            [
                'key'   => 'about_journey_subtitle',
                'value' => 'A journey of growth, innovation, and achievement that reflects our commitment to creating exceptional living experiences and sustainable long-term value.',
                'type'  => 'textarea',
                'group' => 'sections',
            ],
            [
                'key'   => 'about_values_subtitle',
                'value' => 'Our values serve as the foundation of everything we do, guiding the way we plan, develop, and deliver exceptional living environments that stand the test of time.',
                'type'  => 'textarea',
                'group' => 'sections',
            ],
            [
                'key'   => 'top_sales_subtitle',
                'value' => 'Meet our top performing sales consultants, ready to assist you every step of the way.',
                'type'  => 'textarea',
                'group' => 'sections',
            ],
            [
                'key'   => 'facilities_section_subtitle',
                'value' => 'Click on each card to explore our complete range of facilities',
                'type'  => 'textarea',
                'group' => 'sections',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }

    public function down(): void
    {
        Setting::whereIn('key', [
            'about_journey_subtitle',
            'about_values_subtitle',
            'top_sales_subtitle',
            'facilities_section_subtitle',
        ])->delete();
    }
};
