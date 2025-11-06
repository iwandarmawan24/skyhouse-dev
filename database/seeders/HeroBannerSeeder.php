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
                'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080',
                'button_text' => 'Lihat Properti',
                'button_link' => '/properties',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Investasi Properti Terpercaya',
                'description' => 'Dapatkan return on investment terbaik dengan properti premium kami',
                'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080',
                'button_text' => 'Hubungi Kami',
                'button_link' => '/contact',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Apartemen Modern di Pusat Kota',
                'description' => 'Nikmati kemudahan akses ke berbagai fasilitas kota',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080',
                'button_text' => 'Jelajahi',
                'button_link' => '/properties?type=apartment',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Villa Eksklusif dengan View Pegunungan',
                'description' => 'Hunian mewah dengan pemandangan alam yang memukau',
                'image' => 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080',
                'button_text' => 'Lihat Villa',
                'button_link' => '/properties?type=villa',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Rumah Cluster Premium',
                'description' => 'Lingkungan aman dan nyaman untuk keluarga Anda',
                'image' => 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080',
                'button_text' => 'Lihat Cluster',
                'button_link' => '/properties?type=cluster',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Ruko Strategis untuk Bisnis',
                'description' => 'Lokasi premium di jalur bisnis utama kota',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080',
                'button_text' => 'Lihat Ruko',
                'button_link' => '/properties?type=commercial',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Townhouse Minimalis Modern',
                'description' => 'Design kontemporer dengan efisiensi ruang maksimal',
                'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080',
                'button_text' => 'Lihat Townhouse',
                'button_link' => '/properties?type=townhouse',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Kavling Tanah Siap Bangun',
                'description' => 'Investasi jangka panjang dengan nilai yang terus meningkat',
                'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080',
                'button_text' => 'Lihat Kavling',
                'button_link' => '/properties?type=land',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Apartemen Studio Strategis',
                'description' => 'Perfect untuk young professional dan investasi',
                'image' => 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&h=1080',
                'button_text' => 'Lihat Studio',
                'button_link' => '/properties?type=studio',
                'order' => 9,
                'is_active' => true,
            ],
            [
                'title' => 'Rumah Subsidi Terjangkau',
                'description' => 'Wujudkan mimpi memiliki rumah dengan harga terjangkau',
                'image' => 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1920&h=1080',
                'button_text' => 'Info Subsidi',
                'button_link' => '/properties?category=subsidi',
                'order' => 10,
                'is_active' => true,
            ],
            [
                'title' => 'Penthouse Mewah dengan Rooftop',
                'description' => 'Luxury living di puncak gedung dengan view 360 derajat',
                'image' => 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1920&h=1080',
                'button_text' => 'Lihat Penthouse',
                'button_link' => '/properties?type=penthouse',
                'order' => 11,
                'is_active' => true,
            ],
            [
                'title' => 'Rumah Second dengan Harga Menarik',
                'description' => 'Properti berkualitas dengan harga lebih terjangkau',
                'image' => 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=1920&h=1080',
                'button_text' => 'Lihat Second',
                'button_link' => '/properties?condition=second',
                'order' => 12,
                'is_active' => false,
            ],
            [
                'title' => 'Kondominium Tepi Pantai',
                'description' => 'Hunian eksklusif dengan akses langsung ke pantai',
                'image' => 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&h=1080',
                'button_text' => 'Lihat Kondominium',
                'button_link' => '/properties?type=condo',
                'order' => 13,
                'is_active' => true,
            ],
            [
                'title' => 'Rumah Syariah Tanpa Riba',
                'description' => 'Kepemilikan halal dengan sistem pembayaran yang fleksibel',
                'image' => 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&h=1080',
                'button_text' => 'Info Syariah',
                'button_link' => '/properties?payment=syariah',
                'order' => 14,
                'is_active' => true,
            ],
            [
                'title' => 'Kost Eksklusif untuk Mahasiswa',
                'description' => 'Fasilitas lengkap dan lokasi dekat kampus',
                'image' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&h=1080',
                'button_text' => 'Lihat Kost',
                'button_link' => '/properties?type=kost',
                'order' => 15,
                'is_active' => false,
            ],
            [
                'title' => 'Rumah KPR dengan DP 0%',
                'description' => 'Program spesial tanpa down payment dari developer',
                'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&h=1080',
                'button_text' => 'Info KPR',
                'button_link' => '/properties?promo=dp-0',
                'order' => 16,
                'is_active' => true,
            ],
            [
                'title' => 'Rumah di Kawasan Elit',
                'description' => 'Prestige living dengan tetangga berkelas',
                'image' => 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080',
                'button_text' => 'Lihat Premium',
                'button_link' => '/properties?category=elite',
                'order' => 17,
                'is_active' => true,
            ],
            [
                'title' => 'Rumah Dekat MRT & LRT',
                'description' => 'Mobilitas tinggi dengan akses transportasi publik',
                'image' => 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&h=1080',
                'button_text' => 'Lihat Lokasi',
                'button_link' => '/properties?near=transit',
                'order' => 18,
                'is_active' => true,
            ],
            [
                'title' => 'Warehouse & Gudang Industri',
                'description' => 'Solusi penyimpanan untuk bisnis Anda',
                'image' => 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&h=1080',
                'button_text' => 'Lihat Warehouse',
                'button_link' => '/properties?type=warehouse',
                'order' => 19,
                'is_active' => false,
            ],
            [
                'title' => 'Smart Home Technology',
                'description' => 'Hunian pintar dengan sistem otomasi canggih',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080',
                'button_text' => 'Lihat Smart Home',
                'button_link' => '/properties?feature=smart-home',
                'order' => 20,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $banner) {
            HeroBanner::create($banner);
        }
    }
}
