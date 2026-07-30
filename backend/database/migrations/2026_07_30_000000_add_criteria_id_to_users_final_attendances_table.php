<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds criteria_id to users_final_attendances and updates the unique
     * constraint from (user_id, season_id) to (user_id, season_id, criteria_id).
     */
    public function up(): void
    {
        Schema::table('users_final_attendances', function (Blueprint $table) {
            $table->foreignId('criteria_id')
                ->nullable()
                ->constrained('criteria')
                ->onDelete('restrict')
                ->after('season_id');
        });

        // MySQL needs a standalone index on user_id before we can drop the
        // composite unique that the user_id FK depends on.
        Schema::table('users_final_attendances', function (Blueprint $table) {
            $table->index(['user_id']);
        });

        Schema::table('users_final_attendances', function (Blueprint $table) {
            $table->dropForeign(['season_id']);
            $table->dropUnique(['user_id', 'season_id']);
            $table->foreign('season_id')->references('id')->on('seasons')->onDelete('restrict');
            $table->unique(['user_id', 'season_id', 'criteria_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users_final_attendances', function (Blueprint $table) {
            $table->dropForeign(['season_id']);
            $table->dropUnique(['user_id', 'season_id', 'criteria_id']);
            $table->foreign('season_id')->references('id')->on('seasons')->onDelete('restrict');
            $table->unique(['user_id', 'season_id']);
        });

        Schema::table('users_final_attendances', function (Blueprint $table) {
            $table->dropConstrainedForeignId('criteria_id');
        });
    }
};
