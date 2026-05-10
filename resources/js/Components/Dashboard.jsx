export default function Dashboard({ 
    title, 
    subtitle = '',
    children,
    actions = null,
}) {
    return (
        <div className="py-6 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                    
                    {(title || actions) ? (
                        <div className="px-5 py-5 sm:px-8 sm:py-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-1.5 h-8 sm:h-10 rounded-full bg-primary flex-shrink-0" />
                                <div className="min-w-0">
                                    {title && (
                                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                                            {title}
                                        </h1>
                                    )}
                                    {subtitle && (
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                            {subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {actions && (
                                <div className="flex items-center gap-2.5 flex-shrink-0">
                                    {actions}
                                </div>
                            )}
                        </div>
                    ) : null}

                    <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100 animate-[fadeInUp_0.4s_ease-out]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}