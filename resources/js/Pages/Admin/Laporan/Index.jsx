import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, stats }) {
    const reportSections = [
        {
            title: 'Data Penghuni',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="7" r="3" />
                    <circle cx="18" cy="5" r="2.5" />
                    <circle cx="12" cy="17" r="3" />
                    <path d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                </svg>
            ),
            bgColor: 'bg-blue-500',
            textColor: 'text-blue-600',
            exports: 'penghuni'
        },
        {
            title: 'Data Pembayaran',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
            bgColor: 'bg-green-500',
            textColor: 'text-green-600',
            exports: 'pembayaran'
        },
        {
            title: 'Data Kamar',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                    <path d="M3 21h18" />
                    <rect x="6" y="10" width="12" height="8" rx="1" />
                </svg>
            ),
            bgColor: 'bg-purple-500',
            textColor: 'text-purple-600',
            exports: 'kamar'
        },
        {
            title: 'Data Asrama',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                    <path d="M3 21h18" />
                </svg>
            ),
            bgColor: 'bg-indigo-500',
            textColor: 'text-indigo-600',
            exports: 'asrama'
        },
        {
            title: 'Data Pengaduan',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                    <circle cx="12" cy="12" r="2" />
                </svg>
            ),
            bgColor: 'bg-yellow-500',
            textColor: 'text-yellow-600',
            exports: 'pengaduan'
        },
        {
            title: 'Data Pengumuman',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
            ),
            bgColor: 'bg-orange-500',
            textColor: 'text-orange-600',
            exports: 'pengumuman'
        },
        {
            title: 'Data Notifikasi',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
            ),
            bgColor: 'bg-pink-500',
            textColor: 'text-pink-600',
            exports: 'notifikasi'
        },
        {
            title: 'Data Survey',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <line x1="8" y1="8" x2="16" y2="8" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            ),
            bgColor: 'bg-teal-500',
            textColor: 'text-teal-600',
            exports: 'survey'
        },
    ];

    const StatCard = ({ label, value, color, icon }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className={`text-xl font-black text-gray-900 dark:text-white`}>{value}</p>
                </div>
            </div>
        </div>
    );

    const statIcons = {
        penghuni: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="7" r="3" />
            </svg>
        ),
        kamar: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
            </svg>
        ),
        asrama: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
            </svg>
        ),
        pembayaran: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
            </svg>
        ),
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Laporan</h2>}
        >
            <Head title="Laporan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
                        <StatCard label="Penghuni" value={stats?.total_penghuni || 0} color="bg-blue-500" icon={statIcons.penghuni} />
                        <StatCard label="Kamar" value={stats?.total_kamar || 0} color="bg-purple-500" icon={statIcons.kamar} />
                        <StatCard label="Asrama" value={stats?.total_asrama || 0} color="bg-indigo-500" icon={statIcons.asrama} />
                        <StatCard label="Pembayaran" value={stats?.total_pembayaran || 0} color="bg-green-500" icon={statIcons.pembayaran} />
                        <StatCard label="Pengaduan" value={stats?.total_pengaduan || 0} color="bg-yellow-500" icon={statIcons.penghuni} />
                        <StatCard label="Pengumuman" value={stats?.total_pengumuman || 0} color="bg-orange-500" icon={statIcons.kamar} />
                        <StatCard label="Notifikasi" value={stats?.total_notifikasi || 0} color="bg-pink-500" icon={statIcons.asrama} />
                        <StatCard label="Survey" value={stats?.total_survey || 0} color="bg-teal-500" icon={statIcons.penghuni} />
                    </div>

                    {/* Export Cards */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Export Laporan</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Download laporan dalam format Excel atau PDF</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {reportSections.map((section) => (
                                    <div key={section.title} className="group bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-11 h-11 rounded-xl ${section.bgColor} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                {section.icon}
                                            </div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{section.title}</h4>
                                        </div>
                                        <div className="flex gap-2">
                                            <a 
                                                href={route(`admin.laporan.${section.exports}.excel`)} 
                                                className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 text-white px-3 py-2.5 rounded-xl hover:bg-green-600 transition-all duration-300 text-xs font-semibold shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30"
                                            >
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                Excel
                                            </a>
                                            <a 
                                                href={route(`admin.laporan.${section.exports}.pdf`)} 
                                                className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 text-white px-3 py-2.5 rounded-xl hover:bg-red-600 transition-all duration-300 text-xs font-semibold shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30"
                                            >
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                </svg>
                                                PDF
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}