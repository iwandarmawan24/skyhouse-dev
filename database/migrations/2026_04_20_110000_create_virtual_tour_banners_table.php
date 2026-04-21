<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('virtual_tour_banners', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('image_uid')->nullable();
            $table->string('url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('image_uid')
                ->references('uid')
                ->on('media_library')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('virtual_tour_banners');
    }
};
