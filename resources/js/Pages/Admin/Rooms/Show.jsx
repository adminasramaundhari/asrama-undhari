import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ auth, room }) {
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const getStatusBadge = () => {
        if (room.current_occupancy >= room.capacity) {
            return { text: 'Penuh', color: 'bg-red-500', icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                </svg>
            )};
        } else if (room.current_occupancy > 0) {
            return { text: 'Terisi', color: 'bg-blue-500', icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="9" cy="7" r="3" />
                    <path d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                </svg>
            )};
        }
        return { text: 'Tersedia', color: 'bg-green-500', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        )};
    };

    const status = getStatusBadge();
    const occupancyPercent = room.capacity > 0 ? (room.current_occupancy / room.capacity) * 100 : 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Kamar</h2>}
        >
            <Head title={`Detail Kamar ${room.room_number}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('admin.rooms.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Kamar
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-6 sm:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                            <path d="M3 21h18" />
                                            <rect x="6" y="10" width="12" height="8" rx="1" />
                                        </svg>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-xl sm:text-2xl font-black">Kamar {room.room_number}</h1>
                                        <p className="text-white/70 text-sm mt-0.5">{room.asrama?.name || 'Tidak ada asrama'}</p>
                                        <span className="inline-block mt-1 text-xs text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                                            {room.room_type}
                                        </span>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${status.color} shadow-lg`}>
                                    {status.icon}
                                    {status.text}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            
                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="16" x2="12" y2="12" />
                                                <line x1="12" y1="8" x2="12.01" y2="8" />
                                            </svg>
                                            Informasi Kamar
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Nomor Kamar</span>
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{room.room_number}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Tipe</span>
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{room.room_type}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Asrama</span>
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{room.asrama?.name || '-'}</span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Harga per Bulan</span>
                                                <p className="text-2xl font-black text-primary mt-1">{formatRupiah(room.price_per_month)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <circle cx="9" cy="7" r="3" />
                                                <circle cx="18" cy="5" r="2.5" />
                                                <path d="M15 11a3.5 3.5 0 013 5" />
                                            </svg>
                                            Okupansi
                                        </h3>
                                        {/* Progress Circle */}
                                        <div className="flex items-center gap-5">
                                            <div className="relative w-20 h-20">
                                                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                                    <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-200 dark:text-gray-700" />
                                                    <circle 
                                                        cx="40" cy="40" r="35" 
                                                        fill="none" 
                                                        strokeWidth="6" 
                                                        strokeLinecap="round"
                                                        stroke="currentColor"
                                                        className={`${
                                                            occupancyPercent >= 100 ? 'text-red-500' :
                                                            occupancyPercent >= 70 ? 'text-yellow-500' : 'text-green-500'
                                                        }`}
                                                        strokeDasharray={`${occupancyPercent * 2.2} 220`}
                                                    />
                                                </svg>
                                                <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-gray-900 dark:text-white">
                                                    {Math.round(occupancyPercent)}%
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{room.current_occupancy}</span> / {room.capacity} orang
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {room.capacity - room.current_occupancy} slot tersisa
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alamat Asrama */}
                                    {room.asrama?.address && (
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                Alamat
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{room.asrama.address}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Fasilitas */}
                            {room.facilities && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Fasilitas
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {room.facilities.split(',').map((facility, index) => (
                                            <span key={index} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                                                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {facility.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Deskripsi */}
                            {room.description && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                        </svg>
                                        Deskripsi
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                                        {room.description}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.rooms.edit', room.id)}>
                                    <PrimaryButton
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        }
                                    >
                                        Edit Kamar
                                    </PrimaryButton>
                                </Link>
                                <Link href={route('admin.rooms.index')}>
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
                                {room.current_occupancy > 0 && (
                                    <Link href={route('admin.penghuni.index')}>
                                        <SecondaryButton
                                            iconLeft={
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="9" cy="7" r="3" />
                                                    <circle cx="18" cy="5" r="2.5" />
                                                    <path d="M15 11a3.5 3.5 0 013 5" />
                                                </svg>
                                            }
                                        >
                                            Lihat Penghuni
                                        </SecondaryButton>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}