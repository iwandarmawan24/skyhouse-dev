<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracker_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Privacy: hashed IP (SHA-256 with daily-rotating salt), never raw
            $table->string('ip_hash', 64)->nullable();

            // Parsed from user-agent; raw UA is never stored
            $table->string('device_type', 20)->nullable();  // desktop | mobile | tablet
            $table->string('browser', 40)->nullable();       // Chrome | Firefox | Safari …
            $table->string('os', 40)->nullable();             // Windows | macOS | Android …

            $table->string('landing_page', 1000)->nullable();
            $table->string('referrer', 1000)->nullable();
            $table->string('utm_source', 100)->nullable();
            $table->string('utm_medium', 100)->nullable();
            $table->string('utm_campaign', 200)->nullable();

            $table->timestamp('first_seen')->useCurrent();
            $table->timestamp('last_seen')->useCurrent();

            $table->index('ip_hash');
            $table->index('first_seen');
            $table->index(['device_type', 'browser']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracker_sessions');
    }
};
