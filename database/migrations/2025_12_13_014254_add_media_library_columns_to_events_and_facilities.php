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
        // Add image_uid column to events table
        Schema::table('events', function (Blueprint $table) {
            $table->uuid('image_uid')->nullable()->after('image');
            $table->foreign('image_uid')
                ->references('uid')
                ->on('media_library')
                ->nullOnDelete();
        });

        // Add image_uids column to facilities table
        Schema::table('facilities', function (Blueprint $table) {
            $table->jsonb('image_uids')->nullable()->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['image_uid']);
            $table->dropColumn('image_uid');
        });

        Schema::table('facilities', function (Blueprint $table) {
            $table->dropColumn('image_uids');
        });
    }
};
