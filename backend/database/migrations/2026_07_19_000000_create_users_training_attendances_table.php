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
        Schema::create('users_training_attendances', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('restrict');

            $table->foreignId('season_id')
                ->constrained('seasons')
                ->onDelete('restrict');

            $table->tinyInteger('attendance_status')
                ->default(2)
                ->comment('1 = Present, 2 = Absent, 3 = Late');

            $table->date('date')
                ->default(now()->toDateString());

            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('admins')
                ->onDelete('restrict')
                ->comment('Admin ID');

            $table->timestamps();

            $table->unique(['user_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_training_attendances');
    }
};
