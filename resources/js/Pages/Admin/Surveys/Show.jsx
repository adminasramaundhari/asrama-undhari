import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ auth, survey }) {
    const getQuestionIcon = (type) => {
        switch(type) {
            case 'text': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/></svg>
            );
            case 'radio': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
            );
            case 'checkbox': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            );
            case 'rating': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            );
            default: return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/></svg>
            );
        }
    };

    const getTypeLabel = (type) => {
        switch(type) {
            case 'text': return 'Text (Isian)';
            case 'radio': return 'Pilihan Ganda';
            case 'checkbox': return 'Checkbox';
            case 'rating': return 'Rating (1-5)';
            default: return type;
        }
    };

    const totalQuestions = survey.questions?.length || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Survey: {survey.title}</h2>}
        >
            <Head title={`Detail Survey - ${survey.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('admin.surveys.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Survey
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5 sm:px-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="3" />
                                        <line x1="8" y1="8" x2="16" y2="8" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                </div>
                                <div className="text-white">
                                    <h1 className="text-xl font-black">{survey.title}</h1>
                                    {survey.description && (
                                        <p className="text-white/70 text-sm mt-0.5">{survey.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                    </svg>
                                    {survey.start_date?.split('T')[0]} — {survey.end_date?.split('T')[0]}
                                </span>
                                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                    </svg>
                                    {totalQuestions} pertanyaan
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                    survey.is_active 
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${survey.is_active ? 'bg-green-500' : 'bg-gray-500'}`} />
                                    {survey.is_active ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="px-6 sm:px-8 py-6">
                            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                </svg>
                                Daftar Pertanyaan
                            </h3>

                            {totalQuestions === 0 ? (
                                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                    </svg>
                                    <p className="text-sm font-medium">Belum ada pertanyaan</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {survey.questions?.map((q, idx) => (
                                        <div key={q.id || idx} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-start gap-4">
                                                <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-primary font-black text-sm">{idx + 1}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {q.question}
                                                        </h4>
                                                        {q.is_required && (
                                                            <span className="text-red-500 text-xs font-bold">*Wajib</span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-lg">
                                                            {getQuestionIcon(q.type)}
                                                            {getTypeLabel(q.type)}
                                                        </span>
                                                        
                                                        {q.options && q.options.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {q.options.map((opt, i) => (
                                                                    <span key={i} className="px-2 py-0.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs text-gray-600 dark:text-gray-400">
                                                                        {opt}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link href={route('admin.surveys.edit', survey.id)}>
                            <PrimaryButton
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                }
                            >
                                Edit Survey
                            </PrimaryButton>
                        </Link>
                        <Link href={route('admin.surveys.index')}>
                            <SecondaryButton
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5" />
                                        <polyline points="12 19 5 12 12 5" />
                                    </svg>
                                }
                            >
                                Kembali
                            </SecondaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}