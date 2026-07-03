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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->unique();
            $table->string('password');

            // Role: 1=SUPER_ADMIN, 2=ADMIN, etc.
            $table->unsignedTinyInteger('role')->default(2);
            // Power/weight level: 1, 2, 3, etc.
            $table->unsignedTinyInteger('weight')->nullable();
            $table->boolean('is_active')->default(true);
            // Gender: 1=male, 2=female
            $table->unsignedTinyInteger('gender')->nullable();
            $table->unsignedBigInteger('creator_id')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
