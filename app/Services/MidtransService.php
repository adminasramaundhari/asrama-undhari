<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;
use App\Models\Payment;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function createTransaction($payment)
    {
        $params = [
            'transaction_details' => [
                'order_id' => $payment->order_id,
                'gross_amount' => $payment->amount,
            ],
            'customer_details' => [
                'first_name' => $payment->user->name,
                'email' => $payment->user->email,
            ],
            'item_details' => [
                [
                    'id' => $payment->id,
                    'price' => $payment->amount,
                    'quantity' => 1,
                    'name' => 'Pembayaran Asrama - ' . $payment->invoice_number,
                ]
            ]
        ];

        return Snap::createTransaction($params);
    }

    public function handleNotification()
    {
        $notification = new Notification();
        
        $orderId = $notification->order_id;
        $transactionStatus = $notification->transaction_status;
        $fraudStatus = $notification->fraud_status;

        $payment = Payment::where('order_id', $orderId)->first();
        
        if (!$payment) return;

        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $payment->update(['status' => 'success', 'payment_date' => now()]);
            }
        } else if ($transactionStatus == 'settlement') {
            $payment->update(['status' => 'success', 'payment_date' => now()]);
        } else if ($transactionStatus == 'pending') {
            $payment->update(['status' => 'pending']);
        } else if ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
            $payment->update(['status' => 'failed']);
        }

        $payment->update(['payment_response' => json_encode($notification)]);
        
        return $payment;
    }
}