<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_experience', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->text('main_description')->nullable();
            $table->string('card_daily_title')->nullable();
            $table->text('card_daily_description')->nullable();
            $table->string('card_entertainment_title')->nullable();
            $table->text('card_entertainment_description')->nullable();
            $table->string('card_university_title')->nullable();
            $table->text('card_university_description')->nullable();
            $table->string('card_business_title')->nullable();
            $table->text('card_business_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_experience');
    }
};
