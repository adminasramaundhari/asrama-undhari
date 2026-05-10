import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Show({ auth, payment }) {
    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null,
    });

    const [preview, setPreview] = useState(null);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('payment_proof', file);
            if (file.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }
        }
    };

    const handleRemoveFile = () => {
        setData('payment_proof', null);
        setPreview(null);
    };

    const uploadProof = (e) => {
        e.preventDefault();
        post(route('mahasiswa.payments.upload-proof', payment.id));
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
            case 'pending': return { text: 'Menunggu Verifikasi', color: 'bg-yellow-500' };
            case 'verified': return { text: 'Terverifikasi', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: 'Belum Upload', color: 'bg-gray-400' };
        }
    };

    const paymentStatus = getStatusBadge(payment.status);
    const proofStatus = getProofStatusBadge(payment.proof_status || (payment.payment_proof ? 'pending' : null));
    const canUpload = payment.status !== 'success' && payment.status !== 'paid' && payment.status !== 'lunas';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Tagihan</h2>}
        >
            <Head title={`Detail Tagihan - ${payment.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('mahasiswa.payments.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Tagihan
                    </Link>

                    {/* Info Tagihan */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
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
                                        <h1 className="text-xl font-black">Invoice #{payment.invoice_number}</h1>
                                        <p className="text-white/70 text-sm mt-0.5">{payment.payment_type || 'Tagihan'}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${paymentStatus.color} shadow-lg self-start`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    {paymentStatus.text}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { label: 'Jumlah', value: formatRupiah(payment.amount), icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                                    ), color: 'bg-primary' },
                                    { label: 'Jatuh Tempo', value: payment.due_date?.split('T')[0] || '-', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
                                    ), color: 'bg-blue-500' },
                                    { label: 'Tanggal Bayar', value: payment.payment_date?.split('T')[0] || 'Belum bayar', icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    ), color: 'bg-green-500' },
                                    { label: 'Status Bukti', value: proofStatus.text, icon: (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                    ), color: proofStatus.color, isBadge: true },
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-8 h-8 rounded-lg ${item.color} text-white flex items-center justify-center`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{item.label}</span>
                                        </div>
                                        {item.isBadge ? (
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${item.color}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                {item.value}
                                            </span>
                                        ) : (
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</p>
                                        )}
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
                                    className="w-full max-h-80 object-contain rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 mb-4"
                                />
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Status Verifikasi:</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${proofStatus.color}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                        {proofStatus.text}
                                    </span>
                                </div>

                                {/* Catatan Penolakan */}
                                {payment.rejection_note && (
                                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                        <p className="text-xs text-red-500 uppercase font-semibold mb-1">Catatan Penolakan:</p>
                                        <p className="text-sm text-red-700 dark:text-red-400">{payment.rejection_note}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Upload Form */}
                    {canUpload && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {payment.payment_proof ? 'Upload Ulang Bukti' : 'Upload Bukti Pembayaran'}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Format JPG, PNG (max 2MB)
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={uploadProof} className="p-6 space-y-5" encType="multipart/form-data">
                                
                                {/* Preview */}
                                {preview ? (
                                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary dark:hover:border-primary transition-all duration-300 bg-gray-50 dark:bg-gray-900/50 group">
                                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            <span className="text-sm font-medium">Klik untuk upload bukti</span>
                                        </div>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/jpeg,image/png,image/jpg"
                                            className="hidden"
                                        />
                                    </label>
                                )}
                                <InputError message={errors.payment_proof} />

                                {/* Info */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="16" x2="12" y2="12" />
                                    </svg>
                                    <div className="text-sm text-blue-700 dark:text-blue-400">
                                        <p className="font-medium">Pastikan bukti pembayaran jelas terbaca dan sesuai nominal tagihan.</p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton type="submit" disabled={processing} loading={processing}
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                        }
                                    >
                                        {processing ? 'Mengupload...' : (payment.payment_proof ? 'Upload Ulang' : 'Upload Bukti')}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Kembali */}
                    <div className="mt-6">
                        <Link href={route('mahasiswa.payments.index')}>
                            <SecondaryButton
                                iconLeft={
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5" />
                                        <polyline points="12 19 5 12 12 5" />
                                    </svg>
                                }
                            >
                                Kembali ke Daftar Tagihan
                            </SecondaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}