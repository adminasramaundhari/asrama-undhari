import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function WaitingVerification() {
    return (
        <>
            <Head title="Menunggu Verifikasi - Asrama UNDHARI" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
                
                {/* Decorative Background */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

                <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                    {/* Logo */}
                    <Link href="/" className="flex justify-center mb-8">
                        <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg shadow-primary/10 dark:shadow-primary/20 ring-1 ring-gray-100 dark:ring-gray-700">
                            <ApplicationLogo className="h-14 sm:h-16" showText={false} />
                        </div>
                    </Link>

                    {/* Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Header Accent */}
                        <div className="h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300" />

                        <div className="py-8 px-6 sm:px-10 text-center">
                            
                            {/* Icon Animasi */}
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                                <div className="relative w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                                Pendaftaran Berhasil!
                            </h2>

                            {/* Message */}
                            <div className="mt-4 space-y-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Akun Anda telah terdaftar dan sedang <span className="font-semibold text-yellow-600 dark:text-yellow-400">menunggu verifikasi</span> dari admin asrama.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Proses verifikasi membutuhkan waktu maksimal 1x24 jam. Silakan tunggu email konfirmasi atau hubungi admin asrama.
                                </p>
                            </div>

                            {/* Steps */}
                            <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4">
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                                        Daftar
                                    </span>
                                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-[10px] font-bold animate-pulse">
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        </span>
                                        Verifikasi
                                    </span>
                                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    <span className="flex items-center gap-1.5 opacity-50">
                                        <span className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                                        Login
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-5 p-3 bg-primary/5 dark:bg-primary/10 rounded-xl">
                                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" />
                                    </svg>
                                    Konfirmasi admin: <span className="font-semibold"> WA 0895621974020</span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                <Link
                                    href={route('login')}
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Kembali ke Halaman Login
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    </svg>
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}