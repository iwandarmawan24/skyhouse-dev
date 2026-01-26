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
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_balcon_exist')->default(false)->after('garage');
            $table->decimal('balcon_size', 10, 2)->nullable()->after('is_balcon_exist');
            $table->decimal('room_area', 10, 2)->nullable()->after('balcon_size');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['is_balcon_exist', 'balcon_size', 'room_area']);
        });
    }
};
