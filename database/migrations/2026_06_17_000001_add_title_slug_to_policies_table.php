<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('policies', function (Blueprint $table) {
            $table->string('title')->nullable()->after('uid');
            $table->string('slug')->nullable()->unique()->after('title');
        });

        // Expand the type check constraint for PostgreSQL
        DB::statement("ALTER TABLE policies DROP CONSTRAINT IF EXISTS policies_type_check");
        DB::statement("ALTER TABLE policies ADD CONSTRAINT policies_type_check CHECK (type IN ('terms', 'privacy', 'refund', 'shipping', 'other'))");
    }

    public function down(): void
    {
        Schema::table('policies', function (Blueprint $table) {
            $table->dropColumn(['title', 'slug']);
        });

        DB::statement("ALTER TABLE policies DROP CONSTRAINT IF EXISTS policies_type_check");
        DB::statement("ALTER TABLE policies ADD CONSTRAINT policies_type_check CHECK (type IN ('terms', 'privacy'))");
    }
};
