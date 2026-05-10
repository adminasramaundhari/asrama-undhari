<?php

namespace App\Exports;

use App\Models\Notification;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class NotifikasiExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Notification::with('user')->get();
    }

    public function headings(): array
    {
        return ['ID', 'Penerima', 'Judul', 'Pesan', 'Tipe', 'Status', 'Tanggal'];
    }

    public function map($notif): array
    {
        return [
            $notif->id,
            $notif->user->name ?? '-',
            $notif->title,
            $notif->message,
            $notif->type,
            $notif->is_read ? 'Sudah Dibaca' : 'Belum Dibaca',
            $notif->created_at->format('d/m/Y H:i'),
        ];
    }
}