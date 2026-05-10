import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Show({ auth, payment }) {
    const [showRejectForm, setShowRejectForm] = useState(false);

    const { data, setData, post, processing } = useForm({
        action: '',
        rejection_note: '',
    });

    const { data: statusData, setData: setStatusData, put: putStatus, processing: statusProcessing } = useForm({
        status: payment.status,
    });

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const verifyProof = (action) => {
        setData('action', action);
        post(route('admin.payments.verify-proof', payment.id));
    };

    const updateStatus = (e) => {
        e.preventDefault();
        putStatus(route('admin.payments.update', payment.id));
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Pending', color: 'bg-yellow-500' };
            case 'success': case 'paid': case 'lunas': return { text: 'Lunas', color: 'bg-green-500' };
            case 'failed': case 'unpaid': return { text: 'Gagal', color: 'bg-red-500' };
            case 'processing': return { text: 'Proses', color: 'bg-blue-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    const getProofStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Menunggu Review', color: 'bg-yellow-500' };
            case 'verified': return { text: 'Terverifikasi', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    const paymentStatus = getStatusBadge(payment.status);
    const proofStatus = getProofStatusBadge(payment.proof_status);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Pembayaran</h2>}
        >
            <Head title={`Detail Pembayaran - ${payment.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('admin.payments.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Pembayaran
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5 sm:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="4" width="20" height="16" rx="3" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-xl font-black">{payment.invoice_number}</h1>
                                        <p className="text-white/70 text-sm">{payment.user?.name}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${paymentStatus.color} shadow-lg self-start`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    {paymentStatus.text}
                                </span>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="p-6 sm:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                                {[
                                    { label: 'Jumlah', value: formatRupiah(payment.amount), icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                                    ), color: 'bg-primary' },
                                    { label: 'Tipe', value: payment.payment_type || '-', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/></svg>
                                    ), color: 'bg-blue-500' },
                                    { label: 'Jatuh Tempo', value: payment.due_date?.split('T')[0] || '-', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
                                    ), color: 'bg-yellow-500' },
                                    { label: 'Tanggal Bayar', value: payment.payment_date?.split('T')[0] || 'Belum bayar', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    ), color: 'bg-green-500' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{item.label}</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bukti Pembayaran */}
                    {payment.payment_proof && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-blue-500 flex-shrink-0" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bukti Pembayaran</h3>
                            </div>

                            <div className="p-6">
                                <img 
                                    src={`/${payment.payment_proof}`} 
                                    alt="Bukti Pembayaran" 
                                    className="w-full max-h-96 object-contain rounded-xl border border-gray-200 dark:border-gray-700 mb-6 bg-gray-50 dark:bg-gray-900"
                                />

                                {/* Status Verifikasi */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                                    <div className="flex flex-wrap items-center gap-4 mb-3">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Status Verifikasi:</span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${proofStatus.color}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                            {proofStatus.text}
                                        </span>
                                    </div>
                                    {payment.verified_at && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Diverifikasi pada <span className="font-semibold">{payment.verified_at?.split('T')[0]}</span> oleh <span className="font-semibold">{payment.verifier?.name}</span>
                                        </p>
                                    )}
                                    {payment.rejection_note && (
                                        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                            <p className="text-xs text-red-500 uppercase font-semibold mb-1">Catatan Penolakan:</p>
                                            <p className="text-sm text-red-700 dark:text-red-400">{payment.rejection_note}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Tombol Verifikasi */}
                                {payment.proof_status === 'pending' && (
                                    <div className="flex flex-wrap gap-3 mt-5">
                                        <PrimaryButton
                                            onClick={() => verifyProof('verify')}
                                            iconLeft={
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            }
                                        >
                                            Verifikasi Bukti
                                        </PrimaryButton>
                                        <DangerButton
                                            onClick={() => setShowRejectForm(true)}
                                            variant="outline"
                                        >
                                            Tolak Bukti
                                        </DangerButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Form Tolak */}
                    {showRejectForm && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-red-200 dark:border-red-800 overflow-hidden mb-6 animate-[fadeIn_0.2s_ease-out]">
                            <div className="px-6 py-5 border-b border-red-100 dark:border-red-800 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Tolak Bukti Pembayaran</h3>
                            </div>
                            <div className="p-6">
                                <InputLabel value="Alasan Penolakan" required />
                                <textarea
                                    value={data.rejection_note}
                                    onChange={(e) => setData('rejection_note', e.target.value)}
                                    rows={3}
                                    placeholder="Jelaskan alasan penolakan..."
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 resize-y"
                                />
                                <div className="flex gap-3 mt-4">
                                    <DangerButton
                                        onClick={() => verifyProof('reject')}
                                        disabled={!data.rejection_note || processing}
                                        loading={processing}
                                    >
                                        Kirim Penolakan
                                    </DangerButton>
                                    <SecondaryButton onClick={() => setShowRejectForm(false)}>
                                        Batal
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Update Status */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Update Status</h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={updateStatus} className="space-y-5">
                                <div className="max-w-xs">
                                    <InputLabel value="Status Pembayaran" />
                                    <select
                                        value={statusData.status}
                                        onChange={(e) => setStatusData('status', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="success">Success / Lunas</option>
                                        <option value="failed">Failed / Gagal</option>
                                    </select>
                                </div>
                                <PrimaryButton type="submit" disabled={statusProcessing} loading={statusProcessing}>
                                    {statusProcessing ? 'Menyimpan...' : 'Update Status'}
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}