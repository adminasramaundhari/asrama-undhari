<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LaporanPenghuniExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return User::where('role', 'mahasiswa')
            ->select('name', 'nim', 'email', 'phone', 'faculty')
            ->get();
    }

    public function headings(): array
    {
        return ['Nama', 'NIM', 'Email', 'No HP', 'Fakultas'];
    }
}