<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PenghuniExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return User::where('role', 'mahasiswa')
            ->select('id', 'name', 'nim', 'email', 'phone', 'faculty')
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama',
            'NIM',
            'Email',
            'No HP',
            'Fakultas'
        ];
    }

    public function map($user): array
    {
        return [
            $user->id,
            $user->name,
            $user->nim ?? '-',
            $user->email,
            $user->phone ?? '-',
            $user->faculty ?? '-',
        ];
    }
}