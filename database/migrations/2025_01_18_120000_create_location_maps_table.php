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
        Schema::create('location_maps', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('title')->default('Strategic Location Map');
            $table->string('image')->nullable(); // Direct upload (backward compatibility)
            $table->uuid('image_uid')->nullable(); // Media library reference
            $table->string('google_maps_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Foreign key to media library
            $table->foreign('image_uid')
                ->references('uid')
                ->on('media_library')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_maps');
    }
};
