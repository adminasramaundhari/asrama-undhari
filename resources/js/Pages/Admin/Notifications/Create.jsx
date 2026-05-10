import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth, users }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        message: '',
        type: 'info',
        user_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.notifications.store'));
    };

    const types = [
        { value: 'info', label: 'Info', color: 'bg-blue-500', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/></svg>
        )},
        { value: 'warning', label: 'Warning', color: 'bg-yellow-500', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        )},
        { value: 'success', label: 'Success', color: 'bg-green-500', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        )},
        { value: 'error', label: 'Error', color: 'bg-red-500', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        )},
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Kirim Notifikasi</h2>}
        >
            <Head title="Kirim Notifikasi" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kirim Notifikasi Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Kirim notifikasi ke penghuni asrama</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-5">
                            
                            <div>
                                <InputLabel value="Judul Notifikasi" required />
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    placeholder="Masukkan judul notifikasi"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <InputLabel value="Tipe Notifikasi" required />
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        {types.map((type) => (
                                            <label
                                                key={type.value}
                                                className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                    data.type === type.value
                                                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type.value}
                                                    checked={data.type === type.value}
                                                    onChange={(e) => setData('type', e.target.value)}
                                                    className="sr-only"
                                                />
                                                <span className={`w-8 h-8 rounded-lg ${type.color} text-white flex items-center justify-center`}>
                                                    {type.icon}
                                                </span>
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{type.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.type} />
                                </div>

                                <div>
                                    <InputLabel value="Penerima" hint="Kosongkan untuk kirim ke semua user" />
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    >
                                        <option value="">Semua User</option>
                                        {users?.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} — {u.nim || 'N/A'}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.user_id} />
                                </div>
                            </div>

                            <div>
                                <InputLabel value="Pesan" required />
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                    placeholder="Tulis pesan notifikasi..."
                                    required
                                />
                                <InputError message={errors.message} />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.notifications.index')}>
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
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Notifikasi'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}