<!DOCTYPE html>
<html>
<head>
    <title>Laporan Pembayaran</title>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #FF2A00; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FF2A00; color: white; }
        .text-center { text-align: center; }
    </style>
</head>
<body>
    <h1>Laporan Pembayaran Asrama UNDHARI</h1>
    <p>Tanggal: {{ date('d-m-Y H:i:s') }}</p>
    <table>
        <thead>
            <tr>
                <th>No. Invoice</th>
                <th>Nama Mahasiswa</th>
                <th>Jumlah</th>
                <th>Status</th>
                <th>Tanggal Bayar</th>
                <th>Jatuh Tempo</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $item)
            <tr>
                <td>{{ $item->invoice_number ?? '-' }}</td>
                <td>{{ $item->user->name ?? '-' }}</td>
                <td class="text-center">Rp {{ number_format($item->amount, 0, ',', '.') }}</td>
                <td>{{ $item->status }}</td>
                <td>{{ $item->payment_date ?? '-' }}</td>
                <td>{{ $item->due_date }}</td>
            </tr>
            @endforeach
        </tbody>
    66table
</body>
</html>