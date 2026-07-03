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
        Schema::table('admins', function (Blueprint $table) {
            $table->unsignedTinyInteger('assigned_role')
                ->after('role')
                ->nullable();

            $table->unsignedBigInteger('assigned_by')
                ->after('assigned_role')
                ->nullable();

            $table->timestamp('role_assigned_at')
                ->after('assigned_by')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->dropColumn(['assigned_role', 'assigned_by', 'role_assigned_at']);
        });
    }
};
