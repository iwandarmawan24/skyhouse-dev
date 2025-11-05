<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        About::create([
            'opening_statement' => 'SkyHouse Property adalah platform properti terpercaya yang membantu Anda menemukan rumah impian dengan mudah dan cepat.',
            'vision' => 'Menjadi platform properti terdepan di Indonesia yang memberikan solusi terbaik bagi setiap kebutuhan properti Anda.',
            'mission' => 'Memberikan pelayanan terbaik dalam membantu masyarakat menemukan properti yang sesuai dengan kebutuhan dan budget mereka.',
            'milestones' => [
                ['year' => '2020', 'title' => 'Pendirian Perusahaan', 'description' => 'Memulai perjalanan sebagai platform properti'],
                ['year' => '2021', 'title' => '100+ Properti Terjual', 'description' => 'Mencapai milestone penjualan pertama'],
                ['year' => '2023', 'title' => '500+ Happy Clients', 'description' => 'Melayani lebih dari 500 klien puas'],
                ['year' => '2025', 'title' => 'Ekspansi Nasional', 'description' => 'Membuka cabang di 10 kota besar'],
            ],
            'team' => [],
        ]);
    }
}
