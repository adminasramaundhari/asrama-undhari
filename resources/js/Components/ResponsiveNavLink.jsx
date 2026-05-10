import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ 
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
                block w-full pl-3 pr-4 py-3 
                border-l-[3px] 
                text-left text-sm font-medium 
                rounded-r-xl
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset
                ${active 
                    ? 'border-primary text-primary bg-primary/5 dark:bg-primary/10 font-semibold shadow-[inset_0_1px_3px_rgba(255,42,0,0.05)]' 
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 hover:translate-x-1'
                }
            `}
        >
            <span className="flex items-center gap-3">
                {icon && (
                    <span className={`flex-shrink-0 w-5 h-5 transition-colors duration-300 ${
                        active ? 'text-primary' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600'
                    }`}>
                        {icon}
                    </span>
                )}
                <span>{children}</span>
                
                {/* Active Indicator Dot */}
                {active && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                )}
            </span>
        </Link>
    );
}