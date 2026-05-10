<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Room;
use App\Models\RoomOccupancy;
use App\Models\Payment;      // <-- TAMBAHKAN INI
use App\Models\Complaint;    // <-- TAMBAHKAN INI
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\PenghuniImport;
use App\Exports\PenghuniExport;

class PenghuniController extends Controller
{
    public function index()
    {
        $penghuni = User::where('role', 'mahasiswa')
            ->with('activeRoom.room')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Admin/Penghuni/Index', [
            'penghuni' => $penghuni
        ]);
    }

    public function create()
    {
        $rooms = Room::where('status', 'available')->get();
            
        return Inertia::render('Admin/Penghuni/Create', [
            'rooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'nim' => 'required|string|unique:users',
            'phone' => 'nullable|string',
            'faculty' => 'required|string',
            'room_id' => 'nullable|exists:rooms,id',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'nim' => $validated['nim'],
            'phone' => $validated['phone'],
            'faculty' => $validated['faculty'],
            'role' => 'mahasiswa',
            'password' => bcrypt($validated['password']),
            'email_verified_at' => now(),
        ]);

        if ($request->filled('room_id')) {
            RoomOccupancy::create([
                'room_id' => $request->room_id,
                'user_id' => $user->id,
                'check_in_date' => now(),
                'status' => 'active'
            ]);
            
            $room = Room::find($request->room_id);
            $room->increment('current_occupancy');
            $room->update(['status' => 'occupied']);
        }

        return redirect()->route('admin.penghuni.index')
            ->with('success', 'Penghuni berhasil ditambahkan');
    }

    public function edit(User $penghuni)
    {
        $rooms = Room::all();
        $currentRoom = $penghuni->activeRoom()->with('room')->first();
        
        return Inertia::render('Admin/Penghuni/Edit', [
            'penghuni' => $penghuni,
            'rooms' => $rooms,
            'currentRoom' => $currentRoom
        ]);
    }

    public function update(Request $request, User $penghuni)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $penghuni->id,
            'nim' => 'required|string|unique:users,nim,' . $penghuni->id,
            'phone' => 'nullable|string',
            'faculty' => 'required|string',
        ]);

        $penghuni->update($validated);

        return redirect()->route('admin.penghuni.index')
            ->with('success', 'Penghuni berhasil diupdate');
    }

    public function destroy(User $penghuni)
    {
        $occupancy = $penghuni->activeRoom()->first();
        if ($occupancy) {
            $room = Room::find($occupancy->room_id);
            if ($room) {
                $room->decrement('current_occupancy');
            }
            $occupancy->delete();
        }
        
        $penghuni->delete();

        return redirect()->route('admin.penghuni.index')
            ->with('success', 'Penghuni berhasil dihapus');
    }
    
    public function assignRoom(Request $request, User $penghuni)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date',
        ]);
        
        $activeRoom = $penghuni->activeRoom()->first();
        if ($activeRoom) {
            $activeRoom->update(['status' => 'completed', 'check_out_date' => now()]);
            
            $oldRoom = Room::find($activeRoom->room_id);
            if ($oldRoom) {
                $oldRoom->decrement('current_occupancy');
            }
        }
        
        RoomOccupancy::create([
            'room_id' => $request->room_id,
            'user_id' => $penghuni->id,
            'check_in_date' => $request->check_in_date,
            'status' => 'active'
        ]);
        
        $room = Room::find($request->room_id);
        $room->increment('current_occupancy');
        if ($room->current_occupancy >= $room->capacity) {
            $room->update(['status' => 'occupied']);
        }
        
        return redirect()->route('admin.penghuni.index')
            ->with('success', 'Kamar berhasil diassign');
    }

    public function export()
    {
        return Excel::download(new PenghuniExport, 'penghuni-' . date('Y-m-d') . '.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048'
        ]);
        
        try {
            $import = new PenghuniImport();
            Excel::import($import, $request->file('file'));
            
            $imported = $import->getImportedCount();
            $skipped = $import->getSkippedCount();
            
            $message = "Berhasil import {$imported} data penghuni";
            if ($skipped > 0) {
                $message .= ", {$skipped} data gagal (email/NIM sudah ada)";
            }
            
            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal import: ' . $e->getMessage());
        }
    }

    public function show($id)
    {
        $penghuni = User::where('role', 'mahasiswa')->findOrFail($id);
        $currentRoom = $penghuni->activeRoom()->with('room')->first();
        $payments = Payment::where('user_id', $id)->orderBy('created_at', 'desc')->get();
        $complaints = Complaint::where('user_id', $id)->orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Admin/Penghuni/Show', [
            'penghuni' => $penghuni,
            'currentRoom' => $currentRoom,
            'payments' => $payments,
            'complaints' => $complaints,
        ]);
    }
}