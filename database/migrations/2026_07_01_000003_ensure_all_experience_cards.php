<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        $cards = [
            [
                'order'       => 0,
                'title'       => 'Effortless Grocery Shopping',
                'description' => 'Groceries made effortless. From everyday essentials to fresh produce, everything you need is just minutes away at AEON Store, All Fresh, Duta Buah, Pasar 8 Alam Sutera, and Rumah Buah.',
                'images'      => json_encode([
                    '/images/experiences/lifestyle/mall @ alam sutera.jpg',
                    '/images/experiences/lifestyle/revaeon.jpg',
                    '/images/experiences/lifestyle/revallfresh.jpg',
                    '/images/experiences/lifestyle/revdutabuah.jpg',
                    '/images/experiences/lifestyle/revpasar8.jpg',
                    '/images/experiences/lifestyle/revrumahbuah.jpg',
                ]),
            ],
            [
                'order'       => 1,
                'title'       => 'Urban Lifestyle Living',
                'description' => 'Enjoy seamless access to Jakarta Premium Outlet, IKEA, Mall @ Alam Sutera, Decathlon, Broadway at Flavor Bliss, and Living World Alam Sutera. Step outside and immerse yourself in a vibrant lifestyle destination where shopping, dining, leisure, and entertainment are always within reach.',
                'images'      => json_encode([
                    '/images/experiences/lifestyle/living-world-alamsutera.jpg',
                    '/images/experiences/lifestyle/ikea-alam-sutera.webp',
                    '/images/experiences/lifestyle/flavor-bliss.jpg',
                    '/images/experiences/lifestyle/jakarta-premium-outlet.jpg',
                    '/images/experiences/lifestyle/decathlon.jpg',
                ]),
            ],
            [
                'order'       => 2,
                'title'       => 'Top Universities Nearby',
                'description' => 'Located near Binus University, Bunda Mulia University, Swiss German University, BINUS ASO School of Engineering, providing access to more than 30,000 students.',
                'images'      => json_encode([
                    '/images/experiences/univ/binus-alsut.jpg',
                    '/images/experiences/univ/binus-aso.jpg',
                    '/images/experiences/univ/Bunda Mulia.jpg',
                    '/images/experiences/univ/sgu.jpeg',
                    '/images/experiences/univ/UBM.jpg',
                    '/images/experiences/univ/Binus.jpg',
                ]),
            ],
            [
                'order'       => 3,
                'title'       => 'Thriving Business Hub',
                'description' => 'A built-in ecosystem of professionals surrounded by Synergy Building, The Prominence, Alfa Tower, Menara Top Food, Prima Sejahtera Building, Kino Tower, and Marks Building.',
                'images'      => json_encode([
                    '/images/experiences/office/alfa-tower.jpg',
                    '/images/experiences/office/kino.jpg',
                    '/images/experiences/office/synergy-building.jpg',
                    '/images/experiences/office/marks-building.jpg',
                    '/images/experiences/office/menara-topfood.jpeg',
                    '/images/experiences/office/prima-sejahtra.jpg',
                ]),
            ],
        ];

        foreach ($cards as $card) {
            $existing = DB::table('homepage_experience_cards')
                ->where('order', $card['order'])
                ->first();

            if ($existing) {
                // Only fill in images if not already set
                if (empty($existing->images)) {
                    DB::table('homepage_experience_cards')
                        ->where('uid', $existing->uid)
                        ->update([
                            'images'     => $card['images'],
                            'updated_at' => now(),
                        ]);
                }
            } else {
                DB::table('homepage_experience_cards')->insert([
                    'uid'         => (string) Str::uuid(),
                    'title'       => $card['title'],
                    'description' => $card['description'],
                    'order'       => $card['order'],
                    'is_active'   => true,
                    'images'      => $card['images'],
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        //
    }
};
