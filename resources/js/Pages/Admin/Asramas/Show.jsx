import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ auth, asrama }) {
    const rooms = asrama.rooms || [];

    const getStatusBadge = (room) => {
        if (room.current_occupancy >= room.capacity) {
            return { text: 'Penuh', color: 'bg-red-500' };
        } else if (room.current_occupancy > 0) {
            return { text: 'Terisi', color: 'bg-blue-500' };
        }
        return { text: 'Tersedia', color: 'bg-green-500' };
    };

    const totalKamar = rooms.length;
    const totalKapasitas = rooms.reduce((sum, r) => sum + (r.capacity || 0), 0);
    const totalPenghuni = rooms.reduce((sum, r) => sum + (r.current_occupancy || 0), 0);
    const okupansi = totalKapasitas > 0 ? Math.round((totalPenghuni / totalKapasitas) * 100) : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Asrama</h2>}
        >
            <Head title={`Detail - ${asrama.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('admin.rooms.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Manajemen Asrama & Kamar
                    </Link>

                    {/* Card Informasi Asrama */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 px-6 py-6 sm:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg ring-2 ring-white/30 flex-shrink-0">
                                        {asrama.name?.charAt(0)?.toUpperCase() || 'A'}
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-xl sm:text-2xl font-black">{asrama.name}</h1>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-white/70 text-sm">
                                            <span className="inline-flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                                </svg>
                                                Kode: {asrama.code}
                                            </span>
                                            {asrama.address && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                        <circle cx="12" cy="10" r="3" />
                                                    </svg>
                                                    {asrama.address}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistik Cards */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { label: 'Total Kamar', value: totalKamar, color: 'bg-purple-500', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                            <path d="M3 21h18" />
                                        </svg>
                                    )},
                                    { label: 'Kapasitas Total', value: totalKapasitas, color: 'bg-blue-500', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="9" cy="7" r="3" />
                                            <circle cx="18" cy="5" r="2.5" />
                                            <circle cx="12" cy="17" r="3" />
                                        </svg>
                                    )},
                                    { label: 'Penghuni Saat Ini', value: totalPenghuni, color: 'bg-green-500', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="9" cy="7" r="3" />
                                            <path d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                                        </svg>
                                    )},
                                    { label: 'Okupansi', value: `${okupansi}%`, color: okupansi >= 80 ? 'bg-red-500' : okupansi >= 50 ? 'bg-yellow-500' : 'bg-green-500', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )},
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
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

                            {/* Progress Bar Okupansi */}
                            <div className="mt-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500 dark:text-gray-400">Tingkat Okupansi</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{totalPenghuni} / {totalKapasitas} ({okupansi}%)</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-700 ${
                                            okupansi >= 80 ? 'bg-red-500' : okupansi >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${okupansi}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Kamar */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-purple-500 flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Daftar Kamar di {asrama.name}
                            </h3>
                            <span className="text-sm text-gray-400">({totalKamar} kamar)</span>
                        </div>

                        <div className="p-6">
                            {rooms.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                    </svg>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Belum ada kamar di asrama ini</p>
                                    <Link href={route('admin.rooms.create', { asrama_id: asrama.id })}>
                                        <PrimaryButton
                                            iconLeft={
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                    <path d="M12 5v14M5 12h14" />
                                                </svg>
                                            }
                                        >
                                            Tambah Kamar
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['No. Kamar', 'Tipe', 'Kapasitas', 'Penghuni', 'Harga/Bulan', 'Status', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        {th}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {rooms.map((room) => {
                                                const status = getStatusBadge(room);
                                                const occupancyPercent = room.capacity > 0 ? (room.current_occupancy / room.capacity) * 100 : 0;
                                                
                                                return (
                                                    <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                        <td className="px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {room.room_number}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            {room.room_type}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            {room.capacity} org
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                                    <div 
                                                                        className={`h-full rounded-full transition-all duration-500 ${
                                                                            occupancyPercent >= 100 ? 'bg-red-500' :
                                                                            occupancyPercent >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                                                                        }`}
                                                                        style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {room.current_occupancy}/{room.capacity}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                            Rp {Number(room.price_per_month).toLocaleString()}
                                                        </td>
                                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${status.color}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                {status.text}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-1.5">
                                                                <Link 
                                                                    href={route('admin.rooms.show', room.id)}
                                                                    className="p-2 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                                                                    title="Detail"
                                                                >
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                        <circle cx="12" cy="12" r="3" />
                                                                    </svg>
                                                                </Link>
                                                                <Link 
                                                                    href={route('admin.rooms.edit', room.id)}
                                                                    className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                                                                    title="Edit"
                                                                >
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
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

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={route('admin.asramas.edit', asrama.id)}>
                            <PrimaryButton
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                }
                            >
                                Edit Asrama
                            </PrimaryButton>
                        </Link>
                        <Link href={route('admin.rooms.create', { asrama_id: asrama.id })}>
                            <SecondaryButton
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                }
                            >
                                Tambah Kamar di Asrama Ini
                            </SecondaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}