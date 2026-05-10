import { forwardRef } from 'react';

const LoadingSpinner = () => (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

export default forwardRef(function PrimaryButton({ 
    className = '', 
    disabled = false, 
    loading = false,
    children, 
    variant = 'solid',
    iconLeft = null,
    iconRight = null,
    size = 'md',
    ...props 
}, ref) {
    
    const variants = {
        solid: `
            bg-primary hover:bg-primary/90 active:bg-primary/80
            text-white 
            border border-transparent
            shadow-md shadow-primary/20 
            hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
        `,
        light: `
            bg-primary/10 hover:bg-primary/20 active:bg-primary/25
            text-primary 
            border border-primary/20
            hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5
        `,
    };

    const sizes = {
        sm: 'px-3.5 py-2 text-xs gap-1.5 rounded-lg',
        md: 'px-5 py-2.5 text-xs gap-2 rounded-xl',
        lg: 'px-6 py-3 text-sm gap-2.5 rounded-xl',
    };

    const variantClasses = variants[variant] || variants.solid;
    const sizeClasses = sizes[size] || sizes.md;

    return (
        <button
            {...props}
            ref={ref}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            className={`
                inline-flex items-center justify-center 
                ${sizeClasses}
                font-semibold uppercase tracking-wider
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:active:scale-100
                ${variantClasses}
                ${className}
            `}
        >
            {loading ? (
                <>
                    <LoadingSpinner />
                    <span>{children || 'Loading...'}</span>
                </>
            ) : (
                <>
                    {iconLeft && <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>}
                    {children}
                    {iconRight && <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>}
                </>
            )}
        </button>
    );
});