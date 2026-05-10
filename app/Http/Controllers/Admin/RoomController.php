<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Asrama;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with('asrama')->orderBy('room_number')->get();
        $asramas = Asrama::all();
        
        return Inertia::render('Admin/Rooms/Index', [
            'rooms' => $rooms,
            'asramas' => $asramas,
        ]);
    }

    public function create()
    {
        $asramas = Asrama::all();
        return Inertia::render('Admin/Rooms/Create', [
            'asramas' => $asramas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'asrama_id' => 'required|exists:asramas,id',  // WAJIB
            'room_number' => 'required|string|max:10',
            'room_type' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'price_per_month' => 'required|numeric|min:0',
            'facilities' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        // Cek duplikat nomor kamar di asrama yang sama
        $exists = Room::where('asrama_id', $request->asrama_id)
            ->where('room_number', $request->room_number)
            ->exists();
            
        if ($exists) {
            return redirect()->back()->withErrors(['room_number' => 'Nomor kamar sudah ada di asrama ini']);
        }

        $validated['current_occupancy'] = 0;
        $validated['status'] = 'available';
        
        Room::create($validated);

        return redirect()->route('admin.rooms.index')
            ->with('success', 'Kamar berhasil ditambahkan');
    }

    public function edit(Room $room)
    {
        $asramas = Asrama::all();
        return Inertia::render('Admin/Rooms/Edit', [
            'room' => $room,
            'asramas' => $asramas
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'asrama_id' => 'required|exists:asramas,id',
            'room_number' => 'required|string|max:10',
            'room_type' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'price_per_month' => 'required|numeric|min:0',
            'facilities' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $exists = Room::where('asrama_id', $request->asrama_id)
            ->where('room_number', $request->room_number)
            ->where('id', '!=', $room->id)
            ->exists();
            
        if ($exists) {
            return redirect()->back()->withErrors(['room_number' => 'Nomor kamar sudah ada di asrama ini']);
        }

        $room->update($validated);

        return redirect()->route('admin.rooms.index')
            ->with('success', 'Kamar berhasil diupdate');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('admin.rooms.index')
            ->with('success', 'Kamar berhasil dihapus');
    }

    public function show($id)
    {
        $room = Room::with('asrama')->findOrFail($id);
        return Inertia::render('Admin/Rooms/Show', [
            'room' => $room
        ]);
    }
}