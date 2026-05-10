import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import DarkModeToggle from '@/Components/DarkModeToggle';
import SearchBar from '@/Components/SearchBar';
import useFlash from '@/Hooks/useFlash';

export default function AuthenticatedLayout({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    useFlash();
    const [sidebarWidth, setSidebarWidth] = useState('ml-64');

    useEffect(() => {
        const updateMargin = () => {
            const sidebar = document.querySelector('aside');
            if (sidebar) {
                const width = sidebar.offsetWidth;
                setSidebarWidth(width < 200 ? 'ml-[4.5rem]' : 'ml-64');
            } else {
                setSidebarWidth(sidebarOpen ? 'ml-64' : 'ml-20');
            }
        };

        updateMargin();

        const observer = new MutationObserver(updateMargin);
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
        }

        const resizeObserver = new ResizeObserver(updateMargin);
        if (sidebar) resizeObserver.observe(sidebar);

        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
        };
    }, [sidebarOpen]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
            <div className="fixed left-0 top-0 h-full z-30">
                <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>

            <div className={`transition-all duration-400 ease-in-out ${sidebarWidth}`}>
                
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-20">
                    <div className="px-4 sm:px-6 py-3 flex items-center justify-end gap-3 sm:gap-4">
                        <div className="flex-1 max-w-md">
                            <SearchBar user={user} />
                        </div>
                        <div className="flex-shrink-0">
                            <DarkModeToggle />
                        </div>
                    </div>
                </div>

                {header && (
                    <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-6 sm:h-7 rounded-full bg-primary flex-shrink-0" />
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                                {typeof header === 'string' ? header : (header?.props?.children || header)}
                            </h1>
                        </div>
                    </div>
                )}

                <main className="p-4 sm:p-6 lg:p-8 animate-[fadeInUp_0.4s_ease-out]">
                    {children}
                </main>
            </div>
        </div>
    );
}