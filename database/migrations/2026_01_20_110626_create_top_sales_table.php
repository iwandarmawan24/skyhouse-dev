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
        Schema::create('top_sales', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('name');
            $table->integer('position')->default(1);
            $table->uuid('image_uid')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Foreign key
            $table->foreign('image_uid')->references('uid')->on('media_library')->onDelete('set null');

            // Indexes
            $table->index('position');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('top_sales');
    }
};
