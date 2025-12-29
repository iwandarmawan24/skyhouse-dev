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
        Schema::table('media_highlights', function (Blueprint $table) {
            $table->uuid('image_uid')->nullable()->after('image');
            $table->foreign('image_uid')->references('uid')->on('media_library')->onDelete('set null');
            $table->index('image_uid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media_highlights', function (Blueprint $table) {
            $table->dropForeign(['image_uid']);
            $table->dropIndex(['image_uid']);
            $table->dropColumn('image_uid');
        });
    }
};
