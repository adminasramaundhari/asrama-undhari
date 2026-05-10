import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        const isDark = saved === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setMounted(true);
    }, []);

    const toggle = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
        );
    }

    return (
        <button
            onClick={toggle}
            className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md group overflow-hidden"
            aria-label={darkMode ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
        >
            {/* Ikon Matahari */}
            <svg 
                className={`w-5 h-5 text-amber-500 transition-all duration-500 transform ${
                    darkMode ? 'opacity-0 scale-50 rotate-90 absolute' : 'opacity-100 scale-100 rotate-0 relative'
                }`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>

            {/* Ikon Bulan */}
            <svg 
                className={`w-5 h-5 text-indigo-400 transition-all duration-500 transform ${
                    darkMode ? 'opacity-100 scale-100 rotate-0 relative' : 'opacity-0 scale-50 -rotate-90 absolute'
                }`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>

            {/* Glow Effect */}
            <span className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                darkMode 
                    ? 'bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                    : 'bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            }`} />
        </button>
    );
}