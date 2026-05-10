import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, notifications }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const handleDelete = (id, title) => {
        if (confirm(`Hapus permanen notifikasi "${title}"?`)) {
            router.delete(route('admin.notifications.destroy', id));
        }
    };

    const getTypeBadge = (type) => {
        switch(type) {
            case 'info': return { text: 'Info', color: 'bg-blue-500' };
            case 'warning': return { text: 'Warning', color: 'bg-yellow-500' };
            case 'success': return { text: 'Success', color: 'bg-green-500' };
            case 'error': return { text: 'Error', color: 'bg-red-500' };
            default: return { text: type || '-', color: 'bg-gray-500' };
        }
    };

    // Filter
    const filteredNotifications = useMemo(() => {
        if (!notifications) return [];
        let result = notifications;
        
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(n =>
                (n.title && n.title.toLowerCase().includes(term)) ||
                (n.message && n.message.toLowerCase().includes(term)) ||
                (n.user?.name && n.user.name.toLowerCase().includes(term))
            );
        }
        
        if (typeFilter !== 'all') {
            result = result.filter(n => n.type === typeFilter);
        }
        
        return result;
    }, [notifications, searchTerm, typeFilter]);

    // Statistik
    const total = notifications?.length || 0;
    const totalInfo = notifications?.filter(n => n.type === 'info').length || 0;
    const totalWarning = notifications?.filter(n => n.type === 'warning').length || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Notifikasi</h2>}
        >
            <Head title="Manajemen Notifikasi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Total Notifikasi', value: total, color: 'bg-primary', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                                </svg>
                            )},
                            { label: 'Info', value: totalInfo, color: 'bg-blue-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            )},
                            { label: 'Warning', value: totalWarning, color: 'bg-yellow-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
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
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Notifikasi</h3>
                                <span className="text-sm text-gray-400">({filteredNotifications.length} notifikasi)</span>
                            </div>
                            <Link href={route('admin.notifications.create')}>
                                <PrimaryButton
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    Kirim Notifikasi
                                </PrimaryButton>
                            </Link>
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
                                    placeholder="Cari judul, pesan, atau penerima..."
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
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="all">Semua Tipe</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="success">Success</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {filteredNotifications.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-20 h-20 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    </svg>
                                    <p className="text-lg font-medium">{searchTerm || typeFilter !== 'all' ? 'Tidak ada hasil' : 'Belum ada notifikasi'}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredNotifications.map((n) => {
                                        const type = getTypeBadge(n.type);
                                        return (
                                            <div key={n.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                                                                {n.title}
                                                            </h4>
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${type.color}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                {type.text}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                                    <circle cx="12" cy="8" r="4" />
                                                                    <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                                                </svg>
                                                                {n.user?.name || 'Semua User'}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                                </svg>
                                                                {n.created_at?.split('T')[0] || '-'}
                                                            </span>
                                                        </div>

                                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                                            {n.message}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 sm:flex-shrink-0">
                                                        <Link 
                                                            href={route('admin.notifications.edit', n.id)}
                                                            className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(n.id, n.title)}
                                                            className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                                            title="Hapus"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                            </svg>
                                                        </button>
                                                    </div>
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