import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ auth, payments }) {
    const [statusFilter, setStatusFilter] = useState('all');

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Pending', color: 'bg-yellow-500' };
            case 'success': case 'paid': case 'lunas': return { text: 'Lunas', color: 'bg-green-500' };
            case 'failed': return { text: 'Gagal', color: 'bg-red-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    const getProofStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Menunggu Review', color: 'bg-yellow-500' };
            case 'verified': return { text: 'Terverifikasi', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: 'Belum Upload', color: 'bg-gray-400' };
        }
    };

    // Filter
    const filteredPayments = useMemo(() => {
        if (!payments) return [];
        if (statusFilter === 'all') return payments;
        return payments.filter(p => p.status === statusFilter);
    }, [payments, statusFilter]);

    // Statistik
    const total = payments?.length || 0;
    const totalLunas = payments?.filter(p => p.status === 'success' || p.status === 'paid' || p.status === 'lunas').length || 0;
    const totalPending = payments?.filter(p => p.status === 'pending').length || 0;
    const totalBelumBayar = payments?.filter(p => !p.payment_proof).length || 0;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tagihan Saya</h2>}
        >
            <Head title="Tagihan Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Total Tagihan', value: total, color: 'bg-primary', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/></svg>
                            )},
                            { label: 'Lunas', value: totalLunas, color: 'bg-green-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                            )},
                            { label: 'Pending', value: totalPending, color: 'bg-yellow-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            )},
                            { label: 'Belum Bayar', value: totalBelumBayar, color: 'bg-red-500', icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
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
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Tagihan</h3>
                            <span className="text-sm text-gray-400">({filteredPayments.length} tagihan)</span>
                        </div>

                        {/* Filter */}
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 flex-wrap">
                                {[
                                    { value: 'all', label: 'Semua' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'success', label: 'Lunas' },
                                    { value: 'failed', label: 'Gagal' },
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStatusFilter(opt.value)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                            statusFilter === opt.value
                                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="p-6">
                            {filteredPayments.length === 0 ? (
                                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="2" y="4" width="20" height="16" rx="3" />
                                    </svg>
                                    <p className="text-sm font-medium">Belum ada tagihan</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                                            <tr>
                                                {['Invoice', 'Jumlah', 'Jatuh Tempo', 'Status Bayar', 'Bukti', 'Aksi'].map((th) => (
                                                    <th key={th} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{th}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                            {filteredPayments.map((p) => {
                                                const status = getStatusBadge(p.status);
                                                const proofStatus = getProofStatusBadge(p.proof_status || (p.payment_proof ? 'pending' : null));
                                                
                                                return (
                                                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                        <td className="px-4 py-3.5 text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {p.invoice_number || '-'}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {formatRupiah(p.amount)}
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
                                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                                            {p.payment_proof ? (
                                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${proofStatus.color}`}>
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                    {proofStatus.text}
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">Belum upload</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                                            <Link 
                                                                href={route('mahasiswa.payments.show', p.id)}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all duration-300 shadow-sm shadow-primary/20"
                                                            >
                                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                                    <polyline points="7 10 12 15 17 10" />
                                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                                </svg>
                                                                {p.payment_proof ? 'Upload Ulang' : 'Upload Bukti'}
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