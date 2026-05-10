import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, penghuni, rooms, currentRoom }) {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(penghuni.faculty || '');

    const prodiData = {
        'FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN': [
            'S1 PENDIDIKAN GURU SEKOLAH DASAR (PGSD)',
            'S1 PENDIDIKAN MATEMATIKA',
            'S1 PENDIDIKAN BAHASA INGGRIS',
            'S1 PENDIDIKAN BAHASA INDONESIA',
            'S1 PENDIDIKAN GURU ANAK USIA DINI (PGPAUD)',
            'S1 PENDIDIKAN JASMANI, KESEHATAN, DAN REKREASI'
        ],
        'FAKULTAS ILMU KESEHATAN': [
            'S1 KEPERAWATAN',
            'S1 KEBIDANAN',
            'D3 KEBIDANAN',
            'PROFESI NERS',
            'PROFESI BIDAN'
        ],
        'FAKULTAS HUKUM DAN EKONOMI BISNIS': [
            'S1 MANAJEMEN',
            'S1 HUKUM'
        ],
        'FAKULTAS ILMU KOMPUTER': [
            'S1 SISTEM INFORMASI',
            'S1 TEKNIK INFORMATIKA'
        ]
    };

    const faculties = Object.keys(prodiData);

    const availableProdis = useMemo(() => {
        if (!selectedFaculty) return [];
        return prodiData[selectedFaculty] || [];
    }, [selectedFaculty]);

    const { data, setData, put, processing, errors } = useForm({
        name: penghuni.name || '',
        email: penghuni.email || '',
        nim: penghuni.nim || '',
        phone: penghuni.phone || '',
        faculty: penghuni.faculty || '',
        kelamin: penghuni.kelamin || '',
        prodi: penghuni.prodi || '',
    });

    const { data: assignData, setData: setAssignData, post: assignPost, processing: assignProcessing, errors: assignErrors } = useForm({
        room_id: currentRoom?.room_id || '',
        check_in_date: currentRoom?.check_in_date?.split('T')[0] || new Date().toISOString().split('T')[0],
    });

    const handleFacultyChange = (e) => {
        const faculty = e.target.value;
        setSelectedFaculty(faculty);
        setData('faculty', faculty);
        setData('prodi', '');
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.penghuni.update', penghuni.id));
    };

    const submitAssign = (e) => {
        e.preventDefault();
        assignPost(route('admin.penghuni.assign-room', penghuni.id), {
            onSuccess: () => setShowAssignModal(false),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Penghuni</h2>}
        >
            <Head title={`Edit - ${penghuni.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Form Data Diri */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Data Penghuni</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Perbarui informasi data diri</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
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
                                    <InputLabel value="NIM" required />
                                    <TextInput
                                        value={data.nim}
                                        onChange={(e) => setData('nim', e.target.value)}
                                        placeholder="Masukkan NIM"
                                        required
                                    />
                                    <InputError message={errors.nim} />
                                </div>

                                <div>
                                    <InputLabel value="Jenis Kelamin" />
                                    <select
                                        value={data.kelamin}
                                        onChange={(e) => setData('kelamin', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                    <InputError message={errors.kelamin} />
                                </div>

                                <div>
                                    <InputLabel value="Fakultas" required />
                                    <select
                                        value={data.faculty}
                                        onChange={handleFacultyChange}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                        required
                                    >
                                        <option value="">Pilih Fakultas</option>
                                        {faculties.map((f) => (
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

                                <div>
                                    <InputLabel value="Nomor HP" />
                                    <TextInput
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
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

                    {/* Info Kamar */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                    <path d="M3 21h18" />
                                    <rect x="6" y="10" width="12" height="8" rx="1" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Info Kamar</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Penempatan kamar penghuni</p>
                            </div>
                        </div>

                        <div className="p-6">
                            {currentRoom ? (
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Nomor Kamar</p>
                                            <p className="text-2xl font-black text-blue-700 dark:text-blue-400">{currentRoom.room?.room_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Tipe</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{currentRoom.room?.room_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Tanggal Check-in</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{currentRoom.check_in_date?.split('T')[0]}</p>
                                        </div>
                                    </div>
                                    <PrimaryButton
                                        type="button"
                                        variant="light"
                                        onClick={() => setShowAssignModal(true)}
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 1l4 4-4 4" />
                                                <path d="M3 7h13" />
                                                <path d="M21 17l-4 4-4-4" />
                                                <path d="M7 17H3" />
                                            </svg>
                                        }
                                    >
                                        Pindah Kamar
                                    </PrimaryButton>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                        <path d="M3 21h18" />
                                    </svg>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Belum memiliki kamar</p>
                                    <PrimaryButton
                                        type="button"
                                        onClick={() => setShowAssignModal(true)}
                                        iconLeft={
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                        }
                                    >
                                        Assign Kamar
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Assign Kamar */}
            {showAssignModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm" onClick={() => setShowAssignModal(false)} />
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-700 animate-[fadeIn_0.2s_ease-out]">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {currentRoom ? 'Pindah Kamar' : 'Assign Kamar'}
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={submitAssign} className="p-6 space-y-5">
                            <div>
                                <InputLabel value="Pilih Kamar" required />
                                <select
                                    value={assignData.room_id}
                                    onChange={(e) => setAssignData('room_id', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    required
                                >
                                    <option value="">Pilih Kamar</option>
                                    {rooms && rooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            Kamar {room.room_number} — {room.room_type} ({room.capacity} org)
                                        </option>
                                    ))}
                                </select>
                                <InputError message={assignErrors.room_id} />
                            </div>

                            <div>
                                <InputLabel value="Tanggal Check-in" required />
                                <TextInput
                                    type="date"
                                    value={assignData.check_in_date}
                                    onChange={(e) => setAssignData('check_in_date', e.target.value)}
                                    required
                                />
                                <InputError message={assignErrors.check_in_date} />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <SecondaryButton
                                    type="button"
                                    onClick={() => setShowAssignModal(false)}
                                    className="flex-1"
                                >
                                    Batal
                                </SecondaryButton>
                                <PrimaryButton
                                    type="submit"
                                    disabled={assignProcessing}
                                    loading={assignProcessing}
                                    className="flex-1"
                                >
                                    {assignProcessing ? 'Memproses...' : 'Simpan'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}