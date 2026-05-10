<!DOCTYPE html>
<html>
<head>
    <title>Laporan Penghuni</title>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #FF2A00; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FF2A00; color: white; }
    </style>
</head>
<body>
    <h1>Laporan Data Penghuni Asrama UNDHARI</h1>
    <p>Tanggal: {{ date('d-m-Y H:i:s') }}</p>
    <table>
        <thead>
            <tr><th>Nama</th><th>NIM</th><th>Email</th><th>No HP</th><th>Fakultas</th></tr>
        </thead>
        <tbody>
            @foreach($data as $item)
            <tr>
                <td>{{ $item->name }}</td>
                <td>{{ $item->nim }}</td>
                <td>{{ $item->email }}</td>
                <td>{{ $item->phone }}</td>
                <td>{{ $item->faculty }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>