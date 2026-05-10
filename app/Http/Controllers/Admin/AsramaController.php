<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asrama;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AsramaController extends Controller
{
    public function index()
    {
        $asramas = Asrama::withCount('rooms')->orderBy('name')->get();
        return Inertia::render('Admin/Asramas/Index', [
            'asramas' => $asramas
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Asramas/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:asramas',
            'code' => 'required|string|max:10|unique:asramas',
            'address' => 'nullable|string',
        ]);

        Asrama::create($request->all());

        return redirect()->route('admin.asramas.index')
            ->with('success', 'Asrama berhasil ditambahkan');
    }

    public function edit(Asrama $asrama)
    {
        return Inertia::render('Admin/Asramas/Edit', [
            'asrama' => $asrama
        ]);
    }

    public function update(Request $request, Asrama $asrama)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:asramas,name,' . $asrama->id,
            'code' => 'required|string|max:10|unique:asramas,code,' . $asrama->id,
            'address' => 'nullable|string',
        ]);

        $asrama->update($request->all());

        return redirect()->route('admin.asramas.index')
            ->with('success', 'Asrama berhasil diupdate');
    }

    public function destroy(Asrama $asrama)
    {
        if ($asrama->rooms()->count() > 0) {
            return redirect()->back()->with('error', 'Asrama memiliki kamar, tidak bisa dihapus');
        }
        
        $asrama->delete();
        return redirect()->route('admin.asramas.index')
            ->with('success', 'Asrama berhasil dihapus');
    }

    public function show(Asrama $asrama)
    {
        $asrama->load('rooms');
        return Inertia::render('Admin/Asramas/Show', [
            'asrama' => $asrama
        ]);
    }
}