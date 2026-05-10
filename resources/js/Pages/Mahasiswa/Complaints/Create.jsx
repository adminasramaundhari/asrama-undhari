import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        if (data.image) {
            formData.append('image', data.image);
        }
        post(route('mahasiswa.complaints.store'), formData);
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
        { value: 'fasilitas', label: 'Fasilitas Rusak', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        )},
        { value: 'kebersihan', label: 'Kebersihan', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
        )},
        { value: 'keamanan', label: 'Keamanan', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        )},
        { value: 'lainnya', label: 'Lainnya', icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/></svg>
        )},
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Buat Pengaduan</h2>}
        >
            <Head title="Buat Pengaduan" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Buat Pengaduan Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Sampaikan keluhan atau masukan Anda</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-5" encType="multipart/form-data">
                            
                            {/* Judul */}
                            <div>
                                <InputLabel value="Judul Pengaduan" required />
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    placeholder="Masukkan judul pengaduan"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Kategori */}
                            <div>
                                <InputLabel value="Kategori" required />
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    {categories.map((cat) => (
                                        <label
                                            key={cat.value}
                                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                data.category === cat.value
                                                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.value}
                                                checked={data.category === cat.value}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="text-primary">{cat.icon}</span>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={errors.category} />
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <InputLabel value="Deskripsi" required hint="Jelaskan pengaduan Anda secara detail" />
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                    placeholder="Tulis deskripsi pengaduan..."
                                    required
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Upload Foto */}
                            <div>
                                <InputLabel value="Foto Pendukung (Opsional)" hint="Upload foto sebagai bukti (JPG, PNG max 2MB)" />
                                
                                {preview ? (
                                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-1">
                                        <img src={preview} alt="Preview" className="w-full max-h-48 object-cover" />
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
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary dark:hover:border-primary transition-all duration-300 bg-gray-50 dark:bg-gray-900/50 group mt-1">
                                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                                            accept="image/jpeg,image/png,image/jpg"
                                            className="hidden"
                                        />
                                    </label>
                                )}
                                <InputError message={errors.image} />
                            </div>

                            {/* Info */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                </svg>
                                <div className="text-sm text-blue-700 dark:text-blue-400">
                                    <p className="font-medium">Petunjuk:</p>
                                    <ul className="mt-1 space-y-1 text-xs list-disc list-inside">
                                        <li>Jelaskan pengaduan dengan jelas dan detail</li>
                                        <li>Sertakan foto pendukung jika diperlukan</li>
                                        <li>Admin akan merespon dalam 1x24 jam</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('mahasiswa.complaints.index')}>
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
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    }
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pengaduan'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}