import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ auth, complaints }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Menunggu', color: 'bg-yellow-500' };
            case 'processing': return { text: 'Diproses', color: 'bg-blue-500' };
            case 'resolved': return { text: 'Selesai', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    // Filter
    const filteredComplaints = useMemo(() => {
        if (!complaints) return [];
        let result = complaints;
        
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(c =>
                (c.title && c.title.toLowerCase().includes(term)) ||
                (c.user?.name && c.user.name.toLowerCase().includes(term)) ||
                (c.category && c.category.toLowerCase().includes(term)) ||
                (c.description && c.description.toLowerCase().includes(term))
            );
        }
        
        if (statusFilter !== 'all') {
            result = result.filter(c => c.status === statusFilter);
        }
        
        return result;
    }, [complaints, searchTerm, statusFilter]);

    // Statistik
    const total = complaints?.length || 0;
    const totalPending = complaints?.filter(c => c.status === 'pending').length || 0;
    const totalProcessing = complaints?.filter(c => c.status === 'processing').length || 0;
    const totalResolved = complaints?.filter(c => c.status === 'resolved').length || 0;

    const statusOptions = [
        { value: 'all', label: 'Semua', count: total },
        { value: 'pending', label: 'Menunggu', count: totalPending, color: 'bg-yellow-500' },
        { value: 'processing', label: 'Diproses', count: totalProcessing, color: 'bg-blue-500' },
        { value: 'resolved', label: 'Selesai', count: totalResolved, color: 'bg-green-500' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Pengaduan</h2>}
        >
            <Head title="Manajemen Pengaduan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Total Pengaduan', value: total, color: 'bg-primary', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            )},
                            { label: 'Menunggu', value: totalPending, color: 'bg-yellow-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            )},
                            { label: 'Diproses', value: totalProcessing, color: 'bg-blue-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )},
                            { label: 'Selesai', value: totalResolved, color: 'bg-green-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            )},
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                                        <p className="text-xl font-black text-gray-900 dark:text-white">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Pengaduan</h3>
                            <span className="text-sm text-gray-400">({filteredComplaints.length} pengaduan)</span>
                        </div>

                        {/* Search & Filter */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari judul, pengirim, atau kategori..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Hapus pencarian">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {statusOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStatusFilter(opt.value)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                                            statusFilter === opt.value
                                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {opt.color && <span className={`w-2 h-2 rounded-full ${opt.color}`} />}
                                        {opt.label}
                                        <span className="opacity-60">({opt.count})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="p-6">
                            {filteredComplaints.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-20 h-20 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                    </svg>
                                    <p className="text-lg font-medium">{searchTerm || statusFilter !== 'all' ? 'Tidak ada hasil' : 'Belum ada pengaduan'}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['Tanggal', 'Pengirim', 'Judul', 'Kategori', 'Foto', 'Status', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{th}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {filteredComplaints.map((c) => {
                                                const status = getStatusBadge(c.status);
                                                return (
                                                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            {c.created_at?.split('T')[0] || '-'}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {c.user?.name || '-'}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
                                                            {c.title}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            <span className="inline-flex px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium">
                                                                {c.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                            {c.image ? (
                                                                <a href={'/' + c.image} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                                                        <polyline points="21 15 16 10 5 21" />
                                                                    </svg>
                                                                    Lihat
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400">-</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${status.color}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                {status.text}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                            <Link 
                                                                href={route('admin.complaints.show', c.id)}
                                                                className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 inline-flex items-center gap-1.5"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                    <circle cx="12" cy="12" r="3" />
                                                                </svg>
                                                                Detail
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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