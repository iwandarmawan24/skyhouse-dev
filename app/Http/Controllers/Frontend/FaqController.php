<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;

class FaqController extends Controller
{
    /**
     * Get active FAQs ordered
     */
    public function index(): JsonResponse
    {
        $faqs = Faq::active()->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $faqs->map(function ($faq) {
                return [
                    'question' => $faq->question,
                    'answer' => $faq->answer,
                ];
            }),
        ]);
    }
}
