<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\HeroBannerController;
use App\Http\Controllers\Admin\PolicyController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Frontend Routes
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Guest routes (login)
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Authenticated admin routes
    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Hero Banners
        Route::resource('hero-banners', HeroBannerController::class)->except(['show']);

        // Products
        Route::resource('products', ProductController::class)->except(['show']);
        Route::post('/products/{product}/update-image-order', [ProductController::class, 'updateImageOrder'])->name('products.update-image-order');
        Route::post('/products/{product}/set-primary-image', [ProductController::class, 'setPrimaryImage'])->name('products.set-primary-image');

        // Articles
        Route::resource('articles', ArticleController::class)->except(['show']);

        // Events
        Route::resource('events', EventController::class)->except(['show']);

        // Facilities
        Route::resource('facilities', FacilityController::class)->except(['show']);
        Route::post('/facilities/{facility}/update-image-order', [FacilityController::class, 'updateImageOrder'])->name('facilities.update-image-order');

        // Contacts / Leads
        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
        Route::patch('/contacts/{contact}/mark-read', [ContactController::class, 'markAsRead'])->name('contacts.mark-read');
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

        // About Us
        Route::get('/about', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('/about', [AboutController::class, 'update'])->name('about.update');

        // Settings
        Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
        Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');

        // Policies
        Route::resource('policies', PolicyController::class)->except(['show']);
    });
});
