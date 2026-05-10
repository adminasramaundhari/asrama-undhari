import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ 
    type = 'text', 
    className = '', 
    isFocused = false, 
    error = '',
    iconLeft = null,
    iconRight = null,
    label = '',
    ...props 
}, ref) {
    const input = ref || useRef();

    useEffect(() => {
        if (isFocused && input.current) {
            input.current.focus();
        }
    }, [isFocused]);

    const baseInputClasses = `
        w-full px-4 py-2.5 
        bg-white dark:bg-gray-900 
        border border-gray-300 dark:border-gray-600 
        text-gray-900 dark:text-gray-100 
        placeholder-gray-400 dark:placeholder-gray-500 
        rounded-xl shadow-sm 
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
        dark:focus:ring-primary/30 dark:focus:border-primary
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800
        ${error ? 'border-red-500 dark:border-red-400 focus:ring-red-500/20 focus:border-red-500 dark:focus:ring-red-400/30 dark:focus:border-red-400' : ''}
        ${iconLeft ? 'pl-11' : ''}
        ${iconRight ? 'pr-11' : ''}
        ${className}
    `;

    // Jika type textarea
    if (type === 'textarea') {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {iconLeft && (
                        <div className="absolute left-3.5 top-3.5 text-gray-400 dark:text-gray-500 pointer-events-none">
                            {iconLeft}
                        </div>
                    )}
                    <textarea
                        {...props}
                        ref={input}
                        rows={props.rows || 4}
                        className={`${baseInputClasses} resize-y min-h-[100px]`}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 animate-[fadeIn_0.2s_ease-out]">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {/* Icon Left */}
                {iconLeft && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none flex items-center">
                        {iconLeft}
                    </div>
                )}

                <input
                    {...props}
                    type={type}
                    className={baseInputClasses}
                    ref={input}
                    aria-invalid={error ? 'true' : undefined}
                />

                {/* Icon Right */}
                {iconRight && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none flex items-center">
                        {iconRight}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 animate-[fadeIn_0.2s_ease-out]">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
});