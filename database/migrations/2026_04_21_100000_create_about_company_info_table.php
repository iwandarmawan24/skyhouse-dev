<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_company_info', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('heading_line_1')->nullable();
            $table->string('heading_line_2')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_company_info');
    }
};
