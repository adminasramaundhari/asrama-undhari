export default function InputError({ message, className = '' }) {
    if (!message) return null;

    return (
        <p className={`mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 animate-[fadeIn_0.2s_ease-out] ${className}`}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {message}
        </p>
    );
}