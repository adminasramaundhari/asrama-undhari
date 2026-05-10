import { useState, useEffect } from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register({ faculties, prodis }) {
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [ktmPreview, setKtmPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        nim: '',
        kelamin: '',
        faculty: '',
        prodi: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        ktm: null, // File KTM
    });

    const availableProdis = selectedFaculty && prodis ? prodis[selectedFaculty] || [] : [];

    const handleFacultyChange = (e) => {
        setSelectedFaculty(e.target.value);
        setData('faculty', e.target.value);
        setData('prodi', '');
    };

    // Handle upload KTM
    const handleKtmChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('ktm', file);
            // Preview
            const reader = new FileReader();
            reader.onloadend = () => setKtmPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Daftar Akun - Asrama UNDHARI" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
                
                {/* Decorative Background */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

                {/* Header */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                    <Link href="/" className="flex justify-center mb-6">
                        <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg shadow-primary/10 dark:shadow-primary/20 ring-1 ring-gray-100 dark:ring-gray-700">
                            <ApplicationLogo className="h-14 sm:h-16" showText={false} />
                        </div>
                    </Link>
                    <h2 className="text-center text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                        Daftar Akun Mahasiswa
                    </h2>
                    <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="font-semibold text-primary hover:underline">
                            Login di sini
                        </Link>
                    </p>
                </div>

                {/* Form Card */}
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Card Header Accent */}
                        <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

                        <div className="py-8 px-6 sm:px-10">
                            <form onSubmit={submit} className="space-y-5">
                                
                                {/* Section: Data Pribadi */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                                        Data Pribadi
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel value="Nama Lengkap" required />
                                            <TextInput
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div>
                                            <InputLabel value="NIM" required />
                                            <TextInput
                                                value={data.nim}
                                                onChange={(e) => setData('nim', e.target.value)}
                                                placeholder="Nomor Induk Mahasiswa"
                                                required
                                            />
                                            <InputError message={errors.nim} />
                                        </div>

                                        <div>
                                            <InputLabel value="Jenis Kelamin" required />
                                            <select
                                                value={data.kelamin}
                                                onChange={(e) => setData('kelamin', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                                required
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                            <InputError message={errors.kelamin} />
                                        </div>

                                        <div>
                                            <InputLabel value="Nomor Telepon" />
                                            <TextInput
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="08xxxxxxxxxx"
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 dark:border-gray-700" />

                                {/* Section: Data Akademik */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                                        Data Akademik
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel value="Fakultas" required />
                                            <select
                                                value={data.faculty}
                                                onChange={handleFacultyChange}
                                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                                required
                                            >
                                                <option value="">Pilih Fakultas</option>
                                                {faculties?.map((f) => (
                                                    <option key={f} value={f}>{f}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.faculty} />
                                        </div>

                                        <div>
                                            <InputLabel value="Program Studi" required />
                                            <select
                                                value={data.prodi}
                                                onChange={(e) => setData('prodi', e.target.value)}
                                                className={`w-full px-4 py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${
                                                    !selectedFaculty
                                                        ? 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                                        : 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                                                }`}
                                                disabled={!selectedFaculty}
                                                required
                                            >
                                                <option value="">
                                                    {selectedFaculty ? 'Pilih Program Studi' : 'Pilih fakultas terlebih dahulu'}
                                                </option>
                                                {availableProdis.map((p) => (
                                                    <option key={p} value={p}>{p}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.prodi} />
                                        </div>

                                        {/* Upload KTM */}
                                        <div>
                                            <InputLabel value="Kartu Tanda Mahasiswa (KTM)" required hint="Upload foto/scan KTM Anda (JPG, PNG, max 2MB)" />
                                            <div className="mt-1">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary dark:hover:border-primary transition-all duration-300 bg-gray-50 dark:bg-gray-900/50 group overflow-hidden relative">
                                                    {ktmPreview ? (
                                                        <div className="relative w-full h-full">
                                                            <img 
                                                                src={ktmPreview} 
                                                                alt="Preview KTM" 
                                                                className="w-full h-full object-contain p-1"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5">
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                                        <polyline points="7 10 12 15 17 10" />
                                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                                    </svg>
                                                                    Ganti Foto
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                                            <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                                <polyline points="7 10 12 15 17 10" />
                                                                <line x1="12" y1="15" x2="12" y2="3" />
                                                            </svg>
                                                            <span className="text-xs font-medium">Klik untuk upload KTM</span>
                                                            <span className="text-[10px] mt-0.5">JPG, PNG (max 2MB)</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/jpg"
                                                        onChange={handleKtmChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            {data.ktm && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                        {data.ktm.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setData('ktm', null); setKtmPreview(null); }}
                                                        className="text-xs text-red-500 hover:text-red-600"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            )}
                                            <InputError message={errors.ktm} />
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 dark:border-gray-700" />

                                {/* Section: Keamanan */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                                        Akun & Keamanan
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel value="Email" required />
                                            <TextInput
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="contoh@email.com"
                                                required
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div>
                                            <InputLabel value="Password" required />
                                            <TextInput
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Minimal 8 karakter"
                                                required
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div>
                                            <InputLabel value="Konfirmasi Password" required />
                                            <TextInput
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Ulangi password"
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                        loading={processing}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700 text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                Dengan mendaftar, Anda menyetujui{' '}
                                <Link href="/syarat-ketentuan" className="text-primary hover:underline">Syarat & Ketentuan</Link>
                                {' '}yang berlaku.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}