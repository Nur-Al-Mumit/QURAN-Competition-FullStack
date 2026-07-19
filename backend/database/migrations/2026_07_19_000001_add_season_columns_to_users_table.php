<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('season_id')
                ->nullable()
                ->after('gender')
                ->constrained('seasons')
                ->onDelete('restrict')
                ->comment('Current active season for this user');

            $table->foreignId('registered_season_id')
                ->nullable()
                ->after('season_id')
                ->constrained('seasons')
                ->onDelete('restrict')
                ->comment('Season in which the user first registered');
        });

        // Backfill from user_seasons for existing accounts.
        if (Schema::hasTable('user_seasons')) {
            $rows = DB::table('user_seasons')->get();
            foreach ($rows as $row) {
                DB::table('users')
                    ->where('id', $row->user_id)
                    ->whereNull('registered_season_id')
                    ->update([
                        'season_id' => $row->season_id,
                        'registered_season_id' => $row->registered_season_id,
                    ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['season_id']);
            $table->dropForeign(['registered_season_id']);
            $table->dropColumn(['season_id', 'registered_season_id']);
        });
    }
};
