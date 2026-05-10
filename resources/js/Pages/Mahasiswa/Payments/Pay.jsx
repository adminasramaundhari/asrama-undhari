import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Pay({ auth, payment }) {
    const [preview, setPreview] = useState(payment.payment_proof ? '/' + payment.payment_proof : null);

    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null,
    });

    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('mahasiswa.payments.upload', payment.id));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('payment_proof', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setData('payment_proof', null);
    };

    const getProofStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Menunggu Verifikasi', color: 'bg-yellow-500' };
            case 'verified': return { text: 'Terverifikasi', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: 'Belum Upload', color: 'bg-gray-400' };
        }
    };

    const proofStatus = getProofStatusBadge(payment.proof_status || (payment.payment_proof ? 'pending' : null));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Upload Bukti Pembayaran</h2>}
        >
            <Head title="Upload Bukti Pembayaran" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
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
                            <h1 className="text-xl font-black text-white">Tagihan #{payment.invoice_number}</h1>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Jumlah</p>
                                    <p className="text-xl font-black text-gray-900 dark:text-white">{formatRupiah(payment.amount)}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Jatuh Tempo</p>
                                    <p className="text-xl font-black text-gray-900 dark:text-white">{payment.due_date?.split('T')[0] || '-'}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Status Bukti</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${proofStatus.color}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                        {proofStatus.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Form */}
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

                        <form onSubmit={submit} className="p-6 space-y-6" encType="multipart/form-data">
                            
                            {/* Bukti Saat Ini */}
                            {payment.payment_proof && preview && preview === '/' + payment.payment_proof && (
                                <div>
                                    <InputLabel value="Bukti Pembayaran Saat Ini" />
                                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-1">
                                        <img 
                                            src={preview} 
                                            alt="Bukti Pembayaran" 
                                            className="w-full max-h-64 object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Upload Area */}
                            <div>
                                <InputLabel value="Upload Bukti" required />
                                
                                {preview && preview !== '/' + payment.payment_proof ? (
                                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                        </button>
                                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-green-500 text-white rounded-lg text-xs font-semibold shadow-lg">
                                            Preview Baru
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary dark:hover:border-primary transition-all duration-300 bg-gray-50 dark:bg-gray-900/50 group mt-1">
                                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                            <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            <span className="text-sm font-medium">Klik untuk upload bukti pembayaran</span>
                                            <span className="text-xs mt-1">JPG, PNG (max 2MB)</span>
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
                            </div>

                            {/* Info Penting */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                                <div className="text-sm text-blue-700 dark:text-blue-400">
                                    <p className="font-medium">Petunjuk Upload:</p>
                                    <ul className="mt-1 space-y-1 text-xs list-disc list-inside">
                                        <li>Upload bukti transfer/screenshot pembayaran yang jelas</li>
                                        <li>Pastikan nominal dan tanggal terlihat</li>
                                        <li>Admin akan memverifikasi bukti dalam 1x24 jam</li>
                                        <li>Upload ulang jika bukti sebelumnya ditolak</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('mahasiswa.payments.index')}>
                                    <SecondaryButton type="button"
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
                                <PrimaryButton type="submit" disabled={processing} loading={processing}
                                    iconLeft={
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    }
                                >
                                    {processing ? 'Mengupload...' : 'Upload Bukti'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}