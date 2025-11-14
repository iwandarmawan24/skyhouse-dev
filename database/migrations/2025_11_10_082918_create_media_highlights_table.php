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
        Schema::create('media_highlights', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('media_uid');
            $table->foreign('media_uid')->references('uid')->on('media')->onDelete('cascade');
            $table->string('title');
            $table->date('publish_date');
            $table->string('image')->nullable();
            $table->string('article_url');
            $table->timestamps();

            $table->index('media_uid');
            $table->index('publish_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_highlights');
    }
};
