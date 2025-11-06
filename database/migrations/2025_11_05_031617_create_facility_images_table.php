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
        Schema::create('facility_images', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('facility_uid');
            $table->foreign('facility_uid')->references('uid')->on('facilities')->onDelete('cascade');
            $table->string('image_path');
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->index('facility_uid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facility_images');
    }
};
