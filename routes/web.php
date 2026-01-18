<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ArticleCategoryController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\FacilitySliderController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\HeroBannerController;
use App\Http\Controllers\Admin\InstagramGalleryController;
use App\Http\Controllers\Admin\LocationMapController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MediaLibraryController;
use App\Http\Controllers\Admin\MediaHighlightController;
use App\Http\Controllers\Admin\PolicyController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Frontend\EventController as FrontendEventController;
use App\Http\Controllers\Frontend\HeroBannerController as FrontendHeroBannerController;
use App\Http\Controllers\Frontend\LocationMapController as FrontendLocationMapController;
use App\Http\Controllers\Frontend\NewsController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Frontend Routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Frontend API Routes
Route::get('/api/hero-banners', [FrontendHeroBannerController::class, 'index'])->name('api.hero-banners');
Route::get('/api/location-map', [FrontendLocationMapController::class, 'show'])->name('api.location-map');

Route::get('/project', [\App\Http\Controllers\Frontend\ProjectController::class, 'index'])->name('project');

Route::get('/project/{id}', [\App\Http\Controllers\Frontend\ProjectController::class, 'show'])->name('project.detail');

Route::get('/news', [NewsController::class, 'show'])->name('news');
Route::get('/api/news', [NewsController::class, 'index'])->name('news.api');
Route::get('/articles/{slug}', [NewsController::class, 'detail'])->name('articles.detail');

Route::get('/events', [FrontendEventController::class, 'index'])->name('events');
Route::get('/events/{slug}', [FrontendEventController::class, 'show'])->name('events.detail');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->name('gallery');

Route::get('/facilities', function () {
    return Inertia::render('Facilities');
})->name('facilities');

Route::get('/contact-us', [\App\Http\Controllers\Frontend\ContactController::class, 'index'])->name('contact');
Route::post('/contact', [\App\Http\Controllers\Frontend\ContactController::class, 'store'])->name('contact.store');

// Components Showcase Route
Route::get('/components', function () {
    return Inertia::render('ComponentsShowcase');
})->name('components.showcase');

// Sitemap Route
Route::get('/sitemap.xml', function () {
    return response(
        Cache::get('sitemap') ?? app(\App\Services\SitemapService::class)->generate()->render(),
        200
    )->header('Content-Type', 'application/xml');
})->name('sitemap');

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Guest routes (login & register)
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);

        // Hidden registration endpoint (no UI link)
        Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
        Route::post('/register', [RegisterController::class, 'register']);
    });

    // Authenticated admin routes
    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Routes accessible by all authenticated users (superadmin, admin, staff)
        Route::middleware('role:superadmin,admin,staff')->group(function () {
            // Home Page Settings
            // Hero Banners
            Route::post('/hero-banners/bulk-delete', [HeroBannerController::class, 'bulkDelete'])->name('hero-banners.bulk-delete');
            Route::post('/hero-banners/update-order', [HeroBannerController::class, 'updateOrder'])->name('hero-banners.update-order');
            Route::resource('hero-banners', HeroBannerController::class)->except(['show']);

            // Location Map
            Route::get('/location-map/edit', [LocationMapController::class, 'edit'])->name('location-map.edit');
            Route::put('/location-map', [LocationMapController::class, 'update'])->name('location-map.update');

            // Products
            Route::resource('products', ProductController::class)->except(['show']);
            Route::post('/products/{product}/update-image-order', [ProductController::class, 'updateImageOrder'])->name('products.update-image-order');
            Route::post('/products/{product}/set-primary-image', [ProductController::class, 'setPrimaryImage'])->name('products.set-primary-image');

            // Product Sliders
            Route::post('/products/{product}/sliders', [ProductController::class, 'addSlider'])->name('products.add-slider');
            Route::put('/products/{product}/sliders/{slider}', [ProductController::class, 'updateSlider'])->name('products.update-slider');
            Route::delete('/products/{product}/sliders/{slider}', [ProductController::class, 'deleteSlider'])->name('products.delete-slider');
            Route::post('/products/{product}/sliders/update-order', [ProductController::class, 'updateSliderOrder'])->name('products.update-slider-order');

            // Articles
            Route::resource('articles', ArticleController::class)->except(['show']);
            Route::post('/articles/analyze-seo', [ArticleController::class, 'analyzeSeo'])->name('articles.analyze-seo');

            // Article Categories
            Route::resource('article-categories', ArticleCategoryController::class)->except(['show']);

            // Media
            Route::resource('media', MediaController::class)->except(['show']);

            // Media Library (WordPress-like media management)
            Route::prefix('media-library')->name('media-library.')->group(function () {
                Route::get('/', [MediaLibraryController::class, 'index'])->name('index');
                Route::post('/upload', [MediaLibraryController::class, 'upload'])->name('upload');
                Route::get('/picker', [MediaLibraryController::class, 'picker'])->name('picker');
                Route::get('/{media}', [MediaLibraryController::class, 'show'])->name('show');
                Route::patch('/{media}', [MediaLibraryController::class, 'update'])->name('update');
                Route::post('/{media}/replace', [MediaLibraryController::class, 'replace'])->name('replace');
                Route::delete('/{media}', [MediaLibraryController::class, 'destroy'])->name('destroy');
                Route::post('/bulk-delete', [MediaLibraryController::class, 'bulkDelete'])->name('bulk-delete');
            });

            // Media Highlights
            Route::resource('media-highlights', MediaHighlightController::class)->except(['show']);

            // Events
            Route::resource('events', EventController::class)->except(['show']);

            // Facilities
            Route::resource('facilities', FacilityController::class)->except(['show']);
            Route::post('/facilities/{facility}/update-image-order', [FacilityController::class, 'updateImageOrder'])->name('facilities.update-image-order');

            // Facility Sliders
            Route::post('/facility-sliders/update-order', [FacilitySliderController::class, 'updateOrder'])->name('facility-sliders.update-order');
            Route::resource('facility-sliders', FacilitySliderController::class)->except(['show']);

            // Galleries
            Route::post('/galleries/update-order', [GalleryController::class, 'updateOrder'])->name('galleries.update-order');
            Route::resource('galleries', GalleryController::class)->except(['show']);

            // Instagram Gallery
            Route::get('/instagram-gallery', [InstagramGalleryController::class, 'index'])->name('instagram-gallery.index');
            Route::post('/instagram-gallery/update-position', [InstagramGalleryController::class, 'updatePosition'])->name('instagram-gallery.update-position');
            Route::delete('/instagram-gallery/delete-position', [InstagramGalleryController::class, 'deletePosition'])->name('instagram-gallery.delete-position');
            Route::post('/instagram-gallery/toggle-active', [InstagramGalleryController::class, 'toggleActive'])->name('instagram-gallery.toggle-active');

            // Policies
            Route::resource('policies', PolicyController::class)->except(['show']);
        });

        // Routes accessible by superadmin and admin only
        Route::middleware('role:superadmin,admin')->group(function () {
            // Contacts / Leads
            Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
            Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
            Route::patch('/contacts/{contact}/mark-read', [ContactController::class, 'markAsRead'])->name('contacts.mark-read');
            Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

            // About Us
            Route::get('/about', [AboutController::class, 'edit'])->name('about.edit');
            Route::put('/about', [AboutController::class, 'update'])->name('about.update');
        });

        // Routes accessible by superadmin only
        Route::middleware('role:superadmin')->group(function () {
            // Settings
            Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
            Route::post('/settings', [SettingController::class, 'store'])->name('settings.store');
            Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
            Route::delete('/settings/{setting}', [SettingController::class, 'destroy'])->name('settings.destroy');

            // Users Management
            Route::resource('users', UserController::class)->except(['show']);
        });
    });
});
