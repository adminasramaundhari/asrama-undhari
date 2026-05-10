import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 30);

        const timer = setTimeout(() => {
            setIsLeaving(true);
            setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, 300);
        }, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [duration, onClose]);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 300);
    };

    if (!isVisible) return null;

    const configs = {
        success: {
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-l-4 border-green-500 dark:border-green-400',
            iconBg: 'bg-green-100 dark:bg-green-900/30',
            iconColor: 'text-green-600 dark:text-green-400',
            progressBg: 'bg-green-500 dark:bg-green-400',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ),
        },
        error: {
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-l-4 border-red-500 dark:border-red-400',
            iconBg: 'bg-red-100 dark:bg-red-900/30',
            iconColor: 'text-red-600 dark:text-red-400',
            progressBg: 'bg-red-500 dark:bg-red-400',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            ),
        },
        info: {
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-l-4 border-blue-500 dark:border-blue-400',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30',
            iconColor: 'text-blue-600 dark:text-blue-400',
            progressBg: 'bg-blue-500 dark:bg-blue-400',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            ),
        },
        warning: {
            bg: 'bg-white dark:bg-gray-800',
            border: 'border-l-4 border-yellow-500 dark:border-yellow-400',
            iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            progressBg: 'bg-yellow-500 dark:bg-yellow-400',
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            ),
        },
    };

    const config = configs[type] || configs.success;

    return (
        <div className={`fixed top-4 right-4 z-[100] transition-all duration-300 ease-out ${
            isLeaving ? 'opacity-0 translate-x-full scale-95' : 'opacity-100 translate-x-0 scale-100'
        }`}>
            <div className={`${config.bg} ${config.border} rounded-2xl shadow-2xl shadow-gray-300/30 dark:shadow-black/40 overflow-hidden min-w-[340px] max-w-md backdrop-blur-sm`}>
                
                {/* Content */}
                <div className="flex items-center gap-3 px-4 py-3.5">
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full ${config.iconBg} ${config.iconColor} flex items-center justify-center flex-shrink-0 animate-[bounceIn_0.5s_ease-out]`}>
                        {config.icon}
                    </div>

                    {/* Message */}
                    <p className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug">
                        {message}
                    </p>

                    {/* Close Button */}
                    <button 
                        onClick={handleClose} 
                        className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 flex-shrink-0"
                        aria-label="Tutup notifikasi"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-100 dark:bg-gray-700">
                    <div 
                        className={`h-full ${config.progressBg} transition-all duration-100 ease-linear rounded-r-full`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}