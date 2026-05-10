import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useMemo, useRef, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, users, rooms }) {
    // Searchable Dropdown State
    const [searchUser, setSearchUser] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedUserName, setSelectedUserName] = useState('');
    const dropdownRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        amount: '',
        due_date: '',
        payment_type: 'monthly',
        description: '',
    });

    // Filter users untuk searchable dropdown
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        if (!searchUser.trim()) return users.slice(0, 50); // Tampilkan 50 pertama
        const term = searchUser.toLowerCase().trim();
        return users.filter(u =>
            (u.name && u.name.toLowerCase().includes(term)) ||
            (u.nim && u.nim.toLowerCase().includes(term)) ||
            (u.email && u.email.toLowerCase().includes(term))
        ).slice(0, 30);
    }, [users, searchUser]);

    // Close dropdown saat klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle select user
    const handleSelectUser = (user) => {
        setData('user_id', user.id);
        setSelectedUserName(`${user.name} — ${user.nim || 'N/A'}`);
        setSearchUser('');
        setIsDropdownOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.payments.store'));
    };

    const paymentTypes = [
        { value: 'monthly', label: 'ASRAMA (Bulanan)' },
        { value: 'semester', label: 'IURAN AIR' },
        { value: 'annual', label: 'LAINNYA' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Buat Tagihan</h2>}
        >
            <Head title="Buat Tagihan" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="3" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Buat Tagihan Baru</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Cari mahasiswa untuk membuat tagihan pembayaran</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="p-6 space-y-6">
                            
                            {/* Searchable Mahasiswa Dropdown */}
                            <div ref={dropdownRef} className="relative">
                                <InputLabel value="Mahasiswa" required />
                                
                                {data.user_id && selectedUserName ? (
                                    // User sudah dipilih
                                    <div className="flex items-center justify-between w-full px-4 py-2.5 bg-primary/5 dark:bg-primary/10 border border-primary/30 dark:border-primary/30 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                {selectedUserName.charAt(0)}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedUserName}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('user_id', '');
                                                setSelectedUserName('');
                                                setSearchUser('');
                                            }}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    // Search input
                                    <div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="11" cy="11" r="8" />
                                                    <path d="m21 21-4.3-4.3" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Ketik nama atau NIM mahasiswa..."
                                                value={searchUser}
                                                onChange={(e) => {
                                                    setSearchUser(e.target.value);
                                                    setIsDropdownOpen(true);
                                                }}
                                                onFocus={() => setIsDropdownOpen(true)}
                                                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            />
                                            {searchUser && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchUser('');
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                                >
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        {/* Dropdown List */}
                                        {isDropdownOpen && (
                                            <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-[fadeIn_0.15s_ease-out]">
                                                {filteredUsers.length === 0 ? (
                                                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                                                        <svg className="w-8 h-8 mx-auto mb-2 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                            <circle cx="11" cy="11" r="8" />
                                                            <path d="m21 21-4.3-4.3" />
                                                        </svg>
                                                        Mahasiswa tidak ditemukan
                                                    </div>
                                                ) : (
                                                    <>
                                                        {!searchUser && (
                                                            <div className="px-4 py-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 sticky top-0">
                                                                Menampilkan {filteredUsers.length} dari {users?.length} mahasiswa. Ketik untuk mencari...
                                                            </div>
                                                        )}
                                                        {filteredUsers.map((user) => (
                                                            <button
                                                                key={user.id}
                                                                type="button"
                                                                onClick={() => handleSelectUser(user)}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-150 border-b border-gray-50 dark:border-gray-700/50 last:border-b-0"
                                                            >
                                                                <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                                    {user.name?.charAt(0)?.toUpperCase()}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.nim} • {user.email}</p>
                                                                </div>
                                                                <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 ml-auto flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                                    <polyline points="9 18 15 12 9 6" />
                                                                </svg>
                                                            </button>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <InputError message={errors.user_id} />
                            </div>

                            {/* Jumlah + Tipe */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <InputLabel value="Jumlah Pembayaran (Rp)" required />
                                    <TextInput
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="500000"
                                        min="0"
                                        required
                                    />
                                    <InputError message={errors.amount} />
                                </div>

                                <div>
                                    <InputLabel value="Tipe Pembayaran" required />
                                    <select
                                        value={data.payment_type}
                                        onChange={(e) => setData('payment_type', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    >
                                        {paymentTypes.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.payment_type} />
                                </div>
                            </div>

                            {/* Tanggal Jatuh Tempo */}
                            <div>
                                <InputLabel value="Tanggal Jatuh Tempo" required />
                                <TextInput
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.due_date} />
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <InputLabel value="Deskripsi (Opsional)" />
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={2}
                                    placeholder="Contoh: Pembayaran asrama bulan Januari 2025"
                                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-y"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.payments.index')}>
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
                                    {processing ? 'Menyimpan...' : 'Buat Tagihan'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}