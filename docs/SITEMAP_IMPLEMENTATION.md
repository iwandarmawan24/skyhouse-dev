# Sitemap Implementation Guide

## Overview

This document describes the sitemap implementation for the Skyhouse project using the `spatie/laravel-sitemap` package. The sitemap automatically generates SEO-friendly XML sitemaps that include static pages, dynamic product listings, and published articles.

## Package Information

- **Package**: `spatie/laravel-sitemap`
- **Version**: ^7.4
- **Documentation**: https://github.com/spatie/laravel-sitemap

## Architecture

The sitemap implementation consists of four main components:

1. **SitemapService** - Core service class that generates the sitemap
2. **GenerateSitemap Command** - Artisan command for manual/scheduled generation
3. **Sitemap Route** - Public endpoint that serves the sitemap XML
4. **Scheduled Task** - Daily automatic regeneration

## Installation

### 1. Install Dependencies

Run composer to install the package:

```bash
composer install
```

The package has already been added to `composer.json`:

```json
"spatie/laravel-sitemap": "^7.4"
```

### 2. Clear Cache (Optional)

If you've already generated a sitemap, clear the cache:

```bash
php artisan cache:clear
```

## File Structure

```
app/
├── Console/
│   └── Commands/
│       └── GenerateSitemap.php      # Artisan command
└── Services/
    └── SitemapService.php           # Core service logic

routes/
├── web.php                          # Sitemap route
└── console.php                      # Scheduling configuration
```

## Components

### 1. SitemapService (`app/Services/SitemapService.php`)

The main service class that handles sitemap generation.

**Key Methods:**

- `generate()` - Main method that generates the complete sitemap
- `addStaticPages()` - Adds fixed pages (home, about, etc.)
- `addProductPages()` - Adds dynamic product pages
- `addArticlePages()` - Adds published article pages

**Static Pages Included:**

| URL | Priority | Change Frequency |
|-----|----------|------------------|
| `/` | 1.0 | Weekly |
| `/project` | 0.9 | Weekly |
| `/news` | 0.8 | Daily |
| `/about` | 0.7 | Monthly |
| `/contact-us` | 0.6 | Monthly |

**Dynamic Pages:**

- **Products**: `/products/{slug}` - Priority 0.8, Weekly updates
  - Only includes active products (`is_active=true`, `is_sold=false`)
  - Ordered by `updated_at` descending

- **Articles**: `/news/{slug}` - Priority 0.7, Monthly updates
  - Only includes published articles (`is_published=true`)
  - Ordered by `published_at` descending

### 2. GenerateSitemap Command (`app/Console/Commands/GenerateSitemap.php`)

Artisan command for generating and caching the sitemap.

**Usage:**

```bash
php artisan sitemap:generate
```

**Features:**

- Generates sitemap using SitemapService
- Caches result for 7 days
- Returns success/failure status
- Displays progress messages

**Output:**

```
Generating sitemap...
Sitemap generated and cached successfully!
```

### 3. Sitemap Route (`routes/web.php`)

Public endpoint that serves the sitemap XML.

**URL:** `/sitemap.xml`

**Behavior:**

1. Checks cache for existing sitemap
2. If cache miss, generates sitemap on-the-fly
3. Returns XML with proper content-type header

**Example:**

```php
Route::get('/sitemap.xml', function () {
    return response(
        Cache::get('sitemap') ?? app(\App\Services\SitemapService::class)->generate()->render(),
        200
    )->header('Content-Type', 'application/xml');
})->name('sitemap');
```

### 4. Scheduled Task (`routes/console.php`)

Automatic daily regeneration of the sitemap.

```php
Schedule::command('sitemap:generate')->daily();
```

**Schedule Details:**

- **Frequency**: Daily at midnight
- **Command**: `sitemap:generate`
- **Cache Duration**: 7 days (will be refreshed daily)

## Usage

### Manual Generation

Generate sitemap manually via Artisan:

```bash
php artisan sitemap:generate
```

### Accessing the Sitemap

Visit the sitemap URL in your browser or tool:

```
https://yourdomain.com/sitemap.xml
```

### Testing Locally

```bash
# Start development server
php artisan serve

# Visit in browser
http://localhost:8000/sitemap.xml
```

### Cache Management

Clear sitemap cache if needed:

```bash
# Clear all cache
php artisan cache:clear

# Or clear specific cache key
php artisan tinker
>>> Cache::forget('sitemap')
```

## Configuration

### Adjusting Cache Duration

Edit `app/Console/Commands/GenerateSitemap.php`:

```php
// Change from 7 days to your preferred duration
Cache::put('sitemap', $sitemap->render(), now()->addDays(7));

// Examples:
Cache::put('sitemap', $sitemap->render(), now()->addHours(12));  // 12 hours
Cache::put('sitemap', $sitemap->render(), now()->addDays(30));   // 30 days
```

### Changing Schedule Frequency

Edit `routes/console.php`:

```php
// Daily (default)
Schedule::command('sitemap:generate')->daily();

// Hourly
Schedule::command('sitemap:generate')->hourly();

// Twice daily
Schedule::command('sitemap:generate')->twiceDaily(1, 13);

// Weekly on Sundays at 3am
Schedule::command('sitemap:generate')->weekly()->sundays()->at('03:00');
```

### Customizing URL Structure

If your product or article URLs differ, update `app/Services/SitemapService.php`:

```php
// Example: Change product URL structure
Url::create("/properties/{$product->slug}")  // Instead of /products/

// Example: Change article URL structure
Url::create("/blog/{$article->slug}")        // Instead of /news/
```

### Adding Additional Pages

Edit `SitemapService.php` to add more static or dynamic pages:

```php
protected function addStaticPages(Sitemap $sitemap): void
{
    // ... existing pages ...

    // Add new static page
    $sitemap->add(
        Url::create('/services')
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
    );
}

// Or add new dynamic section
protected function addFacilityPages(Sitemap $sitemap): void
{
    Facility::where('is_active', true)
        ->each(function (Facility $facility) use ($sitemap) {
            $sitemap->add(
                Url::create("/facilities/{$facility->slug}")
                    ->setLastModificationDate($facility->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.7)
            );
        });
}

// Don't forget to call it in generate()
public function generate(): Sitemap
{
    $sitemap = Sitemap::create();

    $this->addStaticPages($sitemap);
    $this->addProductPages($sitemap);
    $this->addArticlePages($sitemap);
    $this->addFacilityPages($sitemap);  // Add this line

    return $sitemap;
}
```

## Production Deployment

### 1. Set Up Cron Job

For scheduled tasks to work in production, ensure the Laravel scheduler is running.

Add to your server's crontab:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Or if using Docker:

```bash
* * * * * docker exec your_app_container php artisan schedule:run >> /dev/null 2>&1
```

### 2. Initial Generation

After deployment, generate the sitemap once:

```bash
php artisan sitemap:generate
```

### 3. Verify Scheduling

Check if the scheduler is working:

```bash
php artisan schedule:list
```

Expected output should include:
```
0 0 * * *  php artisan sitemap:generate .... Next Due: 1 day from now
```

### 4. Submit to Search Engines

Once deployed, submit your sitemap to search engines:

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Select your property
3. Navigate to Sitemaps
4. Enter: `sitemap.xml`
5. Click Submit

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Select your site
3. Navigate to Sitemaps
4. Enter: `https://yourdomain.com/sitemap.xml`
5. Click Submit

### 5. robots.txt Configuration

Add sitemap reference to your `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## Testing

### Unit Testing

Create a test file `tests/Feature/SitemapTest.php`:

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Cache;

class SitemapTest extends TestCase
{
    public function test_sitemap_route_returns_xml()
    {
        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml');
    }

    public function test_sitemap_contains_static_pages()
    {
        $response = $this->get('/sitemap.xml');

        $content = $response->getContent();

        $this->assertStringContainsString('<loc>http://localhost/</loc>', $content);
        $this->assertStringContainsString('<loc>http://localhost/project</loc>', $content);
        $this->assertStringContainsString('<loc>http://localhost/news</loc>', $content);
    }

    public function test_sitemap_generate_command()
    {
        Cache::forget('sitemap');

        $this->artisan('sitemap:generate')
            ->assertSuccessful()
            ->expectsOutput('Generating sitemap...')
            ->expectsOutput('Sitemap generated and cached successfully!');

        $this->assertTrue(Cache::has('sitemap'));
    }
}
```

Run tests:

```bash
php artisan test --filter SitemapTest
```

### Manual Testing Checklist

- [ ] Sitemap generates without errors
- [ ] All static pages are included
- [ ] Active products are included
- [ ] Published articles are included
- [ ] Sold/inactive products are excluded
- [ ] Draft articles are excluded
- [ ] XML is valid (use https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [ ] Cache is working (second request is faster)
- [ ] Scheduled task runs daily

## Troubleshooting

### Issue: Sitemap is empty or missing pages

**Solution:**
1. Check if products/articles exist:
   ```bash
   php artisan tinker
   >>> App\Models\Product::active()->count()
   >>> App\Models\Article::published()->count()
   ```

2. Clear cache and regenerate:
   ```bash
   php artisan cache:clear
   php artisan sitemap:generate
   ```

### Issue: 404 Not Found on /sitemap.xml

**Solution:**
1. Clear route cache:
   ```bash
   php artisan route:clear
   php artisan route:cache
   ```

2. Check if route exists:
   ```bash
   php artisan route:list | grep sitemap
   ```

### Issue: Memory limit exceeded

For large sitemaps (50,000+ URLs), the package automatically splits into multiple files. If you still face memory issues:

**Solution:**
1. Increase PHP memory limit in `php.ini` or `.env`:
   ```
   memory_limit = 512M
   ```

2. Use chunking in `SitemapService.php`:
   ```php
   Product::active()
       ->chunk(1000, function ($products) use ($sitemap) {
           foreach ($products as $product) {
               $sitemap->add(...);
           }
       });
   ```

### Issue: Scheduler not running

**Solution:**
1. Verify cron job is set up:
   ```bash
   crontab -l
   ```

2. Check Laravel logs:
   ```bash
   tail -f storage/logs/laravel.log
   ```

3. Test scheduler manually:
   ```bash
   php artisan schedule:run
   ```

### Issue: Wrong URLs in sitemap

**Solution:**
1. Check `APP_URL` in `.env`:
   ```
   APP_URL=https://yourdomain.com
   ```

2. Force URL in `SitemapService.php`:
   ```php
   Url::create('https://yourdomain.com/products/' . $product->slug)
   ```

## Performance Considerations

### Caching Strategy

The current implementation caches for 7 days and regenerates daily. This provides:
- Fast response times (cached)
- Fresh content (daily updates)
- Reduced server load

### Large Sitemaps

The package automatically handles:
- Sitemap index files (for > 50,000 URLs)
- Compression (gzip)
- Memory optimization

### Database Optimization

Consider adding indexes for frequently queried fields:

```sql
-- Products
CREATE INDEX idx_products_active_sold ON products(is_active, is_sold);
CREATE INDEX idx_products_updated_at ON products(updated_at);

-- Articles
CREATE INDEX idx_articles_published ON articles(is_published, published_at);
```

## SEO Best Practices

### Priority Guidelines

- **1.0**: Homepage only
- **0.8-0.9**: Main category pages, important product pages
- **0.6-0.7**: Standard product pages, articles
- **0.4-0.5**: Archive pages, tags

### Change Frequency Guidelines

- **Always**: Content changes multiple times per day
- **Hourly**: Real-time content
- **Daily**: News, active listings
- **Weekly**: Standard product pages
- **Monthly**: About pages, policies
- **Yearly**: Legal pages
- **Never**: Archived content

### URL Best Practices

- Use clean, readable URLs
- Include keywords in slugs
- Keep URLs short and descriptive
- Use hyphens (not underscores)
- Use lowercase

## Monitoring

### Check Sitemap Health

```bash
# View sitemap size
php artisan tinker
>>> strlen(Cache::get('sitemap'))

# Count URLs in sitemap
>>> substr_count(Cache::get('sitemap'), '<url>')
```

### Google Search Console

Monitor sitemap performance:
1. Indexed pages count
2. Coverage errors
3. Sitemap processing date

## Additional Resources

- [Spatie Laravel Sitemap Documentation](https://github.com/spatie/laravel-sitemap)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [Sitemaps XML Protocol](https://www.sitemaps.org/protocol.html)
- [Laravel Task Scheduling](https://laravel.com/docs/scheduling)

## Support

For issues or questions:
1. Check this documentation
2. Review package documentation
3. Check Laravel logs: `storage/logs/laravel.log`
4. Contact the development team

## Changelog

### 2025-12-12 - Initial Implementation
- Added spatie/laravel-sitemap package
- Created SitemapService with static and dynamic pages
- Implemented caching strategy (7 days)
- Added daily scheduled generation
- Created sitemap route at /sitemap.xml
- Included products and articles in sitemap
