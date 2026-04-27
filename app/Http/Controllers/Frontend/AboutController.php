<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutAchievementResource;
use App\Http\Resources\AboutCompanyInfoResource;
use App\Http\Resources\AboutHeroResource;
use App\Http\Resources\AboutMissionResource;
use App\Http\Resources\AboutValueResource;
use App\Http\Resources\MilestoneResource;
use App\Models\AboutAchievement;
use App\Models\AboutCompanyInfo;
use App\Models\AboutHero;
use App\Models\AboutMission;
use App\Models\AboutValue;
use App\Models\Milestone;
use App\Models\TopSales;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $topSales = TopSales::with('mediaImage')
            ->active()
            ->ordered()
            ->limit(5)
            ->get()
            ->map(function ($sales) {
                return [
                    'id' => $sales->uid,
                    'name' => $sales->name,
                    'role' => $sales->job_title,
                    'position' => $sales->position,
                    'image' => $sales->image_url,
                ];
            });

        $milestones = Milestone::with('milestoneImage')
            ->active()
            ->ordered()
            ->get();

        $companyInfo = AboutCompanyInfo::first();
        $hero = AboutHero::first();
        $mission = AboutMission::first();
        $values = AboutValue::with('iconImage')->active()->ordered()->get();
        $achievements = AboutAchievement::active()->ordered()->get();

        return Inertia::render('About', [
            'topSales' => $topSales,
            'milestones' => MilestoneResource::collection($milestones)->resolve(),
            'companyInfo' => $companyInfo ? (new AboutCompanyInfoResource($companyInfo))->resolve() : null,
            'hero' => $hero ? (new AboutHeroResource($hero))->resolve() : null,
            'mission' => $mission ? (new AboutMissionResource($mission))->resolve() : null,
            'values' => AboutValueResource::collection($values)->resolve(),
            'achievements' => AboutAchievementResource::collection($achievements)->resolve(),
        ]);
    }
}
