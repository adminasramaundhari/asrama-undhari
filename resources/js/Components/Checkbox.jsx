import { forwardRef } from 'react';

export default forwardRef(function Checkbox({ 
    className = '', 
    label = '',
    error = '',
    ...props 
}, ref) {
    return (
        <div className="flex items-start gap-3">
            <div className="relative flex items-center">
                <input
                    ref={ref}
                    type="checkbox"
                    className={`
                        peer w-4.5 h-4.5 
                        rounded-md 
                        border-2 border-gray-300 dark:border-gray-600 
                        text-primary 
                        bg-white dark:bg-gray-800
                        focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:border-primary
                        disabled:opacity-40 disabled:cursor-not-allowed
                        cursor-pointer
                        transition-all duration-200
                        ${error ? 'border-red-500 dark:border-red-400 focus:ring-red-500/30' : ''}
                        ${className}
                    `}
                    {...props}
                />
                {/* Custom Check Icon */}
                <svg 
                    className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-all duration-200 scale-0 peer-checked:scale-100"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>

            {label && (
                <label className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none pt-0.5">
                    {label}
                </label>
            )}

            {error && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{error}</p>
            )}
        </div>
    );
});