<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Lib\JsonResponse;
use App\Models\LinkStat;

class PublicLinkStatController extends Controller
{
    private const PLATFORMS = ['facebook', 'youtube', 'telegram', 'whatsapp', 'instagram'];

    /**
     * Aggregate stats for the admin dashboard.
     */
    public function index()
    {
        $rows = LinkStat::whereIn('platform', array_merge(['page_visit'], self::PLATFORMS))
            ->pluck('count', 'platform');

        // Build per-platform map, defaulting to 0 if a row is somehow missing.
        $platforms = [];
        foreach (self::PLATFORMS as $platform) {
            $platforms[$platform] = (int) ($rows[$platform] ?? 0);
        }

        return JsonResponse::success([
            'total_visits' => (int) ($rows['page_visit'] ?? 0),
            'platforms'    => $platforms,
        ]);
    }
}
