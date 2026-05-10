import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useRef, useState, useMemo } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, penghuni, flash }) {
    const fileInput = useRef(null);
    const [importing, setImporting] = useState(false);
    const [message, setMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImporting(true);
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await axios.post('/admin/penghuni/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ type: 'success', text: response.data.message || 'Import berhasil!' });
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            setMessage({ type: 'error', text: 'Gagal import: ' + msg });
        } finally {
            setImporting(false);
            if (fileInput.current) fileInput.current.value = '';
        }
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus penghuni ${name}?`)) {
            router.delete(route('admin.penghuni.destroy', id));
        }
    };

    // Filter pencarian
    const filteredPenghuni = useMemo(() => {
        if (!penghuni) return [];
        if (!searchTerm.trim()) return penghuni;
        const term = searchTerm.toLowerCase().trim();
        return penghuni.filter(p => 
            (p.name && p.name.toLowerCase().includes(term)) ||
            (p.nim && p.nim.toLowerCase().includes(term)) ||
            (p.email && p.email.toLowerCase().includes(term)) ||
            (p.faculty && p.faculty.toLowerCase().includes(term)) ||
            (p.active_room?.room?.room_number && p.active_room.room.room_number.toLowerCase().includes(term))
        );
    }, [penghuni, searchTerm]);

    // Statistik
    const totalPenghuni = penghuni?.length || 0;
    const sudahAssign = penghuni?.filter(p => p.active_room?.room?.room_number).length || 0;
    const belumAssign = totalPenghuni - sudahAssign;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Penghuni</h2>}
        >
            <Head title="Manajemen Penghuni" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Flash Message */}
                    {(flash?.success || message?.text) && (
                        <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-[fadeIn_0.3s_ease-out] ${
                            message?.type === 'error' || flash?.error 
                                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' 
                                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                        }`}>
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                {message?.type === 'error' || flash?.error ? (
                                    <circle cx="12" cy="12" r="10" />
                                ) : (
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                )}
                                <polyline points={message?.type === 'error' || flash?.error ? "12 8 12 12" : "22 4 12 14.01 9 11.01"} />
                                {message?.type === 'error' || flash?.error && <line x1="12" y1="16" x2="12.01" y2="16" />}
                            </svg>
                            <span className="text-sm font-medium">{message?.text || flash?.success || flash?.error}</span>
                            <button onClick={() => setMessage(null)} className="ml-auto text-current opacity-50 hover:opacity-100">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="7" r="3" />
                                        <circle cx="18" cy="5" r="2.5" />
                                        <circle cx="12" cy="17" r="3" />
                                        <path d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Penghuni</p>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">{totalPenghuni}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                        <rect x="6" y="10" width="12" height="8" rx="1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sudah Assign Kamar</p>
                                    <p className="text-2xl font-black text-green-600 dark:text-green-400">{sudahAssign}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Belum Assign</p>
                                    <p className="text-2xl font-black text-yellow-600 dark:text-yellow-400">{belumAssign}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Data Penghuni
                                </h3>
                                <span className="text-sm text-gray-400">({filteredPenghuni.length} orang)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className={`inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer shadow-md shadow-blue-600/20 ${importing ? 'opacity-50 pointer-events-none' : ''}`}>
                                    {importing ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                                                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                            Mengimport...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                            Import Excel
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        onChange={handleImport}
                                        accept=".xlsx,.xls,.csv"
                                        className="hidden"
                                        disabled={importing}
                                    />
                                </label>
                                <Link href={route('admin.penghuni.create')}>
                                    <PrimaryButton
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                        }
                                    >
                                        Tambah
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="relative max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari nama, NIM, email, fakultas, atau kamar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label="Hapus pencarian"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="p-6">
                            {filteredPenghuni.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-20 h-20 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <circle cx="9" cy="7" r="3" />
                                        <circle cx="18" cy="5" r="2.5" />
                                        <path d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                                    </svg>
                                    <p className="text-lg font-medium">
                                        {searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data penghuni'}
                                    </p>
                                    <p className="text-sm mt-1">
                                        {searchTerm ? 'Coba kata kunci lain' : 'Data penghuni akan muncul di sini'}
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['Nama', 'NIM', 'Email', 'Fakultas', 'Kamar', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        {th}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {filteredPenghuni.map((p) => (
                                                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                        {p.name}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        {p.nim || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                                                        {p.email}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        {p.faculty || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                        {p.active_room?.room?.room_number ? (
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold">
                                                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                {p.active_room.room.room_number}
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-semibold">
                                                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                                    <circle cx="12" cy="12" r="10" />
                                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                                </svg>
                                                                Belum assign
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-1.5">
                                                            <Link 
                                                                href={route('admin.penghuni.show', p.id)} 
                                                                className="p-2 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                                                                title="Detail"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                    <circle cx="12" cy="12" r="3" />
                                                                </svg>
                                                            </Link>
                                                            <Link 
                                                                href={route('admin.penghuni.edit', p.id)} 
                                                                className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                </svg>
                                                            </Link>
                                                            <button 
                                                                onClick={() => handleDelete(p.id, p.name)} 
                                                                className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                                                title="Hapus"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}