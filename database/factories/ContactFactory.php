<?php

namespace Database\Factories;

use App\Models\ContactSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    protected $model = ContactSubmission::class;

    private static array $subjects = [
        'inquiry',
        'purchase',
        'visit',
        'other',
    ];

    private static array $residences = [
        'Jakarta Selatan',
        'Jakarta Barat',
        'Jakarta Utara',
        'Tangerang',
        'Tangerang Selatan',
        'Bekasi',
        'Depok',
        'Bogor',
        'Serpong',
        'BSD City',
    ];

    private static array $projects = [
        'kinary',
        'skyhouse',
    ];

    private static array $messages = [
        'inquiry'  => 'Saya tertarik dengan properti ini. Mohon informasi lebih lanjut mengenai harga dan fasilitas yang tersedia.',
        'purchase' => 'Tolong berikan simulasi cicilan KPR beserta opsi tenor yang tersedia untuk properti ini.',
        'visit'    => 'Apakah bisa mengatur jadwal untuk survey lokasi? Saya ingin melihat langsung kondisi unit.',
        'other'    => 'Apakah ada promo khusus atau cashback untuk pembelian unit bulan ini?',
    ];

    public function definition(): array
    {
        $faker   = \Faker\Factory::create('id_ID');
        $subject = $faker->randomElement(self::$subjects);

        return [
            'full_name' => $faker->name(),
            'residence' => $faker->randomElement(self::$residences),
            'email'     => $faker->unique()->safeEmail(),
            'phone'     => '08' . $faker->numerify('#########'),
            'subject'   => $subject,
            'project'   => $faker->randomElement(self::$projects),
            'message'   => self::$messages[$subject],
            'status'    => $faker->randomElement(['new', 'in_progress', 'resolved']),
            'notes'     => $faker->boolean(30) ? $faker->sentence() : null,
        ];
    }
}
