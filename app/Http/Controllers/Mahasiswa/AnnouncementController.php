<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::where('is_active', true)
            ->where(function($query) {
                $query->where('target', 'all')
                    ->orWhere('target', 'mahasiswa');
            })
            ->orderBy('published_at', 'desc')
            ->get();
        
        return Inertia::render('Mahasiswa/Announcements/Index', [
            'announcements' => $announcements
        ]);
    }

    public function show(Announcement $announcement)
    {
        if (!$announcement->is_active || ($announcement->target !== 'all' && $announcement->target !== 'mahasiswa')) {
            abort(404);
        }
        
        return Inertia::render('Mahasiswa/Announcements/Show', [
            'announcement' => $announcement
        ]);
    }
}