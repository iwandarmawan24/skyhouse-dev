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
            ['key' => 'site_name', 'value' => 'Skyhouse Alamsutera', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'Living Beyond Expectation', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Skyhouse Alam Sutera is a premium residential development offering modern living spaces in the heart of Alam Sutera, Tangerang.', 'type' => 'textarea', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => 'https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png', 'type' => 'text', 'group' => 'general'],

            // Contact
            ['key' => 'contact_phone', 'value' => '+62 21 5088 9900', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'info@skyhousealamsutera.com', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => 'Jl. Alamsutera Boulevard No.88, Pakulonan Barat, Kelapa Dua, Tangerang, Banten 15810', 'type' => 'textarea', 'group' => 'contact'],
            ['key' => 'whatsapp_number', 'value' => '622150889900', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'whatsapp_message', 'value' => 'Halo, saya tertarik dengan properti Skyhouse Alamsutera', 'type' => 'text', 'group' => 'contact'],

            // Social Media
            ['key' => 'social_tiktok', 'value' => 'https://www.tiktok.com/@skyhousealamsutera', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_instagram', 'value' => 'https://www.instagram.com/skyhousealamsutera', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_linkedin', 'value' => 'https://www.linkedin.com/company/skyhousealamsutera', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_youtube', 'value' => 'https://www.youtube.com/@skyhousealamsutera', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_facebook', 'value' => 'https://www.facebook.com/skyhousealamsutera', 'type' => 'text', 'group' => 'social'],

            // SEO
            ['key' => 'seo_meta_title', 'value' => 'Skyhouse Alamsutera - Living Beyond Expectation', 'type' => 'text', 'group' => 'seo'],
            ['key' => 'seo_meta_description', 'value' => 'Discover premium residential living at Skyhouse Alam Sutera, Tangerang. Modern apartments with world-class facilities.', 'type' => 'textarea', 'group' => 'seo'],
            ['key' => 'seo_og_image', 'value' => '/images/default-og-image.jpg', 'type' => 'text', 'group' => 'seo'],

            // KPR Calculator
            ['key' => 'kpr_interest_rate', 'value' => '8.5', 'type' => 'number', 'group' => 'calculator'],
            ['key' => 'kpr_max_tenor', 'value' => '20', 'type' => 'number', 'group' => 'calculator'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
