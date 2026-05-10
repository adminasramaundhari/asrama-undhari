<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Pengumuman</title>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #FF2A00; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FF2A00; color: white; }
    </style>
</head>
<body>
    <h1>Laporan Data Pengumuman Asrama UNDHARI</h1>
    <p>Tanggal: {{ date('d-m-Y H:i:s') }}</p>
    <table>
        <thead>
            <tr><th>Judul</th><th>Target</th><th>Status</th><th>Tanggal Publikasi</th></tr>
        </thead>
        <tbody>
            @foreach($data as $announcement)
            <tr>
                <td>{{ $announcement->title }}</td>
                <td>{{ $announcement->target }}</td>
                <td>{{ $announcement->is_active ? 'Aktif' : 'Nonaktif' }}</td>
                <td>{{ $announcement->published_at ? date('d/m/Y', strtotime($announcement->published_at)) : '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>