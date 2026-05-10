<?php

namespace App\Exports;

use App\Models\Payment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PembayaranExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Payment::with('user')->get();
    }

    public function headings(): array
    {
        return [
            'No. Invoice',
            'Nama Mahasiswa',
            'NIM',
            'Jumlah',
            'Status',
            'Tanggal Bayar',
            'Jatuh Tempo',
            'Metode',
            'Tanggal Dibuat'
        ];
    }

    public function map($payment): array
    {
        return [
            $payment->invoice_number ?? '-',
            $payment->user->name ?? '-',
            $payment->user->nim ?? '-',
            'Rp ' . number_format($payment->amount, 0, ',', '.'),
            ucfirst($payment->status),
            $payment->payment_date ?? '-',
            $payment->due_date,
            $payment->payment_method ?? 'Manual',
            $payment->created_at->format('d/m/Y')
        ];
    }
}