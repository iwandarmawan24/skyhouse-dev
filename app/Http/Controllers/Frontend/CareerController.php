<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CareerResource;
use App\Models\Career;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $careers = Career::active()->ordered()->get();

        return Inertia::render('Career', [
            'careers' => CareerResource::collection($careers)->resolve(),
        ]);
    }
}
