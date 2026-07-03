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
        Schema::create('user_competition_forms', function (Blueprint $table) {
            $table->id();

            // Foreign keys with restrict
            $table->foreignId('user_id')->constrained()->onDelete('restrict');
            $table->foreignId('season_id')->constrained()->onDelete('restrict');

            // Unique registration number
            $table->string('reg_no')->unique();

            $table->string('name_en');
            $table->string('name_bn');
            $table->date('dob')->nullable();
            $table->string('phone');
            $table->string('address');
            $table->tinyInteger('education_background')->comment('1 = General, 2 = Madrasah, 3 = Both');
            $table->string('school_name')->nullable();
            $table->string('college_name')->nullable();
            $table->string('university_name')->nullable();
            $table->string('madrasah_name')->nullable();
            $table->text('madrasah_study_details')->nullable();
            $table->string('occupation')->nullable();
            $table->boolean('is_recitation')->nullable()->default(true);
            $table->boolean('need_training')->nullable()->default(null);

            $table->timestamps();

            // Unique combination of user_id + season_id
            $table->unique(['user_id', 'season_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_competition_forms');
    }
};
