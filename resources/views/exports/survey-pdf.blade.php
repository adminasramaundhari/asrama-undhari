<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Survey</title>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #FF2A00; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FF2A00; color: white; }
    </style>
</head>
<body>
    <h1>Laporan Data Survey Asrama UNDHARI</h1>
    <p>Tanggal: {{ date('d-m-Y H:i:s') }}</p>
    <table>
        <thead>
            <tr><th>Judul Survey</th><th>Periode</th><th>Status</th><th>Jumlah Pertanyaan</th></tr>
        </thead>
        <tbody>
            @foreach($data as $survey)
            <tr>
                <td>{{ $survey->title }}</td>
                <td>{{ date('d/m/Y', strtotime($survey->start_date)) }} - {{ date('d/m/Y', strtotime($survey->end_date)) }}</td>
                <td>{{ $survey->is_active ? 'Aktif' : 'Nonaktif' }}</td>
                <td>{{ $survey->questions->count() }} pertanyaan</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>