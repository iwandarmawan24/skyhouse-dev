<?php

use App\Http\Controllers\Api\TrackerController;
use App\Http\Controllers\Frontend\ContactController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/tracker', [TrackerController::class, 'track']);
