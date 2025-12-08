<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hero_banners', function (Blueprint $table) {
            // Add image from media library
            $table->uuid('image_uid')->nullable()->after('image_path');
            $table->foreign('image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_banners', function (Blueprint $table) {
            $table->dropForeign(['image_uid']);
            $table->dropColumn('image_uid');
        });
    }
};
