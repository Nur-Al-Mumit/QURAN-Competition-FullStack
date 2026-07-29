<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_final_confirmations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('restrict');

            $table->foreignId('user_competition_form_id')
                ->constrained()
                ->onDelete('restrict');

            $table->foreignId('season_id')
                ->constrained()
                ->onDelete('restrict');

            $table->foreignId('criteria_id')
                ->nullable()
                ->constrained('criteria')
                ->onDelete('restrict');

            $table->tinyInteger('status')
                ->comment('1 = YES / Confirmed, 2 = NO / Not Confirmed');

            $table->foreignId('admin_id')
                ->nullable()
                ->constrained('admins')
                ->onDelete('restrict');

            $table->unique(['user_id', 'season_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_final_confirmations');
    }
};
