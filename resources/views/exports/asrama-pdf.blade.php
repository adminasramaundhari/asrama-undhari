<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Asrama</title>
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
    <h1>Laporan Data Asrama UNDHARI</h1>
    <div class="date">Tanggal: {{ date('d-m-Y H:i:s') }}</div>
    
    <table>
        <thead>
            <tr><th>No</th><th>Nama Asrama</th><th>Kode</th><th>Alamat</th><th>Total Kamar</th></tr>
        </thead>
        <tbody>
            @foreach($data as $index => $asrama)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $asrama->name }}</td>
                <td>{{ $asrama->code }}</td>
                <td>{{ $asrama->address ?? '-' }}</td>
                <td>{{ $asrama->rooms_count ?? $asrama->rooms->count() }} kamar</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>