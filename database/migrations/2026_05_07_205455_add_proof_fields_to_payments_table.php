<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('payment_proof')->nullable()->after('snap_token');
            $table->enum('proof_status', ['pending', 'verified', 'rejected'])->default('pending')->after('payment_proof');
            $table->timestamp('verified_at')->nullable()->after('proof_status');
            $table->foreignId('verified_by')->nullable()->after('verified_at')->constrained('users')->onDelete('set null');
            $table->string('rejection_note')->nullable()->after('verified_by');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['verified_by']);
            $table->dropColumn(['payment_proof', 'proof_status', 'verified_at', 'verified_by', 'rejection_note']);
        });
    }
};