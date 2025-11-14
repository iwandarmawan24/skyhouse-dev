<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->after('uid');
            $table->string('full_name')->nullable()->after('username');
            $table->enum('role', ['staff', 'superadmin'])->default('staff')->after('password');
            $table->enum('status', ['active', 'inactive'])->default('active')->after('role');
        });

        // Update existing users with default values
        DB::table('users')->whereNull('username')->update([
            'username' => DB::raw('LOWER(REPLACE(name, \' \', \'_\'))'),
            'full_name' => DB::raw('name'),
        ]);

        // Now make username unique and not nullable
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->nullable(false)->change();
            $table->string('full_name')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'full_name', 'role', 'status']);
        });
    }
};
