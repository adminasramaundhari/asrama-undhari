import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password - Asrama UNDHARI" />

            <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
                    </svg>
                </div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">
                    Konfirmasi Password
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Ini adalah area aman. Silakan konfirmasi password Anda sebelum melanjutkan.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Masukkan password Anda"
                        iconLeft={
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        }
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <PrimaryButton
                    type="submit"
                    className="w-full"
                    disabled={processing}
                    loading={processing}
                    iconLeft={
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    }
                >
                    {processing ? 'Mengkonfirmasi...' : 'Konfirmasi'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}