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
        Schema::create('construction_progress_items', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('construction_progress_uid');
            $table->date('progress_date');
            $table->uuid('image_uid')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('construction_progress_uid')->references('uid')->on('construction_progress')->cascadeOnDelete();
            $table->foreign('image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('construction_progress_items');
    }
};
