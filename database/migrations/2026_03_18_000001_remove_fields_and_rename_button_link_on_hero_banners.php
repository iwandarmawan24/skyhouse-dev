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
            $table->dropColumn(['title', 'description', 'button_text']);
            $table->renameColumn('button_link', 'banner_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_banners', function (Blueprint $table) {
            $table->renameColumn('banner_link', 'button_link');
            $table->string('title')->nullable()->after('uid');
            $table->text('description')->nullable()->after('title');
            $table->string('button_text', 100)->nullable()->after('image_uid');
        });
    }
};
