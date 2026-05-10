<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Pengaduan</title>
    <style>
        body { 
            font-family: sans-serif; 
            padding: 20px;
        }
        h1 { 
            color: #FF2A00; 
            margin-bottom: 10px;
        }
        .date {
            color: #666;
            font-size: 12px;
            margin-bottom: 20px;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
        }
        th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left; 
        }
        th { 
            background-color: #FF2A00; 
            color: white; 
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <h1>Laporan Data Pengaduan Asrama UNDHARI</h1>
    <div class="date">Tanggal: {{ date('d-m-Y H:i:s') }}</div>
    
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Pengirim</th>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Status</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $index => $item)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $item->user->name ?? '-' }}</td>
                <td>{{ $item->title }}</td>
                <td>{{ $item->category }}</td>
                <td>{{ $item->status }}</td>
                <td>{{ date('d/m/Y', strtotime($item->created_at)) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>