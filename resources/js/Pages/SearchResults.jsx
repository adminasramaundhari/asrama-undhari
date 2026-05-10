import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SearchResults({ auth, results, query }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Hasil Pencarian: "{query}"</h2>}
        >
            <Head title={`Hasil Pencarian: ${query}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        
                        {/* Search Info Bar */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Hasil pencarian untuk
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        "{query}"
                                    </p>
                                </div>
                            </div>
                            {results && results.length > 0 && (
                                <span className="text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-full">
                                    {results.length} hasil ditemukan
                                </span>
                            )}
                        </div>

                        <div className="p-6">
                            {!results || results.length === 0 ? (
                                /* Empty State */
                                <div className="text-center py-16">
                                    <svg className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                        <line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Tidak ada hasil
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                        Tidak ditemukan hasil untuk "<span className="font-semibold text-gray-700 dark:text-gray-300">{query}</span>". 
                                        Coba gunakan kata kunci lain atau periksa ejaan.
                                    </p>
                                    <Link 
                                        href="/dashboard" 
                                        className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                            <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                            <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                            <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                        </svg>
                                        Kembali ke Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    {/* Results List */}
                                    <div className="space-y-4">
                                        {results.map((result, index) => (
                                            <Link 
                                                key={index} 
                                                href={result.url}
                                                className="group block bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 animate-[fadeInUp_0.4s_ease-out]"
                                                style={{ animationDelay: `${index * 80}ms` }}
                                            >
                                                <div className="flex items-start gap-4">
                                                    {/* Icon */}
                                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                            <line x1="16" y1="13" x2="8" y2="13" />
                                                            <line x1="16" y1="17" x2="8" y2="17" />
                                                        </svg>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                                                {result.title}
                                                            </h3>
                                                            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full flex-shrink-0">
                                                                {result.type || 'Halaman'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                                            {result.description}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 dark:text-gray-500">
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                                                                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                                                            </svg>
                                                            {result.url}
                                                        </div>
                                                    </div>

                                                    {/* Arrow */}
                                                    <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M5 12h14" />
                                                            <path d="m12 5 7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Menampilkan {results.length} hasil untuk pencarian "<span className="font-medium text-gray-600 dark:text-gray-400">{query}</span>"
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}