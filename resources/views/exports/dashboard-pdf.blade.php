<!DOCTYPE html>
<html>
<head>
    <title>Laporan Dashboard</title>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #FF2A00; }
        .card { border: 1px solid #ddd; padding: 15px; margin: 10px; text-align: center; }
        .grid { display: flex; }
    </style>
</head>
<body>
    <h1>Laporan Dashboard Asrama UNDHARI</h1>
    <div class="grid">
        <div class="card"><h3>Total Mahasiswa</h3><p>{{ $stats['total_mahasiswa'] }}</p></div>
        <div class="card"><h3>Total Kamar</h3><p>{{ $stats['total_kamar'] }}</p></div>
        <div class="card"><h3>Total Pembayaran</h3><p>{{ $stats['total_pembayaran'] }}</p></div>
    </div>
</body>
</html>