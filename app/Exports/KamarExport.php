<?php

namespace App\Exports;

use App\Models\Room;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class KamarExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Room::all(['room_number', 'room_type', 'capacity', 'current_occupancy', 'price_per_month', 'status']);
    }

    public function headings(): array
    {
        return ['No. Kamar', 'Tipe', 'Kapasitas', 'Terisi', 'Harga/Bulan', 'Status'];
    }
}