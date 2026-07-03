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
        Schema::create('user_login_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->timestamp('login_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('ip_address', 45);
            $table->string('device')->nullable();
            $table->string('location')->nullable();
            $table->decimal('location_lat', 10, 7)->nullable();
            $table->decimal('location_long', 10, 7)->nullable();
            $table->enum('login_method', ['email', 'otp', 'google', 'apple', 'facebook', 'phone']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_login_logs');
    }
};
