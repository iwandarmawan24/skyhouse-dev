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
        Schema::create('product_images', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('product_uid');
            $table->foreign('product_uid')->references('uid')->on('products')->onDelete('cascade');
            $table->string('image_path');
            $table->integer('order')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            $table->index('product_uid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
