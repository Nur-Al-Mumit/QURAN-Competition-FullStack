<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * Per-user binding for progress stages. This lets the system (or an
     * admin) record a specific user's completion of a stage independently
     * of the global definition, e.g. mark "training" / "final_round"
     * complete for a particular user based on their attendance.
     */
    public function up(): void
    {
        Schema::create('user_progress_stages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('progress_stage_id')->constrained()->onDelete('cascade');
            // Manual per-user completion flag (overrides the automatic
            // rule for this stage/user when set to true).
            $table->boolean('is_complete')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'progress_stage_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress_stages');
    }
};
