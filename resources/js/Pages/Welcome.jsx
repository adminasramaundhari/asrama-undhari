import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Selamat Datang - Asrama UNDHARI" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-500">
                
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary/40 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />

                <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
                    <div className="w-full max-w-4xl">
                        
                        {/* Header */}
                        <header className="text-center mb-12 animate-[fadeInUp_0.8s_ease-out]">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-xl shadow-primary/10 dark:shadow-primary/20 ring-1 ring-gray-100 dark:ring-gray-700">
                                    <ApplicationLogo className="h-20 sm:h-24" showText={false} />
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3">
                                Asrama <span className="text-primary">UNDHARI</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                                Sistem Informasi Asrama Universitas Dharmas Indonesia
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 italic">
                                "Jayalah Undhari — Kampus Unggul Tepercaya & Berasrama"
                            </p>
                        </header>

                        {/* Action Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 animate-[fadeInUp_0.8s_ease-out] animation-delay-200">
                            
                            {/* Card 1 - Landing Page */}
                            <a 
                                href="/"
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Landing Page</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Kunjungi halaman utama Asrama UNDHARI dengan informasi lengkap.</p>
                            </a>

                            {/* Card 2 - Login */}
                            {!auth.user && (
                                <Link 
                                    href={route('login')}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                        <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" y1="12" x2="3" y2="12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Login</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Masuk ke akun Anda untuk mengakses dashboard.</p>
                                </Link>
                            )}

                            {/* Card 3 - Register */}
                            {!auth.user && (
                                <Link 
                                    href={route('register')}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                        <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <line x1="20" y1="8" x2="20" y2="14" />
                                            <line x1="23" y1="11" x2="17" y2="11" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Daftar</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Buat akun baru untuk menjadi penghuni asrama.</p>
                                </Link>
                            )}

                            {/* Card 4 - Dashboard (if logged in) */}
                            {auth.user && (
                                <Link 
                                    href={route('dashboard')}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                        <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                            <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                            <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                            <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Akses dashboard Anda untuk mengelola asrama.</p>
                                </Link>
                            )}

                            {/* Card 5 - Galeri */}
                            <a 
                                href="/galeri"
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Galeri</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Lihat foto-foto fasilitas dan kegiatan asrama.</p>
                            </a>

                            {/* Card 6 - Kontak */}
                            <a 
                                href="/#kontak"
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kontak</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Hubungi kami untuk informasi lebih lanjut.</p>
                            </a>
                        </div>

                        {/* Footer */}
                        <footer className="text-center animate-[fadeInUp_0.8s_ease-out] animation-delay-400">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Sistem berjalan normal
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                                &copy; {new Date().getFullYear()} Asrama UNDHARI — Universitas Dharmas Indonesia
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}