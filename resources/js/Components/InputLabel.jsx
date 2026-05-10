export default function InputLabel({ 
    value, 
    className = '', 
    children, 
    required = false,
    hint = '',
    ...props 
}) {
    return (
        <label 
            {...props} 
            className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ${className}`}
        >
            <span className="inline-flex items-center gap-1">
                {value || children}
                {required && (
                    <span className="text-primary ml-0.5" aria-hidden="true">*</span>
                )}
            </span>
            {hint && (
                <span className="block text-xs font-normal text-gray-400 dark:text-gray-500 mt-0.5">
                    {hint}
                </span>
            )}
        </label>
    );
}