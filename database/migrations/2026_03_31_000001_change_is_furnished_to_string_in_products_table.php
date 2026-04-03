<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Convert boolean to string
        Schema::table('products', function (Blueprint $table) {
            $table->string('is_furnished', 50)->nullable()->default(null)->change();
        });

        // Migrate existing data: true -> 'furnished', false -> 'unfurnished'
        DB::table('products')->where('is_furnished', '1')->update(['is_furnished' => 'furnished']);
        DB::table('products')->where('is_furnished', '0')->update(['is_furnished' => 'unfurnished']);
        DB::table('products')->whereNull('is_furnished')->update(['is_furnished' => 'unfurnished']);
    }

    public function down(): void
    {
        DB::table('products')->where('is_furnished', 'furnished')->update(['is_furnished' => '1']);
        DB::table('products')->where('is_furnished', 'semi-furnished')->update(['is_furnished' => '1']);
        DB::table('products')->whereNotIn('is_furnished', ['furnished', 'semi-furnished'])->update(['is_furnished' => '0']);

        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_furnished')->default(false)->change();
        });
    }
};
