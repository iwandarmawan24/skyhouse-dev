<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Policy;
use Inertia\Inertia;

class PolicyController extends Controller
{
    public function terms()
    {
        $policy = Policy::where('type', 'terms')->first();

        return Inertia::render('Policy', [
            'policy' => $policy ? [
                'title'     => $policy->title ?? 'Terms and Conditions',
                'content'   => $policy->content,
                'version'   => $policy->version,
                'updatedAt' => $policy->updated_at?->format('d M Y'),
            ] : null,
            'pageTitle'  => 'Terms and Conditions',
            'policyType' => 'terms',
        ]);
    }

    public function privacy()
    {
        $policy = Policy::where('type', 'privacy')->first();

        return Inertia::render('Policy', [
            'policy' => $policy ? [
                'title'     => $policy->title ?? 'Privacy Policy',
                'content'   => $policy->content,
                'version'   => $policy->version,
                'updatedAt' => $policy->updated_at?->format('d M Y'),
            ] : null,
            'pageTitle'  => 'Privacy Policy',
            'policyType' => 'privacy',
        ]);
    }
}
