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
        Schema::create('attendance_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('season_id')->constrained()->onDelete('restrict');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('user_competition_form_id')
                ->constrained()
                ->onDelete('restrict');
            $table->foreignId('admin_id')->constrained('admins')->onDelete('restrict');
            $table->string('room_number'); // e.g. 201, 202
            $table->char('group', 1); // A, B, C, D, E
            $table->string('serial'); // e.g. A-01
            $table->string('exam_time'); // e.g. 10:00 AM - 10:05 AM
            $table->boolean('is_sms_sent')->nullable()->comment('1 = SMS Sent, null = Not Sent Yet')->before('created_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_allocations');
    }
};
