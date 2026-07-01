<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // Only insert if no card with order 0 exists
        $exists = DB::table('homepage_experience_cards')->where('order', 0)->exists();

        if (!$exists) {
            DB::table('homepage_experience_cards')->insert([
                'uid'         => (string) Str::uuid(),
                'title'       => 'Effortless Grocery Shopping',
                'description' => 'Groceries made effortless. From everyday essentials to fresh produce, everything you need is just minutes away at AEON Store, All Fresh, Duta Buah, Pasar 8 Alam Sutera, and Rumah Buah.',
                'order'       => 0,
                'is_active'   => true,
                'images'      => json_encode([
                    '/images/experiences/lifestyle/mall @ alam sutera.jpg',
                    '/images/experiences/lifestyle/revaeon.jpg',
                    '/images/experiences/lifestyle/revallfresh.jpg',
                    '/images/experiences/lifestyle/revdutabuah.jpg',
                    '/images/experiences/lifestyle/revpasar8.jpg',
                    '/images/experiences/lifestyle/revrumahbuah.jpg',
                ]),
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('homepage_experience_cards')->where('order', 0)->delete();
    }
};
