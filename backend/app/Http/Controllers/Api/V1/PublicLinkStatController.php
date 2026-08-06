<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\LinkStat;
use Illuminate\Http\Request;

class PublicLinkStatController extends Controller
{
    /**
     * Allowed platform values for click tracking.
     */
    private const PLATFORMS = ['facebook', 'youtube', 'telegram', 'whatsapp', 'instagram'];

    /**
     * Increment the page-visit counter.
     */
    public function trackVisit()
    {
        LinkStat::where('platform', 'page_visit')->increment('count');

        return JsonResponse::success();
    }

    /**
     * Increment the click counter for a single platform.
     */
    public function trackClick(string $platform)
    {
        if (!in_array($platform, self::PLATFORMS, true)) {
            return JsonResponse::error('Invalid platform', 400);
        }

        LinkStat::where('platform', $platform)->increment('count');

        return JsonResponse::success();
    }
}
