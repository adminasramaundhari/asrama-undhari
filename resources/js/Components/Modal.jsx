import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ 
    children, 
    show = false, 
    maxWidth = '2xl', 
    closeable = true, 
    onClose = () => {},
    title = '',
    footer = null,
}) {
    const close = () => {
        if (closeable) onClose();
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        full: 'sm:max-w-[95vw]',
    }[maxWidth] || 'sm:max-w-2xl';

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog 
                as="div" 
                className="fixed inset-0 z-50 overflow-y-auto" 
                onClose={close}
                aria-modal="true"
            >
                <div className="flex min-h-full items-center justify-center px-4 py-6 sm:px-0">
                    
                    <Transition.Child 
                        as={Fragment} 
                        enter="ease-out duration-300" 
                        enterFrom="opacity-0" 
                        enterTo="opacity-100" 
                        leave="ease-in duration-200" 
                        leaveFrom="opacity-100" 
                        leaveTo="opacity-0"
                    >
                        <div 
                            className="fixed inset-0 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm transition-all" 
                            aria-hidden="true"
                        />
                    </Transition.Child>

                    <Transition.Child 
                        as={Fragment} 
                        enter="ease-out duration-300" 
                        enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95" 
                        enterTo="opacity-100 translate-y-0 sm:scale-100" 
                        leave="ease-in duration-200" 
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100" 
                        leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className={`relative w-full transform overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-all ${maxWidthClass}`}>
                            
                            {closeable && (
                                <button
                                    onClick={close}
                                    className="absolute top-3.5 right-3.5 z-10 p-1.5 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    aria-label="Tutup modal"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            )}

                            {title && (
                                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                                    <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white pr-8">
                                        {title}
                                    </Dialog.Title>
                                </div>
                            )}

                            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                                {children}
                            </div>

                            {footer && (
                                <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
                                    {footer}
                                </div>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}