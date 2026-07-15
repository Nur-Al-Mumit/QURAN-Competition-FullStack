<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * Add the fields that drive the header countdown banner and the
     * "current status" card so the frontend no longer needs any hardcoded
     * dates or messages.
     */
    public function up(): void
    {
        Schema::table('timeline_events', function (Blueprint $table) {
            // Label shown inside the countdown banner for this phase.
            $table->string('banner_message')->nullable()->after('description');
            // Text shown in the "বর্তমান অবস্থা" card while the phase is active.
            $table->text('status_message')->nullable()->after('banner_message');
            // Text shown in the status card when this is the next upcoming
            // phase (e.g. "waiting for final"). Falls back to status_message.
            $table->text('status_message_upcoming')->nullable()->after('status_message');
            // Whether to render this row in the Timeline View list. Hidden
            // rows can still drive the phase/countdown logic.
            $table->boolean('show_in_timeline')->default(true)->after('status_message_upcoming');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->dropColumn([
                'banner_message',
                'status_message',
                'status_message_upcoming',
                'show_in_timeline',
            ]);
        });
    }
};
