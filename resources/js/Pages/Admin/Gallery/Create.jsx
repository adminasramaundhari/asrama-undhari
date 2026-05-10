import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth }) {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: 'kegiatan',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.gallery.store'));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setData('image', null);
    };

    const categories = [
        { value: 'kegiatan', label: 'Kegiatan' },
        { value: 'fasilitas', label: 'Fasilitas' },
        { value: 'prestasi', label: 'Prestasi' },
        { value: 'lainnya', label: 'Lainnya' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Foto</h2>}
        >
            <Head title="Tambah Foto" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Foto Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Unggah foto ke galeri asrama</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-6" encType="multipart/form-data">
                            
                            {/* Upload Foto */}
                            <div>
                                <InputLabel value="Foto" required hint="Ukuran maksimal 2MB (JPG, PNG)" />
                                
                                {/* Preview */}
                                {preview ? (
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
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary dark:hover:border-primary transition-all duration-300 bg-gray-50 dark:bg-gray-900/50 group mt-1">
                                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                            <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            <span className="text-sm font-medium">Klik untuk upload foto</span>
                                            <span className="text-xs mt-1">JPG, PNG (max 2MB)</span>
                                        </div>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                            required={!preview}
                                        />
                                    </label>
                                )}
                                <InputError message={errors.image} />
                            </div>

                            {/* Judul */}
                            <div>
                                <InputLabel value="Judul" required />
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    placeholder="Masukkan judul foto"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Kategori */}
                            <div>
                                <InputLabel value="Kategori" required />
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category} />
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <InputLabel value="Deskripsi" hint="Deskripsi singkat tentang foto" />
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                    placeholder="Tulis deskripsi foto..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.gallery.index')}>
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
                                    {processing ? 'Menyimpan...' : 'Simpan Foto'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}