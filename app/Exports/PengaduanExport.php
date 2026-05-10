<?php

namespace App\Exports;

use App\Models\Complaint;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PengaduanExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Complaint::with('user')->get();
    }

    public function headings(): array
    {
        return ['ID', 'Pengirim', 'Judul', 'Deskripsi', 'Kategori', 'Status', 'Respon Admin', 'Tanggal Dibuat', 'Tanggal Selesai'];
    }

    public function map($complaint): array
    {
        return [
            $complaint->id,
            $complaint->user->name ?? '-',
            $complaint->title,
            $complaint->description,
            $complaint->category,
            $complaint->status,
            $complaint->admin_response ?? '-',
            $complaint->created_at->format('d/m/Y H:i'),
            $complaint->resolved_at ? $complaint->resolved_at->format('d/m/Y H:i') : '-',
        ];
    }
}