<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Rumah Mewah Bintaro',
                'type' => 'house',
                'description' => 'Rumah mewah 2 lantai dengan desain modern minimalis di kawasan Bintaro yang strategis. Dilengkapi dengan taman luas dan carport untuk 2 mobil.',
                'price' => 2500000000,
                'land_area' => 200,
                'building_area' => 180,
                'bedrooms' => 4,
                'bathrooms' => 3,
                'floors' => 2,
                'garage' => 2,
                'location' => 'Jl. Bintaro Utama Sektor 9',
                'city' => 'Tangerang Selatan',
                'province' => 'Banten',
                'latitude' => -6.2745,
                'longitude' => 106.7546,
                'facilities' => ['Swimming Pool', 'Garden', 'Security 24/7', 'CCTV', 'Smart Home'],
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Apartemen Green Bay Pluit',
                'type' => 'apartment',
                'description' => 'Apartemen studio fully furnished di Green Bay Pluit dengan view laut yang menakjubkan. Lokasi strategis dekat dengan mall dan transportasi umum.',
                'price' => 850000000,
                'building_area' => 35,
                'bedrooms' => 1,
                'bathrooms' => 1,
                'floors' => 1,
                'garage' => 1,
                'location' => 'Green Bay Pluit Tower Manhattan',
                'city' => 'Jakarta Utara',
                'province' => 'DKI Jakarta',
                'latitude' => -6.1184,
                'longitude' => 106.7897,
                'facilities' => ['Swimming Pool', 'Gym', 'Playground', 'Jogging Track', 'Mini Market'],
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Rumah Cluster BSD',
                'type' => 'house',
                'description' => 'Rumah cluster modern dengan konsep green living di BSD City. One gate system dengan fasilitas lengkap.',
                'price' => 1800000000,
                'land_area' => 120,
                'building_area' => 90,
                'bedrooms' => 3,
                'bathrooms' => 2,
                'floors' => 2,
                'garage' => 1,
                'location' => 'BSD Green Office Park',
                'city' => 'Tangerang Selatan',
                'province' => 'Banten',
                'latitude' => -6.3024,
                'longitude' => 106.6494,
                'facilities' => ['Clubhouse', 'Jogging Track', 'Playground', 'Security 24/7'],
                'is_featured' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Kavling Tanah Sentul City',
                'type' => 'land',
                'description' => 'Kavling tanah siap bangun di Sentul City dengan view pegunungan. Cocok untuk investasi jangka panjang atau bangun rumah impian.',
                'price' => 500000000,
                'land_area' => 250,
                'location' => 'Sentul City Residence',
                'city' => 'Bogor',
                'province' => 'Jawa Barat',
                'latitude' => -6.5623,
                'longitude' => 106.9304,
                'facilities' => ['Mountain View', 'Clean Water', 'Electricity', 'Paved Road'],
                'is_featured' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Apartemen Taman Anggrek',
                'type' => 'apartment',
                'description' => 'Apartemen 2 bedroom di Taman Anggrek dengan akses langsung ke mall. Ideal untuk keluarga muda atau investasi.',
                'price' => 1200000000,
                'building_area' => 58,
                'bedrooms' => 2,
                'bathrooms' => 1,
                'floors' => 1,
                'garage' => 1,
                'location' => 'Taman Anggrek Residence',
                'city' => 'Jakarta Barat',
                'province' => 'DKI Jakarta',
                'latitude' => -6.1781,
                'longitude' => 106.7914,
                'facilities' => ['Swimming Pool', 'Gym', 'Mall Access', 'Security 24/7'],
                'is_featured' => true,
                'is_active' => true,
            ],
        ];

        foreach ($products as $productData) {
            $product = Product::create($productData);

            // Add dummy images for each product
            for ($i = 1; $i <= 3; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => "https://images.unsplash.com/photo-" . (1600596542815 + $product->id + $i) . "?w=800",
                    'order' => $i,
                    'is_primary' => $i === 1,
                ]);
            }
        }
    }
}
