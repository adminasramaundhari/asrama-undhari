import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, payments }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Pending', color: 'bg-yellow-500' };
            case 'success': case 'paid': case 'lunas': return { text: 'Lunas', color: 'bg-green-500' };
            case 'failed': case 'unpaid': return { text: 'Gagal', color: 'bg-red-500' };
            case 'processing': return { text: 'Proses', color: 'bg-blue-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    // Filter
    const filteredPayments = useMemo(() => {
        if (!payments) return [];
        let result = payments;
        
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(p =>
                (p.invoice_number && p.invoice_number.toLowerCase().includes(term)) ||
                (p.user?.name && p.user.name.toLowerCase().includes(term)) ||
                (p.payment_type && p.payment_type.toLowerCase().includes(term)) ||
                (p.amount && p.amount.toString().includes(term))
            );
        }
        
        if (statusFilter !== 'all') {
            result = result.filter(p => p.status === statusFilter);
        }
        
        return result;
    }, [payments, searchTerm, statusFilter]);

    // Statistik
    const total = payments?.length || 0;
    const totalLunas = payments?.filter(p => p.status === 'success' || p.status === 'paid' || p.status === 'lunas').length || 0;
    const totalPending = payments?.filter(p => p.status === 'pending').length || 0;
    const totalAmount = payments?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0;

    const statusOptions = [
        { value: 'all', label: 'Semua', count: total },
        { value: 'pending', label: 'Pending', count: totalPending, color: 'bg-yellow-500' },
        { value: 'success', label: 'Lunas', count: totalLunas, color: 'bg-green-500' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Pembayaran</h2>}
        >
            <Head title="Manajemen Pembayaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Total Tagihan', value: total, color: 'bg-primary', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="3" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )},
                            { label: 'Total Lunas', value: totalLunas, color: 'bg-green-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )},
                            { label: 'Total Pending', value: totalPending, color: 'bg-yellow-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            )},
                            { label: 'Total Dana', value: formatRupiah(totalAmount), color: 'bg-blue-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                            )},
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                                        <p className="text-xl font-black text-gray-900 dark:text-white truncate">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Pembayaran</h3>
                                <span className="text-sm text-gray-400">({filteredPayments.length} data)</span>
                            </div>
                            <Link href={route('admin.payments.create')}>
                                <PrimaryButton
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    Buat Tagihan
                                </PrimaryButton>
                            </Link>
                        </div>

                        {/* Search & Filter */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.3-4.3" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari invoice, mahasiswa, atau tipe..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Hapus pencarian">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {statusOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStatusFilter(opt.value)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                                            statusFilter === opt.value
                                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {opt.color && <span className={`w-2 h-2 rounded-full ${opt.color}`} />}
                                        {opt.label}
                                        <span className="opacity-60">({opt.count})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="p-6">
                            {filteredPayments.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-20 h-20 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="2" y="4" width="20" height="16" rx="3" />
                                    </svg>
                                    <p className="text-lg font-medium">{searchTerm || statusFilter !== 'all' ? 'Tidak ada hasil' : 'Belum ada data pembayaran'}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['Invoice', 'Mahasiswa', 'Jumlah', 'Tipe', 'Jatuh Tempo', 'Status', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{th}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {filteredPayments.map((p) => {
                                                const status = getStatusBadge(p.status);
                                                return (
                                                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                        <td className="px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {p.invoice_number || '-'}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            {p.user?.name || '-'}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {formatRupiah(p.amount)}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium">
                                                                {p.payment_type || '-'}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            {p.due_date?.split('T')[0] || '-'}
                                                        </td>
                                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${status.color}`}>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                {status.text}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                                                            <Link 
                                                                href={route('admin.payments.show', p.id)}
                                                                className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 inline-flex items-center gap-1.5"
                                                                title="Detail"
                                                            >
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                    <circle cx="12" cy="12" r="3" />
                                                                </svg>
                                                                Detail
                                                            </Link>
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