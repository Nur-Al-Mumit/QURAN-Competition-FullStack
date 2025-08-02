<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_attendances', function (Blueprint $table) {
            $table->foreignId('attendance_allocation_id')
                ->nullable()
                ->after('season_id')
                ->constrained('attendance_allocations')
                ->onDelete('restrict');

            $table->foreignId('criteria_id')
                ->nullable()
                ->constrained('criteria')
                ->onDelete('restrict')
                ->before('updated_by');
        });
    }

    /**
     * Reverse the migrations. user_preliminary_resutls
     */
    public function down(): void
    {
        Schema::table('user_attendances', function (Blueprint $table) {
            $table->dropForeign(['attendance_allocation_id']);
            $table->dropColumn('attendance_allocation_id');
            $table->dropForeign(['criteria_id']);
            $table->dropColumn('criteria_id');
        });
    }
};
