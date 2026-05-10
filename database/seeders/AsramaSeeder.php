<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asrama;

class AsramaSeeder extends Seeder
{
    public function run(): void
    {
        $asramas = [
            ['name' => 'Asrama Putra Utama', 'code' => 'APU', 'address' => 'Jl. Kampus No. 1'],
            ['name' => 'Asrama Putri Mulya', 'code' => 'APM', 'address' => 'Jl. Kampus No. 2'],
            ['name' => 'Asrama Campuran Harmoni', 'code' => 'ACH', 'address' => 'Jl. Kampus No. 3'],
            ['name' => 'Asrama Eksklusif', 'code' => 'AE', 'address' => 'Jl. Kampus No. 4'],
        ];

        foreach ($asramas as $asrama) {
            Asrama::create($asrama);
        }
    }
}