<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin SkyHouse',
            'email' => 'admin@skyhouse.com',
            'password' => bcrypt('password'),
        ]);

        // Run all seeders
        $this->call([
            HeroBannerSeeder::class,
            ProductSeeder::class,
            ArticleCategorySeeder::class,
            ArticleSeeder::class,
            EventSeeder::class,
            FacilitySeeder::class,
            ContactSeeder::class,
            AboutSeeder::class,
            SettingSeeder::class,
            PolicySeeder::class,
        ]);
    }
}
