export default function SecondaryButton({ 
    className = '', 
    disabled = false, 
    children, 
    variant = 'default',
    iconLeft = null,
    iconRight = null,
    ...props 
}) {
    const variants = {
        default: `
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-700 
            hover:border-gray-400 dark:hover:border-gray-500
            hover:shadow-md
        `,
        outline: `
            bg-transparent 
            border-2 border-primary 
            text-primary 
            hover:bg-primary hover:text-white
            hover:shadow-lg hover:shadow-primary/20
        `,
        ghost: `
            bg-transparent 
            border border-transparent 
            text-gray-600 dark:text-gray-400 
            hover:bg-gray-100 dark:hover:bg-gray-800 
            hover:text-gray-900 dark:hover:text-white
        `,
    };

    const variantClasses = variants[variant] || variants.default;

    return (
        <button
            {...props}
            disabled={disabled}
            aria-disabled={disabled}
            className={`
                inline-flex items-center justify-center gap-2 
                px-5 py-2.5 
                rounded-xl 
                font-semibold text-xs 
                uppercase tracking-wider 
                shadow-sm 
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                active:scale-95
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100
                ${variantClasses}
                ${className}
            `}
        >
            {iconLeft && <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>}
        </button>
    );
}