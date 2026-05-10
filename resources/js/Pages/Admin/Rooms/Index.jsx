import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, rooms: initialRooms, asramas }) {
    const [asramaSearch, setAsramaSearch] = useState('');
    const [selectedAsrama, setSelectedAsrama] = useState('');
    const [kamarSearch, setKamarSearch] = useState('');

    // Filter Asrama
    const filteredAsramas = useMemo(() => {
        let result = asramas || [];
        if (asramaSearch.trim()) {
            const term = asramaSearch.toLowerCase().trim();
            result = result.filter(a =>
                (a.name && a.name.toLowerCase().includes(term)) ||
                (a.code && a.code.toLowerCase().includes(term)) ||
                (a.address && a.address.toLowerCase().includes(term))
            );
        }
        return result;
    }, [asramas, asramaSearch]);

    // Filter Kamar
    const filteredRooms = useMemo(() => {
        let result = initialRooms || [];
        if (selectedAsrama) {
            result = result.filter(room => room.asrama_id == selectedAsrama);
        }
        if (kamarSearch.trim()) {
            const term = kamarSearch.toLowerCase().trim();
            result = result.filter(room =>
                (room.room_number && room.room_number.toLowerCase().includes(term)) ||
                (room.room_type && room.room_type.toLowerCase().includes(term)) ||
                (room.asrama?.name && room.asrama.name.toLowerCase().includes(term)) ||
                (room.price_per_month && room.price_per_month.toString().includes(term))
            );
        }
        return result;
    }, [initialRooms, selectedAsrama, kamarSearch]);

    const handleDeleteAsrama = (id, name) => {
        if (confirm(`Hapus permanen asrama "${name}"?`)) {
            router.delete(route('admin.asramas.destroy', id));
        }
    };

    const handleDeleteKamar = (id, roomNumber) => {
        if (confirm(`Hapus permanen kamar ${roomNumber}?`)) {
            router.delete(route('admin.rooms.destroy', id));
        }
    };

    const getStatusBadge = (room) => {
        if (room.current_occupancy >= room.capacity) {
            return { text: 'Penuh', color: 'bg-red-500' };
        } else if (room.current_occupancy > 0) {
            return { text: 'Terisi', color: 'bg-blue-500' };
        }
        return { text: 'Tersedia', color: 'bg-green-500' };
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Asrama & Kamar</h2>}
        >
            <Head title="Manajemen Asrama & Kamar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* ==================== TABEL ASRAMA ==================== */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-purple-500 flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Data Asrama</h3>
                                <span className="text-sm text-gray-400">({filteredAsramas.length} asrama)</span>
                            </div>
                            <Link href={route('admin.asramas.create')}>
                                <PrimaryButton
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    Tambah Asrama
                                </PrimaryButton>
                            </Link>
                        </div>

                        {/* Search Asrama */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="relative max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari nama, kode, atau alamat asrama..."
                                    value={asramaSearch}
                                    onChange={(e) => setAsramaSearch(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                                />
                                {asramaSearch && (
                                    <button
                                        onClick={() => setAsramaSearch('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label="Hapus pencarian"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            {asramaSearch && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Ditemukan <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredAsramas.length}</span> hasil dari "<span className="font-medium">{asramaSearch}</span>"
                                </p>
                            )}
                        </div>

                        {/* Tabel Asrama */}
                        <div className="p-6">
                            {filteredAsramas.length === 0 ? (
                                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                        <rect x="6" y="10" width="12" height="8" rx="1" />
                                    </svg>
                                    <p className="text-sm font-medium">{asramaSearch ? 'Tidak ada hasil pencarian' : 'Belum ada data asrama'}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['Nama Asrama', 'Kode', 'Alamat', 'Jumlah Kamar', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        {th}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {filteredAsramas.map((asrama) => (
                                                <tr key={asrama.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                    <td className="px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                        {asrama.name}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                        <span className="inline-flex px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-mono font-semibold text-gray-700 dark:text-gray-300">
                                                            {asrama.code}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                                                        {asrama.address || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <svg className="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                                            </svg>
                                                            {asrama.rooms_count || 0} kamar
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-1.5">
                                                            <Link 
                                                                href={route('admin.asramas.show', asrama.id)}
                                                                className="p-2 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                                                                title="Detail"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                    <circle cx="12" cy="12" r="3" />
                                                                </svg>
                                                            </Link>
                                                            <Link 
                                                                href={route('admin.asramas.edit', asrama.id)}
                                                                className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                </svg>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDeleteAsrama(asrama.id, asrama.name)}
                                                                className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                                                title="Hapus"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ==================== TABEL KAMAR ==================== */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Data Kamar</h3>
                                <span className="text-sm text-gray-400">({filteredRooms.length} kamar)</span>
                            </div>
                            <Link href={route('admin.rooms.create')}>
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

                        {/* Filter & Search Kamar */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
                            <div className="w-full sm:w-56">
                                <select
                                    value={selectedAsrama}
                                    onChange={(e) => setSelectedAsrama(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                >
                                    <option value="">Semua Asrama</option>
                                    {asramas?.map((asrama) => (
                                        <option key={asrama.id} value={asrama.id}>{asrama.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari nomor kamar, tipe, asrama, atau harga..."
                                    value={kamarSearch}
                                    onChange={(e) => setKamarSearch(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                />
                                {kamarSearch && (
                                    <button
                                        onClick={() => setKamarSearch('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label="Hapus pencarian"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {kamarSearch && (
                            <div className="px-6 py-2 bg-gray-50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Ditemukan <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredRooms.length}</span> hasil dari "<span className="font-medium">{kamarSearch}</span>"
                                </p>
                            </div>
                        )}

                        {/* Tabel Kamar */}
                        <div className="p-6">
                            {filteredRooms.length === 0 ? (
                                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                    </svg>
                                    <p className="text-sm font-medium">
                                        {kamarSearch ? 'Tidak ada hasil pencarian' : selectedAsrama ? 'Tidak ada kamar di asrama ini' : 'Belum ada data kamar'}
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['Asrama', 'No. Kamar', 'Tipe', 'Kapasitas', 'Penghuni', 'Harga/Bulan', 'Status', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        {th}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {filteredRooms.map((room) => {
                                                const status = getStatusBadge(room);
                                                const occupancyPercent = room.capacity > 0 ? (room.current_occupancy / room.capacity) * 100 : 0;
                                                
                                                return (
                                                    <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            {room.asrama?.name || '-'}
                                                        </td>
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
                                                                <button
                                                                    onClick={() => handleDeleteKamar(room.id, room.room_number)}
                                                                    className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                                                    title="Hapus"
                                                                >
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="3 6 5 6 21 6" />
                                                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                                    </svg>
                                                                </button>
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}