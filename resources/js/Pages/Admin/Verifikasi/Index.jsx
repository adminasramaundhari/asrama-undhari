import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, pendingUsers, verifiedUsers, flash }) {
    const { csrf_token } = usePage().props;
    const [rejectNote, setRejectNote] = useState({});
    const [showReject, setShowReject] = useState({});
    const [processing, setProcessing] = useState({});
    const [activeTab, setActiveTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSearchTerm('');
    }, [activeTab]);

    const handleVerify = (userId) => {
        if (!confirm('Verifikasi akun ini?')) return;
        setProcessing(prev => ({ ...prev, [userId]: true }));
        
        router.post(route('admin.verifikasi.verify', userId), {}, {
            onSuccess: () => window.location.reload(),
            onError: (errors) => {
                alert('Gagal verifikasi: ' + JSON.stringify(errors));
                setProcessing(prev => ({ ...prev, [userId]: false }));
            }
        });
    };

    const handleReject = (userId) => {
        const note = rejectNote[userId];
        if (!note || note.trim().length < 5) {
            alert('Alasan penolakan minimal 5 karakter');
            return;
        }
        if (!confirm('Tolak akun ini?')) return;
        
        setProcessing(prev => ({ ...prev, [userId]: true }));
        
        router.post(route('admin.verifikasi.reject', userId), {
            rejection_note: note.trim()
        }, {
            onSuccess: () => window.location.reload(),
            onError: (errors) => {
                alert(errors.rejection_note || errors.error || 'Gagal tolak');
                setProcessing(prev => ({ ...prev, [userId]: false }));
            },
            onFinish: () => {
                setProcessing(prev => ({ ...prev, [userId]: false }));
                setShowReject(prev => ({ ...prev, [userId]: false }));
                setRejectNote(prev => ({ ...prev, [userId]: '' }));
            }
        });
    };

    const handleDelete = (userId, name) => {
        if (!confirm(`Hapus permanen akun ${name}?`)) return;
        setProcessing(prev => ({ ...prev, [userId]: true }));
        
        router.delete(route('admin.verifikasi.destroy', userId), {
            onSuccess: () => window.location.reload(),
            onError: (errors) => {
                alert('Gagal hapus: ' + JSON.stringify(errors));
                setProcessing(prev => ({ ...prev, [userId]: false }));
            }
        });
    };

    const filteredPending = useMemo(() => {
        if (!pendingUsers || pendingUsers.length === 0) return [];
        if (!searchTerm.trim()) return pendingUsers;
        const term = searchTerm.toLowerCase().trim();
        return pendingUsers.filter(user => 
            (user.name?.toLowerCase().includes(term)) ||
            (user.nim?.toLowerCase().includes(term)) ||
            (user.email?.toLowerCase().includes(term)) ||
            (user.faculty?.toLowerCase().includes(term)) ||
            (user.prodi?.toLowerCase().includes(term)) ||
            (user.phone?.toLowerCase().includes(term))
        );
    }, [pendingUsers, searchTerm]);

    const filteredVerified = useMemo(() => {
        if (!verifiedUsers || verifiedUsers.length === 0) return [];
        if (!searchTerm.trim()) return verifiedUsers;
        const term = searchTerm.toLowerCase().trim();
        return verifiedUsers.filter(user => 
            (user.name?.toLowerCase().includes(term)) ||
            (user.nim?.toLowerCase().includes(term)) ||
            (user.email?.toLowerCase().includes(term)) ||
            (user.faculty?.toLowerCase().includes(term)) ||
            (user.prodi?.toLowerCase().includes(term))
        );
    }, [verifiedUsers, searchTerm]);

    const getCurrentDataCount = () => {
        return activeTab === 'pending' ? filteredPending.length : filteredVerified.length;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Verifikasi Akun Mahasiswa</h2>}
        >
            <Head title="Verifikasi Akun" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                            </svg>
                            {flash.error}
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex items-center gap-1 mb-6 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm border border-gray-100 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                activeTab === 'pending'
                                    ? 'bg-yellow-500 text-white shadow-md shadow-yellow-500/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Menunggu
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{pendingUsers?.length || 0}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('verified')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                activeTab === 'verified'
                                    ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Terverifikasi
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{verifiedUsers?.length || 0}</span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama, NIM, atau email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    aria-label="Hapus pencarian"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Ditemukan <span className="font-semibold text-gray-700 dark:text-gray-300">{getCurrentDataCount()}</span> hasil dari "<span className="font-medium">{searchTerm}</span>"
                            </p>
                        )}
                    </div>

                    {/* Tab Pending */}
                    {activeTab === 'pending' && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-yellow-500 flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Menunggu Verifikasi</h3>
                                <span className="text-sm text-gray-400">({filteredPending.length} akun)</span>
                            </div>

                            <div className="p-6">
                                {filteredPending.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                                        <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <p className="text-sm font-medium">{searchTerm ? 'Tidak ada hasil pencarian' : 'Tidak ada pending verifikasi'}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredPending.map((user) => (
                                            <div key={user.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-sm">
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">Nama:</span> <span className="text-xs font-semibold text-gray-900 dark:text-white">{user.name}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">NIM:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.nim}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">Email:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.email}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">JK:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.kelamin || '-'}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">Fakultas:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.faculty || '-'}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">Prodi:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.prodi || '-'}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">Telepon:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.phone || '-'}</span></div>
                                                    <div><span className="text-xs text-gray-400 dark:text-gray-500">Tgl Daftar:</span> <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{user.created_at?.split('T')[0] || '-'}</span></div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <PrimaryButton
                                                        onClick={() => handleVerify(user.id)}
                                                        disabled={processing[user.id]}
                                                        size="sm"
                                                        iconLeft={
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        }
                                                    >
                                                        {processing[user.id] ? '...' : 'Verifikasi'}
                                                    </PrimaryButton>

                                                    {showReject[user.id] ? (
                                                        <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                            <input
                                                                type="text"
                                                                placeholder="Alasan (min. 5 karakter)"
                                                                value={rejectNote[user.id] || ''}
                                                                onChange={(e) => setRejectNote(prev => ({...prev, [user.id]: e.target.value}))}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') { e.preventDefault(); handleReject(user.id); }
                                                                    if (e.key === 'Escape') { setShowReject(prev => ({...prev, [user.id]: false})); setRejectNote(prev => ({...prev, [user.id]: ''})); }
                                                                }}
                                                                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 w-56"
                                                                autoFocus
                                                            />
                                                            <DangerButton onClick={() => handleReject(user.id)} disabled={processing[user.id]} size="sm">
                                                                {processing[user.id] ? '...' : 'Konfirmasi'}
                                                            </DangerButton>
                                                            <SecondaryButton onClick={() => { setShowReject(prev => ({...prev, [user.id]: false})); setRejectNote(prev => ({...prev, [user.id]: ''})); }} size="sm">
                                                                Batal
                                                            </SecondaryButton>
                                                        </div>
                                                    ) : (
                                                        <DangerButton onClick={() => { setShowReject(prev => ({...prev, [user.id]: true})); setRejectNote(prev => ({...prev, [user.id]: ''})); }} variant="outline" size="sm">
                                                            Tolak
                                                        </DangerButton>
                                                    )}

                                                    <SecondaryButton
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                        disabled={processing[user.id]}
                                                        size="sm"
                                                        iconLeft={
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                            </svg>
                                                        }
                                                    >
                                                        Hapus
                                                    </SecondaryButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab Verified */}
                    {activeTab === 'verified' && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-green-500 flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sudah Terverifikasi</h3>
                                <span className="text-sm text-gray-400">({filteredVerified.length} akun)</span>
                            </div>

                            <div className="p-6">
                                {filteredVerified.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                                        <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                        <p className="text-sm font-medium">{searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada user terverifikasi'}</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                                <tr>
                                                    {['Nama', 'NIM', 'Fakultas', 'Prodi', 'Email', 'Tgl Verifikasi'].map((th) => (
                                                        <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{th}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                                {filteredVerified.map((user) => (
                                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                        <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{user.name}</td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.nim}</td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.faculty}</td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{user.prodi}</td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                            <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                {user.verified_at?.split('T')[0] || '-'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}