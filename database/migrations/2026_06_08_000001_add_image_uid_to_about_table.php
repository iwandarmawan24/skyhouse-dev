<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about', function (Blueprint $table) {
            $table->uuid('image_uid')->nullable()->after('mission');
            $table->foreign('image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('about', function (Blueprint $table) {
            $table->dropForeign(['image_uid']);
            $table->dropColumn('image_uid');
        });
    }
};
