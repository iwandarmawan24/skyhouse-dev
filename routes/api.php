<?php

use App\Http\Controllers\Api\TrackerController;
use App\Http\Controllers\Frontend\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store']);

// Rate-limited at 60 hits/minute per IP — fast enough for real users, blocks storms
Route::post('/track', [TrackerController::class, 'track'])->middleware('throttle:60,1');
