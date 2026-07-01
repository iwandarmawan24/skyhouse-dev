<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('homepage_experience_cards', function (Blueprint $table) {
            $table->json('images')->nullable()->after('description');
        });

        $cardImages = [
            json_encode([
                '/images/experiences/lifestyle/living-world-alamsutera.jpg',
                '/images/experiences/lifestyle/ikea-alam-sutera.webp',
                '/images/experiences/lifestyle/flavor-bliss.jpg',
                '/images/experiences/lifestyle/jakarta-premium-outlet.jpg',
                '/images/experiences/lifestyle/decathlon.jpg',
            ]),
            json_encode([
                '/images/experiences/univ/binus-alsut.jpg',
                '/images/experiences/univ/binus-aso.jpg',
                '/images/experiences/univ/Bunda Mulia.jpg',
                '/images/experiences/univ/sgu.jpeg',
                '/images/experiences/univ/UBM.jpg',
                '/images/experiences/univ/Binus.jpg',
            ]),
            json_encode([
                '/images/experiences/office/alfa-tower.jpg',
                '/images/experiences/office/kino.jpg',
                '/images/experiences/office/synergy-building.jpg',
                '/images/experiences/office/marks-building.jpg',
                '/images/experiences/office/menara-topfood.jpeg',
                '/images/experiences/office/prima-sejahtra.jpg',
            ]),
        ];

        $existing = DB::table('homepage_experience_cards')->orderBy('order')->get();

        if ($existing->isEmpty()) {
            $defaults = [
                [
                    'uid'         => (string) Str::uuid(),
                    'title'       => 'Urban Lifestyle Living',
                    'description' => 'Enjoy seamless access to Jakarta Premium Outlet, IKEA, Mall @ Alam Sutera, Decathlon, Broadway at Flavor Bliss, and Living World Alam Sutera. Step outside and immerse yourself in a vibrant lifestyle destination where shopping, dining, leisure, and entertainment are always within reach.',
                    'order'       => 1,
                    'is_active'   => true,
                    'images'      => $cardImages[0],
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ],
                [
                    'uid'         => (string) Str::uuid(),
                    'title'       => 'Top Universities Nearby',
                    'description' => 'Located near Binus University, Bunda Mulia University, Swiss German University, BINUS ASO School of Engineering, providing access to more than 30,000 students.',
                    'order'       => 2,
                    'is_active'   => true,
                    'images'      => $cardImages[1],
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ],
                [
                    'uid'         => (string) Str::uuid(),
                    'title'       => 'Thriving Business Hub',
                    'description' => 'A built-in ecosystem of professionals surrounded by Synergy Building, The Prominence, Alfa Tower, Menara Top Food, Prima Sejahtera Building, Kino Tower, and Marks Building.',
                    'order'       => 3,
                    'is_active'   => true,
                    'images'      => $cardImages[2],
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ],
            ];

            DB::table('homepage_experience_cards')->insert($defaults);
        } else {
            foreach ($existing as $i => $card) {
                if (isset($cardImages[$i])) {
                    DB::table('homepage_experience_cards')
                        ->where('uid', $card->uid)
                        ->update(['images' => $cardImages[$i]]);
                }
            }
        }
    }

    public function down(): void
    {
        Schema::table('homepage_experience_cards', function (Blueprint $table) {
            $table->dropColumn('images');
        });
    }
};
