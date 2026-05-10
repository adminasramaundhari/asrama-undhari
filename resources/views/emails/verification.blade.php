<!DOCTYPE html>
<html>
<head>
    <title>Verifikasi Akun Asrama UNDHARI</title>
</head>
<body>
    <h1>Asrama UNDHARI</h1>
    
    @if($status === 'approved')
        <h2 style="color: green;">✅ Akun Anda telah diverifikasi!</h2>
        <p>Selamat, akun Anda telah disetujui oleh admin.</p>
        <p>Anda sekarang dapat login ke sistem dengan data berikut:</p>
        <ul>
            <li>Email: {{ $user->email }}</li>
            <li>Password: (password yang Anda daftarkan)</li>
        </ul>
    @else
        <h2 style="color: red;">❌ Akun Anda ditolak</h2>
        <p>Mohon maaf, akun Anda belum dapat disetujui.</p>
        <p>Alasan: <strong>{{ $note }}</strong></p>
        <p>Silakan hubungi admin untuk informasi lebih lanjut.</p>
    @endif
    
    <hr>
    <p style="font-size: 12px; color: gray;">Email ini dikirim otomatis oleh Sistem Informasi Asrama UNDHARI</p>
</body>
</html>