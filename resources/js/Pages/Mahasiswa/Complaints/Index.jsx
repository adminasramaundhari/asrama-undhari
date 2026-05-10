import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, complaints }) {
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
        if (statusFilter === 'all') return complaints;
        return complaints.filter(c => c.status === statusFilter);
    }, [complaints, statusFilter]);

    // Statistik
    const total = complaints?.length || 0;
    const totalPending = complaints?.filter(c => c.status === 'pending').length || 0;
    const totalResolved = complaints?.filter(c => c.status === 'resolved').length || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pengaduan Saya</h2>}
        >
            <Head title="Pengaduan Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Total Pengaduan', value: total, color: 'bg-primary', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                </svg>
                            )},
                            { label: 'Menunggu', value: totalPending, color: 'bg-yellow-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            )},
                            { label: 'Selesai', value: totalResolved, color: 'bg-green-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Pengaduan</h3>
                                <span className="text-sm text-gray-400">({filteredComplaints.length} pengaduan)</span>
                            </div>
                            <Link href={route('mahasiswa.complaints.create')}>
                                <PrimaryButton
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    Buat Pengaduan
                                </PrimaryButton>
                            </Link>
                        </div>

                        {/* Filter */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 flex-wrap">
                                {[
                                    { value: 'all', label: 'Semua' },
                                    { value: 'pending', label: 'Menunggu' },
                                    { value: 'processing', label: 'Diproses' },
                                    { value: 'resolved', label: 'Selesai' },
                                    { value: 'rejected', label: 'Ditolak' },
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStatusFilter(opt.value)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                            statusFilter === opt.value
                                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {filteredComplaints.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                    </svg>
                                    <p className="text-sm font-medium">{statusFilter !== 'all' ? 'Tidak ada pengaduan dengan status ini' : 'Belum ada pengaduan'}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredComplaints.map((c) => {
                                        const status = getStatusBadge(c.status);
                                        return (
                                            <div key={c.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                                                                {c.title}
                                                            </h4>
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${status.color}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                {status.text}
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                                </svg>
                                                                {c.created_at?.split('T')[0] || '-'}
                                                            </span>
                                                            <span className="inline-flex items-center px-2 py-0.5 bg-primary/10 dark:bg-primary/20 rounded-md text-primary font-medium">
                                                                {c.category}
                                                            </span>
                                                        </div>

                                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                                            {c.description}
                                                        </p>

                                                        {/* Foto */}
                                                        {c.image && (
                                                            <a 
                                                                href={`/${c.image}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="inline-block mb-3"
                                                            >
                                                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                                                                    <img 
                                                                        src={`/${c.image}`} 
                                                                        alt="Bukti" 
                                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                                    />
                                                                </div>
                                                            </a>
                                                        )}

                                                        {/* Respon Admin */}
                                                        {c.admin_response && (
                                                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
                                                                <p className="text-xs text-blue-500 uppercase font-semibold mb-1">Respon Admin:</p>
                                                                <p className="text-sm text-blue-700 dark:text-blue-400">{c.admin_response}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <Link 
                                                        href={route('mahasiswa.complaints.show', c.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm shadow-primary/20 sm:flex-shrink-0"
                                                    >
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                        Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}