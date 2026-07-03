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
        Schema::table('sms_logs', function (Blueprint $table) {
            $table->string('reason')->nullable()->after('status');
            $table->unsignedBigInteger('sender_id')->nullable()->after('reason');

            $table->foreign('sender_id')
                ->references('id')
                ->on('admins')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sms_logs', function (Blueprint $table) {
            $table->dropColumn(['reason', 'sender_id']);
        });
    }
};
