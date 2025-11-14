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
        Schema::table('articles', function (Blueprint $table) {
            // Add subtitle after title
            $table->string('subtitle')->nullable()->after('title');

            // Add video URL
            $table->string('video_url')->nullable()->after('featured_image');

            // Add author and editor UIDs
            $table->uuid('author_uid')->nullable()->after('user_uid');
            $table->foreign('author_uid')->references('uid')->on('users')->onDelete('set null');

            $table->uuid('editor_uid')->nullable()->after('author_uid');
            $table->foreign('editor_uid')->references('uid')->on('users')->onDelete('set null');

            // Add SEO fields
            $table->string('meta_title')->nullable()->after('meta_description');
            $table->text('meta_keywords')->nullable()->after('meta_title');
            $table->text('focus_keywords')->nullable()->after('meta_keywords');
            $table->integer('seo_score')->default(0)->after('focus_keywords');

            // Add status for draft/scheduled/published
            $table->enum('status', ['draft', 'scheduled', 'published'])->default('draft')->after('is_published');

            // Add scheduled_at for scheduled publishing
            $table->timestamp('scheduled_at')->nullable()->after('published_at');

            // Add last edited timestamp
            $table->timestamp('last_edited_at')->nullable()->after('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['author_uid']);
            $table->dropForeign(['editor_uid']);
            $table->dropColumn([
                'subtitle',
                'video_url',
                'author_uid',
                'editor_uid',
                'meta_title',
                'meta_keywords',
                'focus_keywords',
                'seo_score',
                'status',
                'scheduled_at',
                'last_edited_at'
            ]);
        });
    }
};
