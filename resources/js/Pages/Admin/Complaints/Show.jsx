import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Show({ auth, complaint }) {
    const { data, setData, put, processing, errors } = useForm({
        status: complaint.status,
        admin_response: complaint.admin_response || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.complaints.update', complaint.id));
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return { text: 'Menunggu', color: 'bg-yellow-500' };
            case 'processing': return { text: 'Diproses', color: 'bg-blue-500' };
            case 'resolved': return { text: 'Selesai', color: 'bg-green-500' };
            case 'rejected': return { text: 'Ditolak', color: 'bg-red-500' };
            default: return { text: status || '-', color: 'bg-gray-500' };
        }
    };

    const status = getStatusBadge(complaint.status);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Pengaduan</h2>}
        >
            <Head title={`Detail Pengaduan - ${complaint.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('admin.complaints.index')} 
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Pengaduan
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-5 sm:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                            <circle cx="12" cy="12" r="2" />
                                        </svg>
                                    </div>
                                    <div className="text-white">
                                        <h1 className="text-xl font-black">{complaint.title}</h1>
                                        <p className="text-white/70 text-sm mt-0.5">{complaint.user?.name} • {complaint.category}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${status.color} shadow-lg self-start`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    {status.text}
                                </span>
                            </div>
                        </div>

                        {/* Info & Description */}
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                    </svg>
                                    {complaint.user?.name}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                    </svg>
                                    {complaint.created_at?.split('T')[0]}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 dark:bg-primary/20 rounded-lg text-xs font-semibold text-primary">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                    </svg>
                                    {complaint.category}
                                </span>
                            </div>

                            {/* Deskripsi */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 mb-6">
                                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                    </svg>
                                    Deskripsi Pengaduan
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {complaint.description}
                                </p>
                            </div>

                            {/* Foto */}
                            {complaint.image && (
                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        Foto Pendukung
                                    </h4>
                                    <a href={'/' + complaint.image} target="_blank" rel="noopener noreferrer" className="block group">
                                        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img 
                                                src={'/' + complaint.image} 
                                                alt="Bukti Pengaduan" 
                                                className="w-full max-h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                        <path d="M15 3h6v6" />
                                                        <path d="M9 21H3v-6" />
                                                        <line x1="21" y1="3" x2="14" y2="10" />
                                                        <line x1="3" y1="21" x2="10" y2="14" />
                                                    </svg>
                                                    Perbesar
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Update */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-2 h-6 rounded-full bg-primary flex-shrink-0" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Update Pengaduan</h3>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-5">
                            <div>
                                <InputLabel value="Status" required />
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                >
                                    <option value="pending">Menunggu</option>
                                    <option value="processing">Diproses</option>
                                    <option value="resolved">Selesai</option>
                                    <option value="rejected">Ditolak</option>
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            <div>
                                <InputLabel value="Respon Admin" hint="Tuliskan respon atau solusi untuk pengaduan ini" />
                                <textarea
                                    value={data.admin_response}
                                    onChange={(e) => setData('admin_response', e.target.value)}
                                    rows={4}
                                    placeholder="Tulis respon Anda di sini..."
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                />
                                <InputError message={errors.admin_response} />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                                <Link href={route('admin.complaints.index')}>
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
                                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                        </svg>
                                    }
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}