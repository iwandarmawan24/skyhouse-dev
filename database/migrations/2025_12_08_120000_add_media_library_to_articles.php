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
        Schema::table('articles', function (Blueprint $table) {
            // Add featured image from media library
            $table->uuid('featured_image_uid')->nullable()->after('featured_image');
            $table->foreign('featured_image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['featured_image_uid']);
            $table->dropColumn('featured_image_uid');
        });
    }
};
