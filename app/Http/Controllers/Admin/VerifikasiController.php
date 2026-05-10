<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class VerifikasiController extends Controller
{
    public function index()
    {
        $pendingUsers = User::where('role', 'mahasiswa')
            ->where('is_verified', 0)
            ->orderBy('created_at', 'asc')
            ->get();

        $verifiedUsers = User::where('role', 'mahasiswa')
            ->where('is_verified', 1)
            ->orderBy('verified_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Verifikasi/Index', [
            'pendingUsers' => $pendingUsers,
            'verifiedUsers' => $verifiedUsers,
        ]);
    }

    public function verify($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->is_verified = 1;
            $user->verified_at = now();
            $user->verified_by = auth()->id();
            $user->rejection_note = null;
            $user->save();
            return redirect()->route('admin.verifikasi.index')->with('success', 'Akun berhasil diverifikasi');
        }
        return redirect()->back()->with('error', 'User tidak ditemukan');
    }

    public function reject(Request $request, $id)
    {
        $request->validate([
            'rejection_note' => 'required|string|min:5',
        ]);

        $user = User::find($id);
        if ($user) {
            $user->is_verified = 0;
            $user->rejection_note = $request->rejection_note;
            $user->verified_at = null;
            $user->verified_by = null;
            $user->save();
            return redirect()->route('admin.verifikasi.index')->with('success', 'Akun ditolak');
        }
        return redirect()->back()->with('error', 'User tidak ditemukan');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return redirect()->route('admin.verifikasi.index')->with('success', 'Akun dihapus');
        }
        return redirect()->back()->with('error', 'User tidak ditemukan');
    }
}