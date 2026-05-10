<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Room;
use App\Models\Payment;
use App\Models\Complaint;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $stats = [
            'total_mahasiswa' => User::where('role', 'mahasiswa')->count(),
            'total_kamar' => Room::count(),
            'total_pembayaran' => Payment::count(),
            'total_pengaduan' => Complaint::count(),
        ];

        $okupansiData = [
            'labels' => ['Terisi', 'Kosong', 'Maintenance'],
            'data' => [
                Room::where('status', 'occupied')->count(),
                Room::where('status', 'available')->count(),
                Room::where('status', 'maintenance')->count(),
            ]
        ];

        $paymentStatusData = [
            'labels' => ['Lunas', 'Pending', 'Gagal'],
            'data' => [
                Payment::where('status', 'success')->count(),
                Payment::where('status', 'pending')->count(),
                Payment::where('status', 'failed')->count(),
            ]
        ];

        if ($user->role === 'admin') {
            return Inertia::render('Dashboard', [
                'title' => 'Dashboard Admin',
                'role' => 'admin',
                'stats' => $stats,
                'okupansiData' => $okupansiData,
                'paymentStatusData' => $paymentStatusData,
            ]);
        }
        
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard Mahasiswa',
            'role' => 'mahasiswa',
            'user' => $user,
        ]);
    }
}