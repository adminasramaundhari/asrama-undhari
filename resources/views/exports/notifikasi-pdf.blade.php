<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Notifikasi</title>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #FF2A00; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FF2A00; color: white; }
    </style>
</head>
<body>
    <h1>Laporan Data Notifikasi Asrama UNDHARI</h1>
    <p>Tanggal: {{ date('d-m-Y H:i:s') }}</p>
    <table>
        <thead>
            <tr><th>Penerima</th><th>Judul</th><th>Tipe</th><th>Status</th><th>Tanggal</th></tr>
        </thead>
        <tbody>
            @foreach($data as $notif)
            <tr>
                <td>{{ $notif->user->name ?? '-' }}</td>
                <td>{{ $notif->title }}</td>
                <td>{{ $notif->type }}</td>
                <td>{{ $notif->is_read ? 'Dibaca' : 'Belum Dibaca' }}</td>
                <td>{{ $notif->created_at->format('d/m/Y H:i') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>