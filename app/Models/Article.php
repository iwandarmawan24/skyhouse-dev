<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Article extends Model
{
    protected $primaryKey = 'uid';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'article_category_uid',
        'user_uid',
        'author_uid',
        'editor_uid',
        'title',
        'subtitle',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'video_url',
        'tags',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'focus_keywords',
        'seo_score',
        'type',
        'external_url',
        'views',
        'is_featured',
        'is_published',
        'published_at',
        'status',
        'scheduled_at',
        'last_edited_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
        'last_edited_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->uid)) {
                $article->uid = (string) Str::uuid();
            }
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    /**
     * Get the category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ArticleCategory::class, 'article_category_uid', 'uid');
    }

    /**
     * Get the author
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_uid', 'uid');
    }

    /**
     * Get the editor
     */
    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'editor_uid', 'uid');
    }

    /**
     * Get the user (creator)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_uid', 'uid');
    }

    /**
     * Scope published articles
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope featured articles
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Increment views
     */
    public function incrementViews()
    {
        $this->increment('views');
    }
}
