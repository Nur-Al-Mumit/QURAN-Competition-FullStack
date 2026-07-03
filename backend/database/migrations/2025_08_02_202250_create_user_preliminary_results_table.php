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
        Schema::create('user_preliminary_results', function (Blueprint $table) {
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

            $table->foreignId('attendance_allocation_id')
                ->nullable()
                ->constrained('attendance_allocations')
                ->onDelete('restrict');

            $table->tinyInteger('attendance_status')
                ->default(2)
                ->comment('1 = Present, 2 = Absent, 3 = Late');

            $table->foreignId('result_category_id')
                ->nullable()
                ->constrained('result_categories')
                ->onDelete('restrict');

            $table->text('comment')
                ->nullable();

            $table->foreignId('examiner_id')
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
        Schema::dropIfExists('user_preliminary_resutls');
    }
};
