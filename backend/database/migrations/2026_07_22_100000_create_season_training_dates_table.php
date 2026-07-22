<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Stores the explicit list of training dates for a season.
 *
 * Each row is ONE date (not a start/end range), so an off-day / holiday that
 * falls inside the training period (e.g. 24 July within 22-27 July) is just a
 * row with is_off_day = true — first-class, no special range math.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('season_training_dates', function (Blueprint $table) {
            $table->id();

            $table->foreignId('season_id')
                ->constrained('seasons')
                ->onDelete('cascade');

            $table->date('date');

            // true = holiday / off (no training that day). The attendance sheet
            // renders the column labelled "OFF" and it is excluded from
            // attendance expectations.
            $table->boolean('is_off_day')->default(false);

            $table->string('note')->nullable()->comment('e.g. "Weekly holiday"');

            $table->integer('sort_order')->default(0);

            $table->timestamps();

            // No duplicate date per season.
            $table->unique(['season_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('season_training_dates');
    }
};
