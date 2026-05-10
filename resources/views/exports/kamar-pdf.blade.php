<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Kamar</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        h1 { color: #FF2A00; }
        .date { color: #666; font-size: 12px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FF2A00; color: white; }
    </style>
</head>
<body>
    <h1>Laporan Data Kamar UNDHARI</h1>
    <div class="date">Tanggal: {{ date('d-m-Y H:i:s') }}</div>
    
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Asrama</th>
                <th>No. Kamar</th>
                <th>Tipe</th>
                <th>Kapasitas</th>
                <th>Penghuni</th>
                <th>Harga/Bulan</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $index => $room)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $room->asrama->name ?? '-' }}</td>
                <td>{{ $room->room_number }}</td>
                <td>{{ $room->room_type }}</td>
                <td>{{ $room->capacity }} orang</td>
                <td>{{ $room->current_occupancy }}/{{ $room->capacity }}</td>
                <td>Rp {{ number_format($room->price_per_month, 0, ',', '.') }}</td>
                <td>
                    @if($room->current_occupancy >= $room->capacity) Penuh
                    @elseif($room->current_occupancy > 0) Terisi
                    @else Tersedia @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>