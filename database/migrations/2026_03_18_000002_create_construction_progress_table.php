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
        Schema::create('construction_progress', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('title')->default('Construction Progress');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->uuid('image_uid')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('construction_progress');
    }
};
