<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracker_events', function (Blueprint $table) {
            $table->id();
            $table->uuid('session_id')->nullable();
            $table->foreign('session_id')->references('id')->on('tracker_sessions')->onDelete('set null');

            // What happened
            $table->string('event_type', 60);     // page_view | click | contact_submit | wa_click …
            $table->string('event_target', 60)->nullable(); // unit | article | media | cta | page
            $table->string('target_id', 100)->nullable();   // UUID / slug of the resource
            $table->string('target_label', 200)->nullable();// human-readable label

            // Where it happened
            $table->string('page_url', 1000)->nullable();
            $table->string('referrer', 1000)->nullable();

            // Arbitrary extra context (UTM, subject, etc.)
            $table->jsonb('properties')->nullable();

            $table->timestamp('created_at')->useCurrent();

            $table->index(['session_id', 'created_at']);
            $table->index(['event_type', 'event_target']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracker_events');
    }
};
