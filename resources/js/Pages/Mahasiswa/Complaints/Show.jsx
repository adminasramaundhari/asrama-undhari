import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, complaint }) {
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Menunggu', color: 'bg-yellow-500' };
            case 'processing': return { text: 'Diproses', color: 'bg-blue-500' };
            case 'resolved': return { text: 'Selesai', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    const status = getStatusBadge(complaint.status);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Pengaduan</h2>}
        >
            <Head title={`Detail Pengaduan - ${complaint.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('mahasiswa.complaints.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Pengaduan Saya
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5 sm:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                            <circle cx="12" cy="12" r="2" />
                                        </svg>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-xl font-black">{complaint.title}</h1>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${status.color} shadow-lg self-start`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    {status.text}
                                </span>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                    </svg>
                                    {complaint.created_at?.split('T')[0] || '-'}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 dark:bg-primary/20 rounded-lg text-xs font-semibold text-primary">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                    </svg>
                                    {complaint.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 sm:px-8 py-6">
                            
                            {/* Deskripsi */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                    </svg>
                                    Deskripsi Pengaduan
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {complaint.description}
                                    </p>
                                </div>
                            </div>

                            {/* Foto Pendukung */}
                            {complaint.image && (
                                <div className="mb-6">
                                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        Foto Pendukung
                                    </h3>
                                    <div 
                                        className="cursor-pointer group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
                                        onClick={() => setImageModalOpen(true)}
                                    >
                                        <img 
                                            src={`/${complaint.image}`} 
                                            alt="Bukti Pengaduan" 
                                            className="w-full max-h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                    <path d="M15 3h6v6" />
                                                    <path d="M9 21H3v-6" />
                                                    <line x1="21" y1="3" x2="14" y2="10" />
                                                    <line x1="3" y1="21" x2="10" y2="14" />
                                                </svg>
                                                Klik untuk memperbesar
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Respon Admin */}
                            {complaint.admin_response && (
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                        </svg>
                                        Respon Admin
                                    </h3>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800">
                                        <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">{complaint.admin_response}</p>
                                        {complaint.resolved_at && (
                                            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800 flex items-center gap-2 text-xs text-blue-500">
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Selesai pada: {complaint.resolved_at?.split('T')[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Foto Besar */}
            {imageModalOpen && complaint.image && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setImageModalOpen(false)}
                >
                    <button
                        onClick={() => setImageModalOpen(false)}
                        className="absolute top-4 right-4 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all z-10"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <img 
                        src={`/${complaint.image}`} 
                        alt="Bukti Pengaduan" 
                        className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </AuthenticatedLayout>
    );
}