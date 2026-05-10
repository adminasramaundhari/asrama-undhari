import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.asramas.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Asrama</h2>}
        >
            <Head title="Tambah Asrama" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Asrama Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Lengkapi data asrama untuk manajemen kamar</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-6">
                            
                            {/* Section: Informasi Asrama */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                    </svg>
                                    Informasi Asrama
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel value="Nama Asrama" required />
                                        <TextInput
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama asrama"
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div>
                                        <InputLabel value="Kode Asrama" required />
                                        <TextInput
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value)}
                                            placeholder="Contoh: APU, ACH, APM"
                                            required
                                        />
                                        <InputError message={errors.code} />
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 flex items-center gap-1">
                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="16" x2="12" y2="12" />
                                            </svg>
                                            Kode singkat untuk identifikasi asrama (3-5 karakter)
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel value="Alamat" hint="Alamat lengkap lokasi asrama" />
                                        <textarea
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows={3}
                                            placeholder="Masukkan alamat lengkap asrama..."
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-y"
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                </div>
                            </div>

                            {/* Preview Card */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    Preview
                                </h4>
                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-purple-100 dark:border-purple-800">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center text-lg font-black shadow-lg">
                                            {data.name ? data.name.charAt(0).toUpperCase() : 'A'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {data.name || 'Nama Asrama'}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                <span className="inline-flex items-center px-2 py-0.5 bg-purple-100 dark:bg-purple-800 rounded-md font-mono font-semibold text-purple-700 dark:text-purple-300">
                                                    {data.code || 'KODE'}
                                                </span>
                                                <span>{data.address || 'Alamat asrama'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.rooms.index')}>
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
                                    {processing ? 'Menyimpan...' : 'Simpan Asrama'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}