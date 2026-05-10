import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, announcement }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Pengumuman</h2>}
        >
            <Head title={announcement?.title || 'Detail Pengumuman'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5">
                            <h1 className="text-xl font-bold text-white">{announcement?.title}</h1>
                            <p className="text-white/70 text-sm mt-1">
                                {announcement?.published_at ? new Date(announcement.published_at).toLocaleDateString('id-ID') : '-'}
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{announcement?.content}</p>
                            </div>
                            {announcement.image && (
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Lampiran:</h4>
                                <a href={'/' + announcement.image} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        src={'/' + announcement.image} 
                                        alt="Lampiran" 
                                        className="max-w-full max-h-64 object-cover border border-gray-200 dark:border-gray-700 rounded-lg hover:opacity-80 transition"
                                    />
                                </a>
                            </div>
                            )}
                            <div className="mt-6 flex justify-end">
                                <Link
                                    href={route('mahasiswa.announcements.index')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5" />
                                        <polyline points="12 19 5 12 12 5" />
                                    </svg>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}