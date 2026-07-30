<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * TEMPORARY/SEASON-SPECIFIC: Adds a nullable text column to store any
     * special consideration notes for a participant's final confirmation.
     */
    public function up(): void
    {
        Schema::table('user_final_confirmations', function (Blueprint $table) {
            $table->text('has_consideration')
                ->nullable()
                ->after('status')
                ->comment('TEMPORARY: nullable text for any special consideration notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_final_confirmations', function (Blueprint $table) {
            $table->dropColumn('has_consideration');
        });
    }
};
