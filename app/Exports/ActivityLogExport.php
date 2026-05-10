<?php

namespace App\Exports;

use App\Models\ActivityLog;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ActivityLogExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return ActivityLog::with('user')->get()->map(function($log) {
            return [
                'id' => $log->id,
                'user' => $log->user->name ?? 'System',
                'action' => $log->action,
                'description' => $log->description,
                'ip_address' => $log->ip_address,
                'created_at' => $log->created_at->format('d/m/Y H:i:s'),
            ];
        });
    }

    public function headings(): array
    {
        return ['ID', 'User', 'Aksi', 'Deskripsi', 'IP Address', 'Waktu'];
    }
}