<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->foreignId('season_id')
                ->nullable()
                ->after('id')
                ->constrained()
                ->nullOnDelete();

            // Machine key such as "exam_day", "viva", "registration", ...
            $table->string('phase', 50)
                ->nullable()
                ->after('season_id');
        });
    }

    public function down(): void
    {
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->dropForeign(['season_id']);
            $table->dropColumn(['season_id', 'phase']);
        });
    }
};
