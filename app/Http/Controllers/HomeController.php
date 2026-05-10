<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Announcement;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $rooms = Room::where('status', 'available')
            ->orWhere('status', 'occupied')
            ->get();
        
        $announcements = Announcement::where('is_active', true)
            ->where(function($q) {
                $q->where('target', 'all')->orWhere('target', 'mahasiswa');
            })
            ->orderBy('published_at', 'desc')
            ->limit(4)
            ->get();
        
        return Inertia::render('Home', [
            'rooms' => $rooms,
            'announcements' => $announcements,
        ]);
    }

    public function showAnnouncement(Announcement $announcement)
    {
        if (!$announcement->is_active) {
            abort(404);
        }
        
        return Inertia::render('PengumumanDetail', [
            'announcement' => $announcement
        ]);
    }
}