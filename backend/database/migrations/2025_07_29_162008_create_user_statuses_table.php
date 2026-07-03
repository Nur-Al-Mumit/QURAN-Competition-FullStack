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
        Schema::create('user_statuses', function (Blueprint $table) {
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

            $table->tinyInteger('status')
                ->default(2)
                ->comment('1 = Selected, 2 = Pending, 3 = Hold, 4 = Rejected');

            $table->text('comment')->nullable();
            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('admins')
                ->onDelete('restrict')
                ->comment('Admin ID');

            $table->unique(['user_competition_form_id', 'season_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_statuses');
    }
};
