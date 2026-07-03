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
        Schema::table('user_competition_forms', function (Blueprint $table) {
            $table->string('exam_time')
                ->nullable()
                ->after('is_sms_sent')
                ->comment('Exam time range like 10:00-10:05 AM');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_competition_forms', function (Blueprint $table) {
            $table->dropColumn('exam_time');
        });
    }
};
