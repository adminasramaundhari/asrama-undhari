import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Edit({ auth, notification, users }) {
    const { data, setData, put, processing, errors } = useForm({
        title: notification.title || '',
        message: notification.message || '',
        type: notification.type || 'info',
        user_id: notification.user_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.notifications.update', notification.id));
    };

    const types = [
        { value: 'info', label: 'Info', color: 'bg-blue-500' },
        { value: 'warning', label: 'Warning', color: 'bg-yellow-500' },
        { value: 'success', label: 'Success', color: 'bg-green-500' },
        { value: 'error', label: 'Error', color: 'bg-red-500' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Notifikasi</h2>}
        >
            <Head title={`Edit Notifikasi - ${notification.title}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Notifikasi</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{notification.title}</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-6 space-y-5">
                            
                            {/* Judul */}
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

                            {/* Tipe + Penerima */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <InputLabel value="Tipe Notifikasi" required />
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {types.map((type) => (
                                            <label
                                                key={type.value}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                    data.type === type.value
                                                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
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
                                                <span className={`w-2.5 h-2.5 rounded-full ${type.color}`} />
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{type.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.type} />
                                </div>

                                <div>
                                    <InputLabel value="Penerima" hint="Kosongkan untuk semua user" />
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

                            {/* Pesan */}
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

                            {/* Action Buttons */}
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