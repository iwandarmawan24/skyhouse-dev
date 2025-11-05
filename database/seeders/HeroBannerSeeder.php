<?php

namespace Database\Seeders;

use App\Models\HeroBanner;
use Illuminate\Database\Seeder;

class HeroBannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Temukan Rumah Impian Anda',
                'description' => 'Koleksi properti terbaik dengan lokasi strategis dan fasilitas lengkap',
                'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
                'button_text' => 'Lihat Properti',
                'button_link' => '/properties',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Investasi Properti Terpercaya',
                'description' => 'Dapatkan return on investment terbaik dengan properti premium kami',
                'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
                'button_text' => 'Hubungi Kami',
                'button_link' => '/contact',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Apartemen Modern di Pusat Kota',
                'description' => 'Nikmati kemudahan akses ke berbagai fasilitas kota',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
                'button_text' => 'Jelajahi',
                'button_link' => '/properties?type=apartment',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $banner) {
            HeroBanner::create($banner);
        }
    }
}
