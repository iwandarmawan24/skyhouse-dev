<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show admin dashboard
     */
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::active()->count(),
            'featured_products' => Product::featured()->count(),
            'total_articles' => Article::count(),
            'published_articles' => Article::published()->count(),
            'total_contacts' => Contact::count(),
            'unread_contacts' => Contact::unread()->count(),
            'upcoming_events' => Event::upcoming()->count(),
        ];

        $recent_contacts = Contact::with('product')
            ->recent()
            ->limit(5)
            ->get();

        $recent_products = Product::with('featuredImage')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_contacts' => $recent_contacts,
            'recent_products' => $recent_products,
        ]);
    }
}
