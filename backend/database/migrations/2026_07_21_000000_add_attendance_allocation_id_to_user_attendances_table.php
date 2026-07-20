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
                ->after('user_competition_form_id')
                ->constrained('attendance_allocations')
                ->onDelete('restrict')
                ->comment('The allocation the attendance was recorded against');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_attendances', function (Blueprint $table) {
            $table->dropConstrainedForeignId('attendance_allocation_id');
        });
    }
};
