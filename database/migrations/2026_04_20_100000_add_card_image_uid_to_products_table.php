<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->uuid('card_image_uid')->nullable()->after('featured_image_uid');
            $table->foreign('card_image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['card_image_uid']);
            $table->dropColumn('card_image_uid');
        });
    }
};
