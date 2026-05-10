<?php

namespace App\Console\Commands;

use App\Models\Payment;
use App\Models\Notification;
use Illuminate\Console\Command;

class PaymentReminder extends Command
{
    protected $signature = 'payment:reminder';
    protected $description = 'Kirim reminder pembayaran 3 hari sebelum jatuh tempo';

    public function handle()
    {
        $payments = Payment::where('status', 'pending')
            ->whereDate('due_date', '=', now()->addDays(3))
            ->get();

        foreach ($payments as $payment) {
            Notification::create([
                'user_id' => $payment->user_id,
                'title' => 'Reminder Pembayaran',
                'message' => "Tagihan Anda sebesar Rp " . number_format($payment->amount) . " akan jatuh tempo dalam 3 hari.",
                'type' => 'payment',
                'is_read' => false,
            ]);
        }

        $this->info('Reminder terkirim untuk ' . $payments->count() . ' tagihan');
    }
}