<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_banners', function (Blueprint $table) {
            $table->string('mobile_image')->nullable()->after('image_uid');
            $table->uuid('mobile_image_uid')->nullable()->after('mobile_image');

            $table->foreign('mobile_image_uid')
                ->references('uid')
                ->on('media_library')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('hero_banners', function (Blueprint $table) {
            $table->dropForeign(['mobile_image_uid']);
            $table->dropColumn(['mobile_image', 'mobile_image_uid']);
        });
    }
};
