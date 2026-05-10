<?php

namespace App\Exports;

use App\Models\Payment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LaporanPembayaranExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Payment::with('user')
            ->get()
            ->map(function($payment) {
                return [
                    'invoice' => $payment->invoice_number,
                    'nama' => $payment->user->name ?? '-',
                    'jumlah' => $payment->amount,
                    'status' => $payment->status,
                    'tanggal_bayar' => $payment->payment_date ?? '-',
                    'jatuh_tempo' => $payment->due_date,
                ];
            });
    }

    public function headings(): array
    {
        return ['No. Invoice', 'Nama Mahasiswa', 'Jumlah', 'Status', 'Tanggal Bayar', 'Jatuh Tempo'];
    }
}