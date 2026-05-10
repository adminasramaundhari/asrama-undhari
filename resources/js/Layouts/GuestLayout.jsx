import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-8 sm:px-6 relative overflow-hidden transition-colors duration-500">
            
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary/20 dark:bg-primary/30 rounded-full animate-bounce pointer-events-none" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary/30 dark:bg-primary/40 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />

            <div className="relative z-10 mb-6">
                <Link href="/" className="inline-block group">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-lg shadow-primary/10 dark:shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500 group-hover:scale-105 ring-1 ring-gray-100 dark:ring-gray-700">
                            <ApplicationLogo className="h-16 sm:h-20" showText={false} />
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">ASRAMA</h1>
                            <p className="text-xs font-bold text-primary tracking-[0.25em] uppercase">UNDHARI</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 animate-[fadeInUp_0.6s_ease-out]">
                <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
                <div className="px-6 py-8 sm:px-8">
                    {children}
                </div>
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                        &copy; {new Date().getFullYear()} ASRAMA UNDHARI
                    </p>
                </div>
            </div>
        </div>
    );
}