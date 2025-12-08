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
        // Main media table
        Schema::create('media_library', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->string('filename'); // Original filename
            $table->string('filepath'); // Path in storage
            $table->string('file_type', 50); // image, video, document, etc
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('file_size'); // in bytes
            $table->string('disk', 50)->default('public'); // storage disk

            // Image specific
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();

            // SEO & Metadata
            $table->string('alt_text')->nullable();
            $table->text('caption')->nullable();
            $table->text('description')->nullable();
            $table->json('metadata')->nullable(); // EXIF data, etc

            // Organization
            $table->string('folder')->nullable(); // Virtual folder for organization
            $table->json('tags')->nullable();

            // Tracking
            $table->uuid('uploaded_by')->nullable();
            $table->foreign('uploaded_by')->references('uid')->on('users')->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('file_type');
            $table->index('mime_type');
            $table->index('uploaded_by');
            $table->index('created_at');
        });

        // Media variants (thumbnails, different sizes)
        Schema::create('media_variants', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('media_uid');
            $table->foreign('media_uid')->references('uid')->on('media_library')->cascadeOnDelete();

            $table->string('variant_name', 50); // thumbnail, small, medium, large, original
            $table->string('filepath');
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('mime_type', 100)->nullable();

            $table->timestamps();

            // Indexes
            $table->index(['media_uid', 'variant_name']);
        });

        // Polymorphic relationship table (attach media to any model)
        Schema::create('mediables', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('media_uid');
            $table->foreign('media_uid')->references('uid')->on('media_library')->cascadeOnDelete();

            $table->uuid('mediable_uid'); // Can be product_uid, article_uid, etc
            $table->string('mediable_type'); // Product, Article, etc
            $table->string('field_name')->nullable(); // featured_image, gallery, logo, etc
            $table->unsignedInteger('order')->default(0); // For sorting in galleries

            $table->timestamps();

            // Indexes
            $table->index(['mediable_uid', 'mediable_type']);
            $table->index('media_uid');
            $table->index('field_name');
        });

        // Media usage tracking (to know where media is being used)
        Schema::create('media_usage', function (Blueprint $table) {
            $table->uuid('uid')->primary();
            $table->uuid('media_uid');
            $table->foreign('media_uid')->references('uid')->on('media_library')->cascadeOnDelete();

            $table->string('used_in_type'); // Product, Article, HeroBanner, etc
            $table->uuid('used_in_uid');
            $table->string('used_in_field')->nullable(); // Which field uses this media
            $table->timestamp('last_used_at')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('media_uid');
            $table->index(['used_in_type', 'used_in_uid']);
            $table->unique(['media_uid', 'used_in_type', 'used_in_uid', 'used_in_field'], 'media_usage_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_usage');
        Schema::dropIfExists('mediables');
        Schema::dropIfExists('media_variants');
        Schema::dropIfExists('media_library');
    }
};
