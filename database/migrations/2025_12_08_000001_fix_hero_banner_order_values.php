<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Get all hero banners ordered by created_at (or you can use a different logic)
        $banners = DB::table('hero_banners')
            ->orderBy('created_at', 'asc')
            ->get();

        // Assign unique sequential order values
        foreach ($banners as $index => $banner) {
            DB::table('hero_banners')
                ->where('uid', $banner->uid)
                ->update(['order' => $index + 1]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reset all orders to 0
        DB::table('hero_banners')->update(['order' => 0]);
    }
};
