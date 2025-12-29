<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin User
        User::firstOrCreate(
            ['email' => 'superadmin@skyhouse.com'],
            [
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'full_name' => 'Super Admin',
                'password' => bcrypt('password'),
                'role' => 'superadmin',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // Create Staff User
        User::firstOrCreate(
            ['email' => 'staff@skyhouse.com'],
            [
                'name' => 'Staff Member',
                'username' => 'staff01',
                'full_name' => 'Staff Member One',
                'password' => bcrypt('password'),
                'role' => 'staff',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // Create Admin User (default)
        User::firstOrCreate(
            ['email' => 'admin@skyhouse.com'],
            [
                'name' => 'Admin SkyHouse',
                'username' => 'admin',
                'full_name' => 'Admin SkyHouse',
                'password' => bcrypt('password'),
                'role' => 'superadmin',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Admin users created successfully!');
    }
}
