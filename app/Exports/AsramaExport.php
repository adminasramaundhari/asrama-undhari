<?php

namespace App\Exports;

use App\Models\Asrama;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AsramaExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Asrama::withCount('rooms')->get(['id', 'name', 'code', 'address']);
    }

    public function headings(): array
    {
        return ['ID', 'Nama Asrama', 'Kode', 'Alamat', 'Total Kamar'];
    }
}