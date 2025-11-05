<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Open House Cluster BSD',
                'description' => 'Dapatkan diskon spesial untuk pembelian pada hari ini!',
                'image' => 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800',
                'event_date' => now()->addDays(7),
                'location' => 'BSD Green Office Park',
                'registration_link' => 'https://wa.me/6281234567890',
                'max_participants' => 50,
                'is_active' => true,
            ],
            [
                'title' => 'Property Investment Seminar',
                'description' => 'Seminar gratis tentang investasi properti untuk pemula',
                'image' => 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
                'event_date' => now()->addDays(14),
                'location' => 'Hotel Borobudur Jakarta',
                'registration_link' => 'https://wa.me/6281234567890',
                'max_participants' => 100,
                'is_active' => true,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
