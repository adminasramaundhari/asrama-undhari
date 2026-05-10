<!DOCTYPE html>
<html>
<head>
    <title>Invoice Pembayaran</title>
</head>
<body>
    <h1>Invoice Pembayaran Asrama UNDHARI</h1>
    <p>Kepada Yth. {{ $payment->user->name }}</p>
    <p>Berikut adalah detail tagihan Anda:</p>
    <table border="1" cellpadding="10">
        <tr><td>Invoice</td><td>{{ $payment->invoice_number }}</td></tr>
        <tr><td>Jumlah</td><td>Rp {{ number_format($payment->amount, 0, ',', '.') }}</td></tr>
        <tr><td>Jatuh Tempo</td><td>{{ $payment->due_date }}</td></tr>
        <tr><td>Status</td><td>{{ $payment->status }}</td></tr>
    </table>
    <p>Silakan login ke sistem untuk melakukan pembayaran.</p>
    <p>Terima kasih.</p>
</body>
</html>