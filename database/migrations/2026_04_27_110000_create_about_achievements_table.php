<?php

use App\Models\AboutAchievement;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_achievements', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('number', 64);
            $table->string('label', 255);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        $defaults = [
            ['number' => '50+', 'label' => 'Projects Completed'],
            ['number' => '5,000+', 'label' => 'Happy Families'],
            ['number' => '15+', 'label' => 'Industry Awards'],
            ['number' => '99%', 'label' => 'Customer Satisfaction'],
        ];

        foreach ($defaults as $index => $row) {
            AboutAchievement::create([
                'number' => $row['number'],
                'label' => $row['label'],
                'order' => $index + 1,
                'is_active' => true,
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('about_achievements');
    }
};
