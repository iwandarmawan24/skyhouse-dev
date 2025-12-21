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
        Schema::table('events', function (Blueprint $table) {
            // Check if columns don't exist before adding
            if (!Schema::hasColumn('events', 'meta_title')) {
                $table->string('meta_title')->nullable()->after('slug');
            }
            if (!Schema::hasColumn('events', 'meta_description')) {
                $table->text('meta_description')->nullable()->after('meta_title');
            }
            if (!Schema::hasColumn('events', 'meta_keywords')) {
                $table->string('meta_keywords')->nullable()->after('meta_description');
            }
            if (!Schema::hasColumn('events', 'focus_keyword')) {
                $table->string('focus_keyword')->nullable()->after('meta_keywords');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $columns = ['meta_title', 'meta_description', 'meta_keywords', 'focus_keyword'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('events', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
