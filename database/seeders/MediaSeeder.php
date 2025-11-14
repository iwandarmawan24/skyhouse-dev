<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\MediaHighlight;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Indonesian Media Outlets
        $kompas = Media::create([
            'name' => 'Kompas',
            'logo' => 'media/logos/kompas.png',
            'is_active' => true,
        ]);

        $detik = Media::create([
            'name' => 'Detik.com',
            'logo' => 'media/logos/detik.png',
            'is_active' => true,
        ]);

        $tempo = Media::create([
            'name' => 'Tempo',
            'logo' => 'media/logos/tempo.png',
            'is_active' => true,
        ]);

        $cnnindonesia = Media::create([
            'name' => 'CNN Indonesia',
            'logo' => 'media/logos/cnn-indonesia.png',
            'is_active' => true,
        ]);

        $tribun = Media::create([
            'name' => 'Tribun News',
            'logo' => 'media/logos/tribun.png',
            'is_active' => true,
        ]);

        // International Media Outlets
        $bbc = Media::create([
            'name' => 'BBC News',
            'logo' => 'media/logos/bbc.png',
            'is_active' => true,
        ]);

        $cnn = Media::create([
            'name' => 'CNN',
            'logo' => 'media/logos/cnn.png',
            'is_active' => true,
        ]);

        $reuters = Media::create([
            'name' => 'Reuters',
            'logo' => 'media/logos/reuters.png',
            'is_active' => true,
        ]);

        $aljazeera = Media::create([
            'name' => 'Al Jazeera',
            'logo' => 'media/logos/aljazeera.png',
            'is_active' => true,
        ]);

        $guardian = Media::create([
            'name' => 'The Guardian',
            'logo' => 'media/logos/guardian.png',
            'is_active' => true,
        ]);

        // Create sample highlights for Kompas
        MediaHighlight::create([
            'media_uid' => $kompas->uid,
            'title' => 'Perkembangan Ekonomi Indonesia di Kuartal Keempat 2024',
            'publish_date' => Carbon::now()->subDays(2),
            'image' => 'media/highlights/kompas-ekonomi.jpg',
            'article_url' => 'https://kompas.com/read/2024/ekonomi-indonesia-q4',
        ]);

        MediaHighlight::create([
            'media_uid' => $kompas->uid,
            'title' => 'Teknologi AI Mulai Diterapkan di Berbagai Sektor Industri',
            'publish_date' => Carbon::now()->subDays(5),
            'image' => 'media/highlights/kompas-tech.jpg',
            'article_url' => 'https://kompas.com/read/2024/ai-industri',
        ]);

        // Create sample highlights for Detik
        MediaHighlight::create([
            'media_uid' => $detik->uid,
            'title' => 'Breaking News: Kebijakan Baru Pemerintah tentang Pajak Digital',
            'publish_date' => Carbon::now()->subDay(),
            'image' => 'media/highlights/detik-pajak.jpg',
            'article_url' => 'https://detik.com/finance/kebijakan-pajak-digital',
        ]);

        MediaHighlight::create([
            'media_uid' => $detik->uid,
            'title' => 'Olahraga: Timnas Indonesia Raih Prestasi di Turnamen Internasional',
            'publish_date' => Carbon::now()->subDays(3),
            'image' => 'media/highlights/detik-sport.jpg',
            'article_url' => 'https://detik.com/sport/timnas-prestasi',
        ]);

        // Create sample highlights for Tempo
        MediaHighlight::create([
            'media_uid' => $tempo->uid,
            'title' => 'Investigasi: Dampak Perubahan Iklim terhadap Pertanian',
            'publish_date' => Carbon::now()->subDays(4),
            'image' => 'media/highlights/tempo-climate.jpg',
            'article_url' => 'https://tempo.co/read/investigasi-iklim-pertanian',
        ]);

        MediaHighlight::create([
            'media_uid' => $tempo->uid,
            'title' => 'Profil: Startup Indonesia yang Mendunia',
            'publish_date' => Carbon::now()->subDays(7),
            'image' => 'media/highlights/tempo-startup.jpg',
            'article_url' => 'https://tempo.co/read/profil-startup-indonesia',
        ]);

        // Create sample highlights for CNN Indonesia
        MediaHighlight::create([
            'media_uid' => $cnnindonesia->uid,
            'title' => 'Politik: Dinamika Pemilihan Kepala Daerah 2024',
            'publish_date' => Carbon::now()->subDays(1),
            'image' => 'media/highlights/cnni-politik.jpg',
            'article_url' => 'https://cnnindonesia.com/nasional/pilkada-2024',
        ]);

        MediaHighlight::create([
            'media_uid' => $cnnindonesia->uid,
            'title' => 'Kesehatan: Terobosan Baru dalam Pengobatan Kanker',
            'publish_date' => Carbon::now()->subDays(6),
            'image' => 'media/highlights/cnni-health.jpg',
            'article_url' => 'https://cnnindonesia.com/gaya-hidup/kesehatan-kanker',
        ]);

        // Create sample highlights for Tribun News
        MediaHighlight::create([
            'media_uid' => $tribun->uid,
            'title' => 'Regional: Pembangunan Infrastruktur di Indonesia Timur',
            'publish_date' => Carbon::now()->subDays(3),
            'image' => 'media/highlights/tribun-infra.jpg',
            'article_url' => 'https://tribunnews.com/regional/infrastruktur-timur',
        ]);

        // Create sample highlights for BBC
        MediaHighlight::create([
            'media_uid' => $bbc->uid,
            'title' => 'Global Climate Summit Reaches Historic Agreement',
            'publish_date' => Carbon::now()->subDays(2),
            'image' => 'media/highlights/bbc-climate.jpg',
            'article_url' => 'https://bbc.com/news/climate-summit-agreement',
        ]);

        MediaHighlight::create([
            'media_uid' => $bbc->uid,
            'title' => 'Technology: The Future of Quantum Computing',
            'publish_date' => Carbon::now()->subDays(8),
            'image' => 'media/highlights/bbc-quantum.jpg',
            'article_url' => 'https://bbc.com/technology/quantum-computing',
        ]);

        // Create sample highlights for CNN
        MediaHighlight::create([
            'media_uid' => $cnn->uid,
            'title' => 'US Elections: Latest Updates and Analysis',
            'publish_date' => Carbon::now()->subHours(12),
            'image' => 'media/highlights/cnn-election.jpg',
            'article_url' => 'https://cnn.com/politics/election-updates',
        ]);

        MediaHighlight::create([
            'media_uid' => $cnn->uid,
            'title' => 'Business: Markets React to Federal Reserve Decision',
            'publish_date' => Carbon::now()->subDays(4),
            'image' => 'media/highlights/cnn-markets.jpg',
            'article_url' => 'https://cnn.com/business/fed-markets',
        ]);

        // Create sample highlights for Reuters
        MediaHighlight::create([
            'media_uid' => $reuters->uid,
            'title' => 'Global Economy: Emerging Markets Show Strong Growth',
            'publish_date' => Carbon::now()->subDays(3),
            'image' => 'media/highlights/reuters-economy.jpg',
            'article_url' => 'https://reuters.com/markets/emerging-growth',
        ]);

        MediaHighlight::create([
            'media_uid' => $reuters->uid,
            'title' => 'Energy: Renewable Sources Reach New Milestone',
            'publish_date' => Carbon::now()->subDays(5),
            'image' => 'media/highlights/reuters-energy.jpg',
            'article_url' => 'https://reuters.com/business/energy/renewable-milestone',
        ]);

        // Create sample highlights for Al Jazeera
        MediaHighlight::create([
            'media_uid' => $aljazeera->uid,
            'title' => 'Middle East: Diplomatic Breakthrough in Regional Talks',
            'publish_date' => Carbon::now()->subDays(1),
            'image' => 'media/highlights/aljazeera-diplomacy.jpg',
            'article_url' => 'https://aljazeera.com/news/middle-east-talks',
        ]);

        MediaHighlight::create([
            'media_uid' => $aljazeera->uid,
            'title' => 'Asia Pacific: Economic Integration Deepens',
            'publish_date' => Carbon::now()->subDays(6),
            'image' => 'media/highlights/aljazeera-asia.jpg',
            'article_url' => 'https://aljazeera.com/economy/asia-integration',
        ]);

        // Create sample highlights for The Guardian
        MediaHighlight::create([
            'media_uid' => $guardian->uid,
            'title' => 'Environment: New Study Reveals Ocean Conservation Success',
            'publish_date' => Carbon::now()->subDays(2),
            'image' => 'media/highlights/guardian-ocean.jpg',
            'article_url' => 'https://theguardian.com/environment/ocean-conservation',
        ]);

        MediaHighlight::create([
            'media_uid' => $guardian->uid,
            'title' => 'Culture: The Rise of Digital Art in Modern Museums',
            'publish_date' => Carbon::now()->subDays(9),
            'image' => 'media/highlights/guardian-art.jpg',
            'article_url' => 'https://theguardian.com/culture/digital-art-museums',
        ]);

        $this->command->info('Media outlets and highlights seeded successfully!');
        $this->command->info('Created ' . Media::count() . ' media outlets');
        $this->command->info('Created ' . MediaHighlight::count() . ' media highlights');
    }
}
