<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

// Replaces the first-pass naive tracker_events table.
// Drops the old schema so 000001/000002 can recreate it cleanly.
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('tracker_events');
    }

    public function down(): void {}
};
