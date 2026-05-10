import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, penghuni, currentRoom, payments, complaints }) {
    const [activeTab, setActiveTab] = useState('info');

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-500';
            case 'processing': return 'bg-blue-500';
            case 'resolved': return 'bg-green-500';
            case 'rejected': return 'bg-red-500';
            case 'success': case 'paid': case 'lunas': return 'bg-green-500';
            case 'failed': case 'unpaid': case 'belum_lunas': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const tabs = [
        { 
            key: 'info', 
            label: 'Info Kamar',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                    <path d="M3 21h18" />
                    <rect x="6" y="10" width="12" height="8" rx="1" />
                </svg>
            )
        },
        { 
            key: 'payments', 
            label: 'Riwayat Pembayaran',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )
        },
        { 
            key: 'complaints', 
            label: 'Riwayat Pengaduan',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                    <circle cx="12" cy="12" r="2" />
                </svg>
            )
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Penghuni</h2>}
        >
            <Head title={`Detail - ${penghuni.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Tombol Kembali */}
                    <Link
                        href={route('admin.penghuni.index')}
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Penghuni
                    </Link>

                    {/* Card Profil */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5 sm:px-8 sm:py-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg ring-2 ring-white/30 flex-shrink-0">
                                    {penghuni.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div className="text-white">
                                    <h1 className="text-xl sm:text-2xl font-black">{penghuni.name}</h1>
                                    <p className="text-white/70 text-sm mt-0.5">{penghuni.email}</p>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-white/80">
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                                <line x1="8" y1="21" x2="16" y2="21" />
                                                <line x1="12" y1="17" x2="12" y2="21" />
                                            </svg>
                                            NIM: {penghuni.nim || '-'}
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            penghuni.is_verified 
                                                ? 'bg-green-400/20 text-green-100' 
                                                : 'bg-yellow-400/20 text-yellow-100'
                                        }`}>
                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                {penghuni.is_verified ? (
                                                    <polyline points="20 6 9 17 4 12" />
                                                ) : (
                                                    <circle cx="12" cy="12" r="10" />
                                                )}
                                            </svg>
                                            {penghuni.is_verified ? 'Terverifikasi' : 'Menunggu Verifikasi'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                {[
                                    { label: 'Jenis Kelamin', value: penghuni.kelamin || '-', icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
                                    )},
                                    { label: 'Fakultas', value: penghuni.faculty || '-', icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/></svg>
                                    )},
                                    { label: 'Program Studi', value: penghuni.prodi || '-', icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
                                    )},
                                    { label: 'Telepon', value: penghuni.phone || '-', icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2"/></svg>
                                    )},
                                    { label: 'Status', value: penghuni.is_verified ? 'Terverifikasi' : 'Pending', icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 12l2 2 4-4"/></svg>
                                    )},
                                    { label: 'Tgl Daftar', value: penghuni.created_at?.split('T')[0] || '-', icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
                                    )},
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-1">
                                            {item.icon}
                                            <span className="uppercase tracking-wider">{item.label}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-1 mb-6 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm border border-gray-100 dark:border-gray-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                    activeTab === tab.key
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content: Info Kamar */}
                    {activeTab === 'info' && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informasi Kamar</h3>
                            </div>
                            <div className="p-6">
                                {currentRoom ? (
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            {[
                                                { label: 'Nomor Kamar', value: currentRoom.room?.room_number, highlight: true },
                                                { label: 'Tipe Kamar', value: currentRoom.room?.room_type },
                                                { label: 'Tanggal Check-in', value: currentRoom.check_in_date?.split('T')[0] },
                                                { label: 'Harga per Bulan', value: formatRupiah(currentRoom.room?.price_per_month), color: 'text-green-600 dark:text-green-400' },
                                                { label: 'Kapasitas', value: `${currentRoom.room?.capacity} orang` },
                                                { label: 'Fasilitas', value: currentRoom.room?.facilities || '-' },
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                                                    <p className={`font-semibold text-gray-900 dark:text-white ${item.highlight ? 'text-2xl font-black text-blue-700 dark:text-blue-400' : ''} ${item.color || ''}`}>
                                                        {item.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                            <path d="M3 21h18" />
                                        </svg>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Belum memiliki kamar</p>
                                        <Link href={route('admin.penghuni.edit', penghuni.id)}>
                                            <PrimaryButton
                                                iconLeft={
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                        <path d="M12 5v14M5 12h14" />
                                                    </svg>
                                                }
                                            >
                                                Assign Kamar
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab Content: Riwayat Pembayaran */}
                    {activeTab === 'payments' && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Pembayaran</h3>
                                <span className="text-sm text-gray-400">({payments?.length || 0} transaksi)</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            {['Invoice', 'Jumlah', 'Status', 'Tanggal Bayar', 'Jatuh Tempo', 'Bukti'].map((th) => (
                                                <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    {th}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {payments && payments.length > 0 ? (
                                            payments.map((payment) => (
                                                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                        {payment.invoice_number || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap font-medium">
                                                        {formatRupiah(payment.amount)}
                                                    </td>
                                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadge(payment.status)}`}>
                                                            {payment.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        {payment.payment_date?.split('T')[0] || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        {payment.due_date?.split('T')[0] || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                                        {payment.payment_proof ? (
                                                            <a href={'/' + payment.payment_proof} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                    <circle cx="12" cy="12" r="3" />
                                                                </svg>
                                                                Lihat
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400 dark:text-gray-500 text-sm">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
                                                    <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                        <rect x="2" y="4" width="20" height="16" rx="3" />
                                                    </svg>
                                                    <p className="font-medium">Belum ada riwayat pembayaran</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tab Content: Riwayat Pengaduan */}
                    {activeTab === 'complaints' && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Pengaduan</h3>
                                <span className="text-sm text-gray-400">({complaints?.length || 0} pengaduan)</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            {['Tanggal', 'Judul', 'Kategori', 'Status', 'Aksi'].map((th) => (
                                                <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    {th}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {complaints && complaints.length > 0 ? (
                                            complaints.map((complaint) => (
                                                <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        {complaint.created_at?.split('T')[0] || '-'}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white">
                                                        {complaint.title}
                                                    </td>
                                                    <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                        {complaint.category}
                                                    </td>
                                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadge(complaint.status)}`}>
                                                            {complaint.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                                        <Link
                                                            href={route('admin.complaints.show', complaint.id)}
                                                            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                                                        >
                                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                            Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
                                                    <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                        <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1" />
                                                    </svg>
                                                    <p className="font-medium">Belum ada riwayat pengaduan</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tombol Aksi */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link href={route('admin.penghuni.edit', penghuni.id)}>
                            <PrimaryButton
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                }
                            >
                                Edit Data
                            </PrimaryButton>
                        </Link>
                        <Link href={route('admin.penghuni.edit', penghuni.id) + '#kamar'}>
                            <PrimaryButton
                                variant="light"
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                        <rect x="6" y="10" width="12" height="8" rx="1" />
                                    </svg>
                                }
                            >
                                Assign / Pindah Kamar
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}