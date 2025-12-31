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
        Schema::create('instagram_galleries', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('image_uid');
            $table->integer('position')->unsigned(); // 1-6 for grid positions
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Foreign key
            $table->foreign('image_uid')->references('uid')->on('media_library')->onDelete('cascade');

            // Indexes
            $table->index('position');
            $table->index('is_active');

            // Ensure position is unique
            $table->unique('position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instagram_galleries');
    }
};
