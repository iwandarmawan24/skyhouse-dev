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
            $table->boolean('living_room')->default(false)->after('bathrooms');

            $table->dropColumn([
                'land_area',
                'building_area',
                'floors',
                'garage',
                'location',
                'city',
                'province',
                'latitude',
                'longitude',
                'room_area',
                'balcon_size',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('living_room');

            $table->decimal('land_area', 10, 2)->nullable();
            $table->decimal('building_area', 10, 2)->nullable();
            $table->integer('floors')->nullable();
            $table->integer('garage')->nullable();
            $table->string('location')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->decimal('room_area', 10, 2)->nullable();
            $table->decimal('balcon_size', 10, 2)->nullable();
        });
    }
};
