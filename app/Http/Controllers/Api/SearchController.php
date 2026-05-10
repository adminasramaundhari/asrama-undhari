<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\User;
use App\Models\Payment;
use App\Models\Complaint;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('q');
        
        if (strlen($query) < 2) {
            return redirect()->back();
        }

        $results = [];
        $isAdmin = auth()->user()->role === 'admin';

        // 1. Cari Kamar
        $rooms = Room::where('room_number', 'LIKE', "%{$query}%")
            ->orWhere('room_type', 'LIKE', "%{$query}%")
            ->get();
        
        foreach ($rooms as $room) {
            $results[] = [
                'title' => "Kamar {$room->room_number}",
                'description' => "Tipe: {$room->room_type} | Kapasitas: {$room->capacity} | Status: " . 
                    ($room->status === 'available' ? 'Tersedia' : ($room->status === 'occupied' ? 'Terisi' : 'Perbaikan')),
                'url' => $isAdmin ? "/admin/rooms/{$room->id}/edit" : "/admin/rooms",
            ];
        }

        // 2. Cari Penghuni
        $penghuni = User::where('role', 'mahasiswa')
            ->where(function($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%")
                    ->orWhere('nim', 'LIKE', "%{$query}%")
                    ->orWhere('email', 'LIKE', "%{$query}%")
                    ->orWhere('faculty', 'LIKE', "%{$query}%");
            })
            ->get();
        
        foreach ($penghuni as $p) {
            $results[] = [
                'title' => $p->name,
                'description' => "NIM: {$p->nim} | Fakultas: {$p->faculty} | Email: {$p->email}",
                'url' => $isAdmin ? "/admin/penghuni/{$p->id}/edit" : "#",
            ];
        }

        // 3. Cari Pembayaran
        $payments = Payment::with('user')
            ->where('invoice_number', 'LIKE', "%{$query}%")
            ->orWhere('status', 'LIKE', "%{$query}%")
            ->get();
        
        foreach ($payments as $payment) {
            $results[] = [
                'title' => "Invoice: {$payment->invoice_number}",
                'description' => "Mahasiswa: {$payment->user->name} | Jumlah: Rp " . number_format($payment->amount, 0, ',', '.'),
                'url' => $isAdmin ? "/admin/payments/{$payment->id}" : "/mahasiswa/payments/{$payment->id}",
            ];
        }

        // 4. Cari Pengaduan
        $complaints = Complaint::with('user')
            ->where('title', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->orWhere('category', 'LIKE', "%{$query}%")
            ->get();
        
        foreach ($complaints as $complaint) {
            $results[] = [
                'title' => $complaint->title,
                'description' => "Oleh: {$complaint->user->name} | Kategori: {$complaint->category} | Status: {$complaint->status}",
                'url' => $isAdmin ? "/admin/complaints/{$complaint->id}" : "/mahasiswa/complaints/{$complaint->id}",
            ];
        }

        // 5. Cari Pengumuman
        $announcements = Announcement::where('title', 'LIKE', "%{$query}%")
            ->orWhere('content', 'LIKE', "%{$query}%")
            ->get();
        
        foreach ($announcements as $announcement) {
            $results[] = [
                'title' => $announcement->title,
                'description' => strip_tags(substr($announcement->content, 0, 100)) . '...',
                'url' => $isAdmin ? "/admin/announcements/{$announcement->id}/edit" : "/mahasiswa/announcements/{$announcement->id}",
            ];
        }

        return Inertia::render('SearchResults', [
            'results' => $results,
            'query' => $query,
        ]);
    }
}