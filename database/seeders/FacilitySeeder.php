<?php

namespace Database\Seeders;

use App\Models\Facility;
use App\Models\FacilityImage;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facilities = [
            [
                'name' => 'Swimming Pool',
                'description' => 'Kolam renang olympic size dengan pemandangan kota',
                'banner_image' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200',
                'order' => 1,
            ],
            [
                'name' => 'Fitness Center',
                'description' => 'Gym dengan peralatan lengkap dan modern',
                'banner_image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
                'order' => 2,
            ],
            [
                'name' => 'Children Playground',
                'description' => 'Area bermain anak yang aman dan nyaman',
                'banner_image' => 'https://images.unsplash.com/photo-1587818541565-5fc8c7f609df?w=1200',
                'order' => 3,
            ],
        ];

        foreach ($facilities as $facilityData) {
            $facility = Facility::create($facilityData);

            // Add gallery images
            for ($i = 1; $i <= 3; $i++) {
                FacilityImage::create([
                    'facility_id' => $facility->id,
                    'image_path' => $facilityData['banner_image'],
                    'order' => $i,
                ]);
            }
        }
    }
}
