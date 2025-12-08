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
        Schema::table('products', function (Blueprint $table) {
            // Add featured image from media library
            $table->uuid('featured_image_uid')->nullable()->after('images');
            $table->foreign('featured_image_uid')->references('uid')->on('media_library')->nullOnDelete();

            // Add gallery images from media library (store as JSON array of UIDs)
            $table->json('gallery_uids')->nullable()->after('featured_image_uid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['featured_image_uid']);
            $table->dropColumn(['featured_image_uid', 'gallery_uids']);
        });
    }
};
