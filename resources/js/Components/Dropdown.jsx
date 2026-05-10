import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const DropDownContext = createContext();

export const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                open &&
                !triggerRef.current?.contains(event.target) &&
                !contentRef.current?.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (open && event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    return (
        <DropDownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

export const DropdownTrigger = ({ children }) => {
    const { open, setOpen, triggerRef } = useContext(DropDownContext);

    return (
        <button
            ref={triggerRef}
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-lg"
            aria-expanded={open}
            aria-haspopup="true"
        >
            {children}
            <svg className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </button>
    );
};

export const DropdownContent = ({ 
    align = 'right', 
    width = '48', 
    contentClasses = '', 
    children 
}) => {
    const { open, setOpen, contentRef } = useContext(DropDownContext);

    const alignmentClasses = {
        left: 'origin-top-left left-0',
        right: 'origin-top-right right-0',
        center: 'origin-top left-1/2 -translate-x-1/2',
    }[align] || 'origin-top-right right-0';

    const widthClasses = {
        '48': 'w-48',
        '56': 'w-56',
        '64': 'w-64',
        '72': 'w-72',
        'auto': 'w-auto min-w-[200px]',
    }[width] || 'w-48';

    return (
        <Transition show={open}>
            <div
                ref={contentRef}
                className={`absolute z-50 mt-3 ${alignmentClasses} ${widthClasses}`}
                onClick={() => setOpen(false)}
                role="menu"
                aria-orientation="vertical"
            >
                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1.5 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out] ${contentClasses}`}>
                    {children}
                </div>
            </div>
        </Transition>
    );
};

export const DropdownLink = ({ 
    href, 
    method = 'get', 
    as = 'a', 
    icon = null,
    danger = false,
    children 
}) => {
    return (
        <Link
            href={href}
            method={method}
            as={as}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-all duration-150 ease-out hover:translate-x-1 ${
                danger
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            role="menuitem"
        >
            {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
            {children}
        </Link>
    );
};

export const DropdownButton = ({ 
    onClick, 
    icon = null,
    danger = false,
    children 
}) => {
    const { setOpen } = useContext(DropDownContext);

    const handleClick = () => {
        setOpen(false);
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-all duration-150 ease-out hover:translate-x-1 ${
                danger
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            role="menuitem"
        >
            {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
};

export const DropdownDivider = () => {
    return (
        <div className="my-1.5 mx-3 border-t border-gray-100 dark:border-gray-700" role="separator" />
    );
};

// Transition Component
const Transition = ({ show, children }) => {
    const [shouldRender, setShouldRender] = useState(show);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            requestAnimationFrame(() => setAnimating(true));
        } else {
            setAnimating(false);
            const timer = setTimeout(() => setShouldRender(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!shouldRender) return null;

    return (
        <div className={`transition-all duration-200 ease-out ${
            animating 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-1'
        }`}>
            {children}
        </div>
    );
};