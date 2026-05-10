import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, surveys, answeredSurveys, flash }) {
    const getStatusBadge = (survey) => {
        const now = new Date();
        const start = new Date(survey.start_date);
        const end = new Date(survey.end_date);
        
        if (answeredSurveys?.includes(survey.id)) return { text: 'Sudah Diisi', color: 'bg-green-500' };
        if (now < start) return { text: 'Belum Dimulai', color: 'bg-yellow-500' };
        if (now > end) return { text: 'Sudah Berakhir', color: 'bg-red-500' };
        return { text: 'Dapat Diisi', color: 'bg-blue-500' };
    };

    // Statistik
    const total = surveys?.length || 0;
    const totalAnswered = surveys?.filter(s => answeredSurveys?.includes(s.id)).length || 0;
    const totalAvailable = surveys?.filter(s => {
        const now = new Date();
        return !answeredSurveys?.includes(s.id) && now >= new Date(s.start_date) && now <= new Date(s.end_date);
    }).length || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Survey</h2>}
        >
            <Head title="Survey" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                            </svg>
                            {flash.error}
                        </div>
                    )}

                    {/* Statistik Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Total Survey', value: total, color: 'bg-primary', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="8" y1="8" x2="16" y2="8"/></svg>
                            )},
                            { label: 'Sudah Diisi', value: totalAnswered, color: 'bg-green-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                            )},
                            { label: 'Tersedia', value: totalAvailable, color: 'bg-blue-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Survey</h3>
                            <span className="text-sm text-gray-400">({total} survey)</span>
                        </div>

                        <div className="p-6">
                            {!surveys || surveys.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="3" y="3" width="18" height="18" rx="3" />
                                    </svg>
                                    <p className="text-sm font-medium">Belum ada survey yang tersedia</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {surveys.map((survey) => {
                                        const status = getStatusBadge(survey);
                                        const isAnswered = answeredSurveys?.includes(survey.id);
                                        const isActive = status.text === 'Dapat Diisi';
                                        
                                        return (
                                            <div key={survey.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                                                                {survey.title}
                                                            </h4>
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${status.color}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                {status.text}
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                                </svg>
                                                                {survey.start_date?.split('T')[0]} — {survey.end_date?.split('T')[0]}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                                    <line x1="8" y1="6" x2="21" y2="6" />
                                                                </svg>
                                                                {survey.questions?.length || 0} pertanyaan
                                                            </span>
                                                        </div>

                                                        {survey.description && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                                {survey.description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="sm:flex-shrink-0">
                                                        {isActive && !isAnswered && (
                                                            <Link href={route('mahasiswa.surveys.show', survey.id)}>
                                                                <PrimaryButton size="sm"
                                                                    iconLeft={
                                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                        </svg>
                                                                    }
                                                                >
                                                                    Isi Survey
                                                                </PrimaryButton>
                                                            </Link>
                                                        )}
                                                        {isAnswered && (
                                                            <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm font-semibold">
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                Terima kasih
                                                            </span>
                                                        )}
                                                        {!isActive && !isAnswered && (
                                                            <span className="text-xs text-gray-400">Tidak tersedia</span>
                                                        )}
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