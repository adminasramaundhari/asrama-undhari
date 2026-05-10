import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, asramas }) {
    const { data, setData, post, processing, errors } = useForm({
        asrama_id: '',
        room_number: '',
        room_type: '',
        capacity: 2,
        price_per_month: '',
        facilities: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.rooms.store'));
    };

    const roomTypes = ['Standard', 'Deluxe', 'Suite', 'VIP', 'Ekonomi'];

    if (!asramas) {
        return (
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Kamar</h2>}>
                <Head title="Tambah Kamar" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center animate-pulse">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-4" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto" />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tambah Kamar</h2>}
        >
            <Head title="Tambah Kamar" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tambah Kamar Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Lengkapi data kamar asrama</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-6">
                            
                            {/* Section: Lokasi & Identitas */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Lokasi & Identitas
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <InputLabel value="Asrama" required />
                                        <select
                                            value={data.asrama_id}
                                            onChange={(e) => setData('asrama_id', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            required
                                        >
                                            <option value="">Pilih Asrama</option>
                                            {asramas?.map((asrama) => (
                                                <option key={asrama.id} value={asrama.id}>
                                                    {asrama.name} ({asrama.code})
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.asrama_id} />
                                    </div>

                                    <div>
                                        <InputLabel value="Nomor Kamar" required />
                                        <TextInput
                                            value={data.room_number}
                                            onChange={(e) => setData('room_number', e.target.value)}
                                            placeholder="Contoh: A-101"
                                            required
                                        />
                                        <InputError message={errors.room_number} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Detail Kamar */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="16" x2="12" y2="12" />
                                    </svg>
                                    Detail Kamar
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <InputLabel value="Tipe Kamar" required />
                                        <select
                                            value={data.room_type}
                                            onChange={(e) => setData('room_type', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            required
                                        >
                                            <option value="">Pilih Tipe</option>
                                            {roomTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.room_type} />
                                    </div>

                                    <div>
                                        <InputLabel value="Kapasitas (orang)" required />
                                        <TextInput
                                            type="number"
                                            value={data.capacity}
                                            onChange={(e) => setData('capacity', parseInt(e.target.value) || '')}
                                            placeholder="Maksimal penghuni"
                                            min="1"
                                            required
                                        />
                                        <InputError message={errors.capacity} />
                                    </div>

                                    <div>
                                        <InputLabel value="Harga per Bulan (Rp)" required />
                                        <TextInput
                                            type="number"
                                            value={data.price_per_month}
                                            onChange={(e) => setData('price_per_month', e.target.value)}
                                            placeholder="500000"
                                            min="0"
                                            required
                                        />
                                        <InputError message={errors.price_per_month} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Informasi Tambahan */}
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                    </svg>
                                    Informasi Tambahan
                                </h4>
                                <div className="space-y-5">
                                    <div>
                                        <InputLabel value="Fasilitas" hint="Pisahkan dengan koma: AC, Kamar Mandi Dalam, TV, WiFi" />
                                        <textarea
                                            value={data.facilities}
                                            onChange={(e) => setData('facilities', e.target.value)}
                                            rows={3}
                                            placeholder="Contoh: AC, Kamar Mandi Dalam, TV, WiFi, Lemari, Meja Belajar"
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                        />
                                        {data.facilities && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {data.facilities.split(',').map((f, i) => (
                                                    f.trim() && (
                                                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/5 dark:bg-primary/10 text-primary text-xs font-medium rounded-lg">
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                            {f.trim()}
                                                        </span>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                        <InputError message={errors.facilities} />
                                    </div>

                                    <div>
                                        <InputLabel value="Deskripsi" hint="Informasi tambahan tentang kamar (opsional)" />
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={3}
                                            placeholder="Deskripsi singkat tentang kamar..."
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                        />
                                        <InputError message={errors.description} />
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
                                    {processing ? 'Menyimpan...' : 'Simpan Kamar'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}