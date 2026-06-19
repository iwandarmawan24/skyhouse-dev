<?php

namespace Database\Seeders;

use App\Models\Policy;
use Illuminate\Database\Seeder;

class PolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Policy::updateOrCreate(['type' => 'terms'], [
            'title'   => 'Syarat dan Ketentuan',
            'slug'    => 'syarat-dan-ketentuan',
            'content' => '<h2>Syarat dan Ketentuan</h2><p>Dengan mengakses dan menggunakan website ini, Anda setuju untuk terikat dengan syarat dan ketentuan berikut...</p>',
            'version' => '1.0',
        ]);

        Policy::updateOrCreate(['type' => 'privacy'], [
            'title'   => 'Kebijakan Privasi',
            'slug'    => 'kebijakan-privasi',
            'content' => '<h2>Kebijakan Privasi</h2><p>Kami menghargai privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda...</p>',
            'version' => '1.0',
        ]);
    }
}
