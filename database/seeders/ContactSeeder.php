<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product = Product::first();

        $contacts = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'phone' => '081234567890',
                'subject' => 'Informasi Properti',
                'product_uid' => $product ? $product->uid : null,
                'message' => 'Saya tertarik dengan properti ini. Mohon informasi lebih lanjut.',
                'is_read' => false,
            ],
            [
                'name' => 'Ani Wijaya',
                'email' => 'ani@example.com',
                'phone' => '081234567891',
                'subject' => 'Jadwal Survey',
                'product_uid' => $product ? $product->uid : null,
                'message' => 'Apakah bisa mengatur jadwal untuk survey lokasi?',
                'is_read' => true,
            ],
        ];

        foreach ($contacts as $contact) {
            Contact::create($contact);
        }
    }
}
