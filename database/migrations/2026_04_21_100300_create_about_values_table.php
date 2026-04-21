<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_values', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('icon_emoji', 16)->nullable();
            $table->uuid('icon_uid')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('icon_uid')
                ->references('uid')
                ->on('media_library')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_values');
    }
};
