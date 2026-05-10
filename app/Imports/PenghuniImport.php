<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class PenghuniImport implements ToModel, WithHeadingRow
{
    private $importedCount = 0;
    private $skippedCount = 0;

    public function model(array $row)
    {
        // Log untuk debugging
        Log::info('Import row:', $row);

        // Validasi minimal kolom yang diperlukan
        if (empty($row['nama']) || empty($row['nim']) || empty($row['email'])) {
            $this->skippedCount++;
            return null;
        }

        // Cek apakah email sudah ada
        $existingEmail = User::where('email', $row['email'])->first();
        if ($existingEmail) {
            $this->skippedCount++;
            return null;
        }

        // Cek apakah NIM sudah ada
        $existingNim = User::where('nim', (string) $row['nim'])->first();
        if ($existingNim) {
            $this->skippedCount++;
            return null;
        }

        $this->importedCount++;

        return new User([
            'name' => $row['nama'],
            'nim' => (string) $row['nim'],
            'email' => $row['email'],
            'phone' => $row['no_hp'] ?? null,
            'faculty' => $row['fakultas'] ?? 'FILKOM',
            'role' => 'mahasiswa',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
    }

    public function getImportedCount()
    {
        return $this->importedCount;
    }

    public function getSkippedCount()
    {
        return $this->skippedCount;
    }
}