<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckUserRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:check-role {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check user role and status by email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');

        $user = \App\Models\User::where('email', $email)->first();

        if (!$user) {
            $this->error("User with email '{$email}' not found!");
            return 1;
        }

        $this->info("User Details:");
        $this->table(
            ['Field', 'Value'],
            [
                ['UID', $user->uid],
                ['Name', $user->name],
                ['Full Name', $user->full_name],
                ['Email', $user->email],
                ['Role', $user->role ?? 'NULL'],
                ['Status', $user->status ?? 'NULL'],
                ['Is Active?', $user->isActive() ? 'Yes' : 'No'],
                ['Is SuperAdmin?', $user->isSuperAdmin() ? 'Yes' : 'No'],
            ]
        );

        return 0;
    }
}
