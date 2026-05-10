<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@undhari.ac.id'],
            [
                'name' => 'Admin UNDHARI',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Mahasiswa contoh FILKOM
        User::updateOrCreate(
            ['email' => 'mahasiswa@undhari.ac.id'],
            [
                'name' => 'Mahasiswa FILKOM',
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
                'nim' => '20240001',
                'phone' => '08123456789',
                'faculty' => 'FILKOM',
                'email_verified_at' => now(),
            ]
        );

        // Mahasiswa contoh FKIP
        User::updateOrCreate(
            ['email' => 'mahasiswa2@undhari.ac.id'],
            [
                'name' => 'Mahasiswa FKIP',
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
                'nim' => '20240002',
                'phone' => '08123456780',
                'faculty' => 'FKIP',
                'email_verified_at' => now(),
            ]
        );
    }
}