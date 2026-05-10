<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Mahasiswa/Payments/Index', [
            'payments' => $payments
        ]);
    }

    public function show(Payment $payment)
    {
        if ($payment->user_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('Mahasiswa/Payments/Show', [
            'payment' => $payment
        ]);
    }

    public function uploadProof(Request $request, Payment $payment)
    {
        if ($payment->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'payment_proof' => 'required|file|image|mimes:jpeg,png,jpg,pdf|max:2048',
        ]);

        if ($request->hasFile('payment_proof')) {
            if ($payment->payment_proof && file_exists(public_path($payment->payment_proof))) {
                unlink(public_path($payment->payment_proof));
            }

            $file = $request->file('payment_proof');
            $fileName = 'proof_' . $payment->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/payment_proofs'), $fileName);

            $payment->update([
                'payment_proof' => 'uploads/payment_proofs/' . $fileName,
                'proof_status' => 'pending',
            ]);
        }

        return redirect()->back()->with('success', 'Bukti pembayaran berhasil diupload');
    }
}