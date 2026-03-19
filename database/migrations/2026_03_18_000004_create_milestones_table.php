<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('milestones', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('year', 10);
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->uuid('image_uid')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('image_uid')->references('uid')->on('media_library')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('milestones');
    }
};
