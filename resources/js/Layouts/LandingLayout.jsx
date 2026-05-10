import { Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function LandingLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profilDropdownOpen, setProfilDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const profilDropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profilDropdownRef.current && !profilDropdownRef.current.contains(event.target)) {
                setProfilDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { label: 'Ketersediaan', href: '/#ketersediaan' },
        { label: 'Pengumuman', href: '/#pengumuman' },
        { label: 'Prosedur', href: '/#prosedur' },
        { label: 'Kontak', href: '/#kontak' },
        { label: 'Galeri', href: '/galeri' },
    ];

    const profilLinks = [
        { label: 'Identitas', href: '/profil/identitas' },
        { label: 'Struktur', href: '/profil/struktur' },
        { label: 'Sejarah', href: '/profil/sejarah' },
        { label: 'Visi & Misi', href: '/profil/visi-misi' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
            
            <nav className={`sticky top-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-black/30' 
                    : 'bg-white dark:bg-gray-900 shadow-md'
            }`}>
                <div className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
                    
                    <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                        <ApplicationLogo className="h-9" showText={false} />
                        <div className="leading-tight hidden sm:block">
                            <h1 className="text-base font-black text-gray-900 dark:text-white tracking-tight">ASRAMA</h1>
                            <p className="text-[12px] font-bold text-primary tracking-[0.2em] uppercase">UNDHARI</p>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a 
                                key={link.label}
                                href={link.href} 
                                className="relative px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
                            </a>
                        ))}

                        <div className="relative" ref={profilDropdownRef}>
                            <button 
                                onClick={() => setProfilDropdownOpen(!profilDropdownOpen)} 
                                className="relative px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                            >
                                Profil
                                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${profilDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
                            </button>
                            
                            {profilDropdownOpen && (
                                <div className="absolute left-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-[fadeIn_0.2s_ease-out] origin-top-left overflow-hidden">
                                    {profilLinks.map((link) => (
                                        <Link 
                                            key={link.label}
                                            href={link.href} 
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                                            onClick={() => setProfilDropdownOpen(false)}
                                        >
                                            <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-2.5 ml-4">
                        <Link 
                            href="/login" 
                            className="px-5 py-2.5 text-sm font-semibold border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                        >
                            Login
                        </Link>
                        <Link 
                            href="/register" 
                            className="px-5 py-2.5 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                        >
                            Daftar
                        </Link>
                    </div>

                    <button 
                        className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
                    mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <a 
                                key={link.label}
                                href={link.href} 
                                className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:translate-x-1"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        
                        <div>
                            <button 
                                onClick={() => setProfilDropdownOpen(!profilDropdownOpen)} 
                                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                            >
                                Profil
                                <svg className={`w-4 h-4 transition-transform duration-300 ${profilDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${profilDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="ml-6 space-y-1 py-1">
                                    {profilLinks.map((link) => (
                                        <Link 
                                            key={link.label}
                                            href={link.href} 
                                            className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                                            onClick={() => {
                                                setProfilDropdownOpen(false);
                                                setMobileMenuOpen(false);
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <Link 
                                href="/login" 
                                className="flex-1 text-center px-4 py-3 text-sm font-semibold border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                className="flex-1 text-center px-4 py-3 text-sm font-semibold bg-primary text-white rounded-xl transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="animate-[fadeInUp_0.5s_ease-out]">
                {children}
            </main>

            <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <ApplicationLogo className="h-8" showText={false} />
                                <h3 className="text-lg font-black text-white">ASRAMA UNDHARI</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Hunian nyaman dan aman untuk mahasiswa Universitas Dharmas Indonesia. Mendukung prestasi akademik dengan lingkungan asrama yang kondusif.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                                Tautan
                            </h4>
                            <ul className="space-y-2.5">
                                {['Ketersediaan Kamar', 'Pengumuman', 'Prosedur Pendaftaran'].map((item, i) => (
                                    <li key={i}>
                                        <a href={`/#${item.toLowerCase().replace(/\s/g, '-')}`} className="text-sm text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group">
                                            <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                                Kontak
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>Kampus UNDHARI, Dharmasraya</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" />
                                    </svg>
                                    <span>(0754) 1234567</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <span>asrama@undhari.ac.id</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <a href="/downloads/aturan-asrama.pdf" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-all duration-200 p-2.5 rounded-xl hover:bg-white/5 group">
                                        <svg className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        Aturan Asrama (PDF)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-10 pt-8 text-center">
                        <p className="text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} Asrama Universitas Dharmas Indonesia (UNDHARI). All rights reserved.
                        </p>
                        <p className="text-xs text-gray-600 mt-2 italic">
                            "Jayalah Undhari — Kampus Unggul Tepercaya & Berasrama"
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}