<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'mahasiswa'])->default('mahasiswa')->after('password');
            $table->string('nim')->unique()->nullable()->after('role');
            $table->string('phone')->nullable()->after('nim');
            $table->string('faculty')->nullable()->after('phone'); // FKIP, FIKES, FHEB, FILKOM
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'nim', 'phone', 'faculty']);
        });
    }
};