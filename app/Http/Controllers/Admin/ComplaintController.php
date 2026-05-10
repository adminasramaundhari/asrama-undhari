<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    public function index()
    {
        $complaints = Complaint::with('user')->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Complaints/Index', [
            'complaints' => $complaints
        ]);
    }

    public function show(Complaint $complaint)
    {
        $complaint->load('user');
        
        return Inertia::render('Admin/Complaints/Show', [
            'complaint' => $complaint
        ]);
    }

    public function update(Request $request, Complaint $complaint)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,resolved,rejected',
            'admin_response' => 'nullable|string',
        ]);

        $complaint->update([
            'status' => $request->status,
            'admin_response' => $request->admin_response,
            'resolved_at' => in_array($request->status, ['resolved', 'rejected']) ? now() : null,
        ]);

        return redirect()->route('admin.complaints.index')
            ->with('success', 'Pengaduan berhasil diupdate');
    }

    public function destroy(Complaint $complaint)
    {
        $complaint->delete();
        
        return redirect()->route('admin.complaints.index')
            ->with('success', 'Pengaduan dihapus');
    }
}