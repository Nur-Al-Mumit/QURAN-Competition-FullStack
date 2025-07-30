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

            $table->foreignId('criteria_id')
                ->nullable()
                ->constrained('criteria')
                ->onDelete('restrict')
                ->after('reg_no');

            $table->tinyInteger('gender')
                ->nullable()
                ->default(1)
                ->comment('1 = Male, 2 = Female')
                ->after('dob');

            $table->boolean('is_active')
                ->nullable()
                ->default(1)
                ->comment('1 = Active, null = Deactivated')
                ->after('need_training');

            $table->boolean('is_sms_sent')
                ->nullable()
                ->comment('1 = SMS Sent, null = Not Sent Yet')
                ->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_competition_forms', function (Blueprint $table) {
            $table->dropColumn(['gender', 'is_active', 'is_sms_sent', 'criteria_id']);
        });
    }
};
