import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Edit({ auth, announcement }) {
    const { data, setData, post, processing, errors } = useForm({
        title: announcement.title || '',
        content: announcement.content || '',
        target: announcement.target || 'all',
        is_active: announcement.is_active || false,
        image: null,
        _method: 'PUT',
    });

    const [preview, setPreview] = useState(announcement.image ? '/' + announcement.image : null);
    const [removeImage, setRemoveImage] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('target', data.target);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('_method', 'PUT');
        if (data.image) {
            formData.append('image', data.image);
        }
        if (removeImage) {
            formData.append('remove_image', '1');
        }
        router.post(route('admin.announcements.update', announcement.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => window.location.reload(),
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);
        setPreview(null);
        setRemoveImage(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Pengumuman</h2>}
        >
            <Head title={`Edit Pengumuman - ${announcement.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Pengumuman</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.title}</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-6 space-y-6" encType="multipart/form-data">
                            
                            {/* Judul */}
                            <div>
                                <InputLabel value="Judul" required />
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    placeholder="Masukkan judul pengumuman"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Target + Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <InputLabel value="Target" required />
                                    <select
                                        value={data.target}
                                        onChange={(e) => setData('target', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    >
                                        <option value="all">Semua User</option>
                                        <option value="mahasiswa">Mahasiswa</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <InputError message={errors.target} />
                                </div>

                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-primary bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
                                        />
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            {data.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-gray-500">
                                                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                                                    Nonaktif
                                                </span>
                                            )}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Konten */}
                            <div>
                                <InputLabel value="Konten" required />
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={10}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                    placeholder="Tulis konten pengumuman..."
                                    required
                                />
                                <InputError message={errors.content} />
                            </div>

                            {/* Foto */}
                            <div>
                                <InputLabel value="Foto (Opsional)" hint="Ukuran maksimal 2MB (JPG, PNG)" />
                                
                                {/* Preview */}
                                {preview && !removeImage && (
                                    <div className="relative mb-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
                                    </div>
                                )}

                                {/* Upload */}
                                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary dark:hover:border-primary transition-all duration-300 bg-gray-50 dark:bg-gray-900/50 group">
                                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <span className="text-xs font-medium">Upload foto baru</span>
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        className="hidden"
                                    />
                                </label>
                                <InputError message={errors.image} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.announcements.index')}>
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