<?php

namespace App\Exports;

use App\Models\Announcement;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PengumumanExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Announcement::all(['id', 'title', 'content', 'target', 'is_active', 'published_at', 'created_at']);
    }

    public function headings(): array
    {
        return ['ID', 'Judul', 'Konten', 'Target', 'Status', 'Tanggal Publikasi', 'Tanggal Dibuat'];
    }
}