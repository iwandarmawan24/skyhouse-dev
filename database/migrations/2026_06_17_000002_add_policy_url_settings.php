<?php

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $settings = [
            ['key' => 'terms_url',   'value' => '/terms',   'type' => 'text', 'group' => 'general'],
            ['key' => 'privacy_url', 'value' => '/privacy', 'type' => 'text', 'group' => 'general'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }

    public function down(): void
    {
        Setting::whereIn('key', ['terms_url', 'privacy_url'])->delete();
    }
};
