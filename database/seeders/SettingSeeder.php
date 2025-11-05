<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'SkyHouse Property', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'Your Dream Property Partner', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Platform properti terpercaya di Indonesia', 'type' => 'textarea', 'group' => 'general'],

            // Contact
            ['key' => 'contact_phone', 'value' => '+62 812-3456-7890', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'info@skyhouse.com', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => 'Jl. Sudirman No. 123, Jakarta', 'type' => 'textarea', 'group' => 'contact'],
            ['key' => 'whatsapp_number', 'value' => '6281234567890', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'whatsapp_message', 'value' => 'Halo, saya tertarik dengan properti Anda', 'type' => 'text', 'group' => 'contact'],

            // Social Media
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/skyhouse', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/skyhouse', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/skyhouse', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/skyhouse', 'type' => 'text', 'group' => 'social'],

            // KPR Calculator
            ['key' => 'kpr_interest_rate', 'value' => '8.5', 'type' => 'number', 'group' => 'calculator'],
            ['key' => 'kpr_max_tenor', 'value' => '20', 'type' => 'number', 'group' => 'calculator'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
