import { Link } from '@inertiajs/react';

export default function NavLink({ 
    href, 
    active = false, 
    children, 
    icon = null,
    ...props 
}) {
    return (
        <Link 
            href={href} 
            {...props}
            aria-current={active ? 'page' : undefined}
            className={`
                inline-flex items-center gap-2
                px-1 pt-1 pb-1.5 
                border-b-2 
                text-sm font-medium leading-5 
                transition-all duration-300 ease-out 
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm
                ${active 
                    ? 'border-primary text-gray-900 dark:text-white font-semibold' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }
            `}
        >
            <>
                {icon && (
                    <span className={`flex-shrink-0 w-4 h-4 transition-colors duration-300 ${
                        active ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                        {icon}
                    </span>
                )}
                {children}
            </>
        </Link>
    );
}