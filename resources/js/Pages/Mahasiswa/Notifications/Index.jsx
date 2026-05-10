import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ auth, notifications }) {
    const markAsRead = (id) => {
        router.post(route('mahasiswa.notifications.mark-read', id));
    };

    const markAllAsRead = () => {
        router.post(route('mahasiswa.notifications.mark-all-read'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Notifikasi</h2>}
        >
            <Head title="Notifikasi" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notifikasi Saya</h3>
                                <span className="text-sm text-gray-400">({notifications?.length || 0})</span>
                            </div>
                            <button 
                                onClick={markAllAsRead} 
                                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1.5"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Tandai semua dibaca
                            </button>
                        </div>

                        <div className="p-6">
                            {notifications?.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    </svg>
                                    <p className="text-sm font-medium">Tidak ada notifikasi</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {notifications?.map((n) => {
                                        const unreadClass = !n.is_read 
                                            ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30' 
                                            : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-700';
                                        
                                        return (
                                            <div 
                                                key={n.id} 
                                                className={`rounded-2xl p-5 border transition-all duration-300 hover:shadow-md ${unreadClass}`}
                                            >
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {!n.is_read && (
                                                                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                                            )}
                                                            <h4 className={`font-semibold ${!n.is_read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                                                {n.title}
                                                            </h4>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                            </svg>
                                                            {n.created_at?.split('T')[0] || '-'}
                                                        </p>
                                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{n.message}</p>
                                                    </div>
                                                    {!n.is_read && (
                                                        <button 
                                                            onClick={() => markAsRead(n.id)} 
                                                            className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1 flex-shrink-0 transition-colors duration-200"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                            Tandai dibaca
                                                        </button>
                                                    )}
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