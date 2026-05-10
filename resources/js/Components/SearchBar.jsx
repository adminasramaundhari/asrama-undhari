import { useState, useRef, useEffect } from 'react';

export default function SearchBar({ user }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    // Clear on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && document.activeElement === inputRef.current) {
                setQuery('');
                inputRef.current.blur();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim().length < 2) return;
        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    };

    const handleClear = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md group">
            <div className={`
                relative flex items-center 
                bg-white dark:bg-gray-800 
                border rounded-xl 
                transition-all duration-300 ease-out
                ${isFocused 
                    ? 'border-primary ring-2 ring-primary/20 dark:ring-primary/30 shadow-lg shadow-primary/5' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 shadow-sm'
                }
            `}>
                {/* Search Icon Left */}
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg 
                        className={`w-4.5 h-4.5 transition-colors duration-300 ${
                            isFocused ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                        }`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Cari kamar, penghuni, pembayaran..."
                    className="w-full pl-10 pr-20 py-2.5 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none rounded-xl"
                />

                {/* Right Actions */}
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                    {/* Clear Button */}
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 animate-[fadeIn_0.15s_ease-out]"
                            aria-label="Hapus pencarian"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}

                    {/* Divider */}
                    <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-0.5" />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={query.trim().length < 2}
                        className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400 group"
                        aria-label="Cari"
                    >
                        <svg 
                            className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Hint */}
            {isFocused && !query && (
                <div className="absolute top-full left-0 right-0 mt-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-xs text-gray-400 dark:text-gray-500 animate-[fadeIn_0.2s_ease-out] z-10">
                    <span className="inline-flex items-center gap-1.5">
                        <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-md font-mono">Esc</kbd>
                        untuk menghapus
                    </span>
                </div>
            )}
        </form>
    );
}