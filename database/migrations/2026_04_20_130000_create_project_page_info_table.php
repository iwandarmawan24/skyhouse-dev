<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_page_info', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('banner_image_uid')->nullable();
            $table->string('title')->nullable();
            $table->string('subtitle', 500)->nullable();
            $table->timestamps();

            $table->foreign('banner_image_uid')
                ->references('uid')
                ->on('media_library')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_page_info');
    }
};
