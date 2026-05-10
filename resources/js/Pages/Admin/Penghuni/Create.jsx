import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, rooms }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        nim: '',
        phone: '',
        kelamin: '',
        faculty: '',
        prodi: '',
        room_id: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.penghuni.store'));
    };

    // Data Fakultas & Program Studi
    const facultyPrograms = {
        'FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN': [
            'S1 PENDIDIKAN GURU SEKOLAH DASAR (PGSD)',
            'S1 PENDIDIKAN MATEMATIKA',
            'S1 PENDIDIKAN BAHASA INGGRIS',
            'S1 PENDIDIKAN BAHASA INDONESIA',
            'S1 PENDIDIKAN GURU ANAK USIA DINI (PGPAUD)',
            'S1 PENDIDIKAN JASMANI, KESEHATAN, DAN REKREASI'
        ],
        'FAKULTAS ILMU KESEHATAN': [
            'S1 KEPERAWATAN',
            'S1 KEBIDANAN',
            'D3 KEBIDANAN',
            'PROFESI NERS',
            'PROFESI BIDAN'
        ],
        'FAKULTAS HUKUM DAN EKONOMI BISNIS': [
            'S1 MANAJEMEN',
            'S1 HUKUM'
        ],
        'FAKULTAS ILMU KOMPUTER': [
            'S1 SISTEM INFORMASI',
            'S1 TEKNIK INFORMATIKA'
        ]
    };

    // List fakultas dari key object
    const faculties = Object.keys(facultyPrograms);

    // Program studi berdasarkan fakultas terpilih
    const programs = useMemo(() => {
        if (!data.faculty) return [];
        return facultyPrograms[data.faculty] || [];
    }, [data.faculty]);

    // Reset prodi saat fakultas berubah
    const handleFacultyChange = (e) => {
        setData('faculty', e.target.value);
        setData('prodi', ''); // reset prodi
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Penghuni</h2>}
        >
            <Head title="Tambah Penghuni" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Penghuni Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Lengkapi data penghuni asrama</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-6">
                            
                            {/* Section: Data Pribadi */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                    </svg>
                                    Data Pribadi
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel value="Nama Lengkap" required />
                                        <TextInput
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div>
                                        <InputLabel value="Email" required />
                                        <TextInput
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="contoh@email.com"
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div>
                                        <InputLabel value="NIM" required />
                                        <TextInput
                                            value={data.nim}
                                            onChange={(e) => setData('nim', e.target.value)}
                                            placeholder="Masukkan NIM"
                                            required
                                        />
                                        <InputError message={errors.nim} />
                                    </div>

                                    <div>
                                        <InputLabel value="Nomor HP" />
                                        <TextInput
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    <div>
                                        <InputLabel value="Jenis Kelamin" />
                                        <select
                                            value={data.kelamin}
                                            onChange={(e) => setData('kelamin', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                        >
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                        <InputError message={errors.kelamin} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Data Akademik */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                    </svg>
                                    Data Akademik
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel value="Fakultas" required />
                                        <select
                                            value={data.faculty}
                                            onChange={handleFacultyChange}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            required
                                        >
                                            <option value="">Pilih Fakultas</option>
                                            {faculties.map((f) => (
                                                <option key={f} value={f}>{f}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.faculty} />
                                    </div>

                                    <div>
                                        <InputLabel value="Program Studi" required />
                                        <select
                                            value={data.prodi}
                                            onChange={(e) => setData('prodi', e.target.value)}
                                            className={`w-full px-4 py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                                                !data.faculty 
                                                    ? 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                                                    : 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                                            }`}
                                            disabled={!data.faculty}
                                            required
                                        >
                                            <option value="">
                                                {!data.faculty ? 'Pilih fakultas terlebih dahulu' : 'Pilih Program Studi'}
                                            </option>
                                            {programs.map((prodi) => (
                                                <option key={prodi} value={prodi}>{prodi}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.prodi} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Kamar */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                        <rect x="6" y="10" width="12" height="8" rx="1" />
                                    </svg>
                                    Penempatan Kamar
                                </h4>
                                <div className="max-w-md">
                                    <InputLabel value="Kamar (Opsional)" />
                                    <select
                                        value={data.room_id}
                                        onChange={(e) => setData('room_id', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    >
                                        <option value="">Pilih Kamar</option>
                                        {rooms && rooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                Kamar {room.room_number} — {room.room_type} (Kapasitas {room.capacity})
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.room_id} />
                                </div>
                            </div>

                            {/* Section: Keamanan */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                    Keamanan Akun
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel value="Password" required />
                                        <TextInput
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                            required
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div>
                                        <InputLabel value="Konfirmasi Password" required />
                                        <TextInput
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Ulangi password"
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.penghuni.index')}>
                                    <SecondaryButton type="button" iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5" />
                                            <polyline points="12 19 5 12 12 5" />
                                        </svg>
                                    }>
                                        Kembali
                                    </SecondaryButton>
                                </Link>
                                <PrimaryButton type="submit" disabled={processing} loading={processing} iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                }>
                                    {processing ? 'Menyimpan...' : 'Simpan Penghuni'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}