<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    public function index()
    {
        $complaints = Complaint::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Mahasiswa/Complaints/Index', [
            'complaints' => $complaints
        ]);
    }

    public function create()
    {
        return Inertia::render('Mahasiswa/Complaints/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:fasilitas,kebersihan,keamanan,lainnya',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/complaints'), $imageName);
            $imagePath = 'uploads/complaints/' . $imageName;
        }

        Complaint::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'category' => $request->category,
            'status' => 'pending',
        ]);

        return redirect()->route('mahasiswa.complaints.index')
            ->with('success', 'Pengaduan berhasil dikirim');
    }

    public function show(Complaint $complaint)
    {
        if ($complaint->user_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('Mahasiswa/Complaints/Show', [
            'complaint' => $complaint
        ]);
    }
}