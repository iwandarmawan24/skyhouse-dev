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
        Schema::create('brochures', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('file_uid')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->foreign('file_uid')
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
        Schema::dropIfExists('brochures');
    }
};
