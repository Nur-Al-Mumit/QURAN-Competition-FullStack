<?php

use App\Models\LinkStat;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('link_stats', function (Blueprint $table) {
            $table->id();
            // "page_visit" tracks total unique-ish page visits (one per browser cookie).
            // The other values match each tracked platform link.
            $table->string('platform', 30)->unique();
            $table->unsignedBigInteger('count')->default(0);
            $table->timestamps();
        });

        // Seed the rows up front so stats exist immediately without a
        // separate seeder run. Idempotent: safe to re-run.
        $platforms = ['page_visit', 'facebook', 'youtube', 'telegram', 'whatsapp', 'instagram'];
        foreach ($platforms as $platform) {
            LinkStat::firstOrCreate(['platform' => $platform], ['count' => 0]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('link_stats');
    }
};
