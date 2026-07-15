<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * A stage can be completed through one of three mechanisms:
     *  - Manual flag            -> is_complete column (e.g. "Account Created")
     *  - Date range             -> start_date / end_date (e.g. "Training")
     *  - Dynamic (system) rule  -> the `code` column drives server-side logic
     *                               (e.g. "primary_round" -> completed once a
     *                                preliminary result is submitted).
     */
    public function up(): void
    {
        Schema::create('progress_stages', function (Blueprint $table) {
            $table->id();
            // Stable identifier used by the backend to apply per-stage
            // completion logic. Unknown codes fall back to the manual flag
            // or the date range.
            $table->string('code')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_name')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            // Manual completion override / fallback for stages that do not
            // have a dynamic rule.
            $table->boolean('is_complete')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress_stages');
    }
};
