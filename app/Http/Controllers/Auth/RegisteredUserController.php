<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'faculties' => ['FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN', 'FAKULTAS ILMU KESEHATAN', 'FAKULTAS HUKUM DAN EKONOMI BISNIS', 'FAKULTAS ILMU KOMPUTER'],
            'prodis' => [
                'FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN' => ['S1 PENDIDIKAN GURU SEKOLAH DASAR (PGSD)','S1 PENDIDIKAN MATEMATIKA','S1 PENDIDIKAN BAHASA INGGRIS','PENDIDIKAN BAHASA INDONESIA','S1 PENDIDIKAN GURU ANAK USIA DINI (PGPAUD)','S1 PENDIDIKAN JASMANI, KESEHATAN, DAN REKREASI'],
                'FAKULTAS ILMU KESEHATAN' => ['S1 KEPERAWATAN', 'S1 KEBIDANAN', 'D3 KEBIDANAN', 'PROFESI NERS','PROFESI BIDAN'],
                'FAKULTAS HUKUM DAN EKONOMI BISNIS' => ['S1 MANAJEMEN','S1 HUKUM'],
                'FAKULTAS ILMU KOMPUTER' => ['S1 SISTEM INFORMASI', 'S1 TEKNIK INFORMATIKA'],
            ]
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'nim' => 'required|string|unique:users',
            'kelamin' => 'required|in:Laki-laki,Perempuan',
            'faculty' => 'required|in:FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN,FAKULTAS ILMU KESEHATAN,FAKULTAS HUKUM DAN EKONOMI BISNIS,FAKULTAS ILMU KOMPUTER',
            'prodi' => 'required|string',
            'phone' => 'nullable|string|max:15',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'mahasiswa',
            'nim' => $request->nim,
            'kelamin' => $request->kelamin,
            'faculty' => $request->faculty,
            'prodi' => $request->prodi,
            'phone' => $request->phone,
            'is_verified' => false, // WAJIB VERIFIKASI ADMIN
        ]);

        event(new Registered($user));

        // Tidak auto login! Redirect ke halaman konfirmasi
        return redirect()->route('register.waiting')
            ->with('success', 'Pendaftaran berhasil! Silakan tunggu verifikasi dari admin.');
    }
}