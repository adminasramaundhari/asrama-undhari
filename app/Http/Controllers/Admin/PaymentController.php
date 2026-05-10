<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\User;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('user', 'room')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments
        ]);
    }

    public function create()
    {
        $users = User::where('role', 'mahasiswa')->get();
        $rooms = Room::all();
        
        return Inertia::render('Admin/Payments/Create', [
            'users' => $users,
            'rooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'payment_type' => 'required|in:monthly,semester,annual',
        ]);

        $user = User::find($request->user_id);
        
        $payment = Payment::create([
            'user_id' => $request->user_id,
            'invoice_number' => 'INV-' . date('Ymd') . '-' . strtoupper(uniqid()),
            'order_id' => 'ORD-' . date('Ymd') . '-' . strtoupper(uniqid()),
            'amount' => $request->amount,
            'payment_type' => $request->payment_type,
            'due_date' => $request->due_date,
            'status' => 'pending',
        ]);

        return redirect()->route('admin.payments.index')
            ->with('success', 'Tagihan berhasil dibuat untuk ' . ($user ? $user->name : 'Mahasiswa'));
    }

    public function show(Payment $payment)
    {
        $payment->load('user', 'room', 'verifier');
        
        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $request->validate([
            'status' => 'required|in:pending,success,failed',
        ]);

        $payment->update(['status' => $request->status]);
        
        return redirect()->route('admin.payments.index')
            ->with('success', 'Status pembayaran diupdate');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        
        return redirect()->route('admin.payments.index')
            ->with('success', 'Tagihan dihapus');
    }

    public function verifyProof(Request $request, Payment $payment)
    {
        $request->validate([
            'action' => 'required|in:verify,reject',
            'rejection_note' => 'required_if:action,reject|nullable|string',
        ]);

        if ($request->action === 'verify') {
            $payment->update([
                'proof_status' => 'verified',
                'verified_at' => now(),
                'verified_by' => auth()->id(),
                'status' => 'success',
                'payment_date' => now(),
                'rejection_note' => null,
            ]);
            $message = 'Pembayaran berhasil diverifikasi';
        } else {
            $payment->update([
                'proof_status' => 'rejected',
                'rejection_note' => $request->rejection_note,
                'verified_at' => now(),
                'verified_by' => auth()->id(),
            ]);
            $message = 'Bukti pembayaran ditolak';
        }

        return redirect()->route('admin.payments.show', $payment)
            ->with('success', $message);
    }
}