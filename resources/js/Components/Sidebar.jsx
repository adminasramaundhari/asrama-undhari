import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Sidebar({ user, sidebarOpen, setSidebarOpen }) {
    const { url } = usePage();

    const isActive = (path) => {
        return url.startsWith(path) 
            ? 'bg-primary text-white shadow-lg shadow-primary/25 font-semibold' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1';
    };

    const handleLogout = () => {
        window.location.href = '/logout';
    };

    const menuIcons = {
        '📊': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
        '🏠': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                <path d="M3 21h18" />
                <rect x="6" y="10" width="12" height="8" rx="1" />
                <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
        ),
        '👥': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="7" r="3" />
                <circle cx="18" cy="5" r="2.5" />
                <circle cx="12" cy="17" r="3" />
                <path d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                <path d="M15 11a3.5 3.5 0 013 5" />
            </svg>
        ),
        '💰': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <circle cx="12" cy="12" r="3" />
                <line x1="3" y1="9" x2="6" y2="9" />
                <line x1="3" y1="15" x2="6" y2="15" />
                <line x1="18" y1="9" x2="21" y2="9" />
                <line x1="18" y1="15" x2="21" y2="15" />
            </svg>
        ),
        '📢': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21c-1.5 0-3-.5-4-1.5-2.5 1-4.5.5-6-1 1.5-2 1-4.5-.5-6.5C.5 10 2.5 7.5 4 6c-1-2.5-.5-4.5 1-6 2 1.5 4.5 1 6.5-.5C13.5.5 16 2.5 17.5 4c2.5-1 4.5-.5 6 1-1.5 2-1 4.5.5 6.5 2 1.5 0 4.5-1.5 6 1 2.5.5 4.5-1 6-2-1.5-4.5-1-6.5.5-1.5 1-3.5 1-5 0z" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        '📰': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="11" x2="13" y2="11" />
                <line x1="9" y1="15" x2="11" y2="15" />
            </svg>
        ),
        '🔔': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
                <circle cx="18" cy="3" r="3" fill="currentColor" stroke="none" opacity="0.3" />
            </svg>
        ),
        '✅': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12l3 3 5-5" />
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a3 3 0 00-3 3" />
            </svg>
        ),
        '🖼️': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
        '📋': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <line x1="8" y1="8" x2="16" y2="8" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="12" y2="16" />
            </svg>
        ),
        '📄': (
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="12" y2="17" />
            </svg>
        ),
    };

    const adminMenus = [
        { name: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
        { name: 'Verifikasi Akun', icon: '✅', path: '/admin/verifikasi' },
        { name: 'Penghuni', icon: '👥', path: '/admin/penghuni' },
        { name: 'Kamar', icon: '🏠', path: '/admin/rooms' },
        { name: 'Pembayaran', icon: '💰', path: '/admin/payments' },
        { name: 'Pengumuman', icon: '📰', path: '/admin/announcements' },
        { name: 'Survey', icon: '📋', path: '/admin/surveys' },
        { name: 'Galeri', icon: '🖼️', path: '/admin/gallery' },
        { name: 'Pengaduan', icon: '📢', path: '/admin/complaints' },
        { name: 'Notifikasi', icon: '🔔', path: '/admin/notifications' },
        { name: 'Laporan', icon: '📄', path: '/admin/laporan' },
    ];

    const mahasiswaMenus = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Tagihan', icon: '💰', path: '/mahasiswa/payments' },
        { name: 'Pengaduan', icon: '📢', path: '/mahasiswa/complaints' },
        { name: 'Survey', icon: '📋', path: '/mahasiswa/surveys' },
        { name: 'Pengumuman', icon: '📰', path: '/mahasiswa/announcements' },
        { name: 'Notifikasi', icon: '🔔', path: '/mahasiswa/notifications' },
        { name: 'Galeri', icon: '🖼️', path: '/mahasiswa/galeri' },
    ];

    const menus = user?.role === 'admin' ? adminMenus : mahasiswaMenus;

    return (
        <aside className={`bg-white dark:bg-gray-900 shadow-xl border-r border-gray-100 dark:border-gray-800 h-screen flex flex-col transition-all duration-400 ease-in-out scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 ${sidebarOpen ? 'w-64' : 'w-[4.5rem]'}`}>
            
            {/* Logo & Collapse Toggle */}
            <div className={`p-4 border-b border-gray-100 dark:border-gray-800 flex items-center flex-shrink-0 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
                {sidebarOpen && (
                    <div className="flex items-center gap-2.5 animate-[fadeIn_0.3s_ease-out]">
                        <ApplicationLogo className="h-10" showText={false} />
                        <div className="leading-tight">
                            <h1 className="text-sm font-black text-gray-900 dark:text-white tracking-tight">ASRAMA</h1>
                            <p className="text-[12px] font-bold text-primary tracking-widest uppercase">UNDHARI</p>
                        </div>
                    </div>
                )}
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                    <svg className={`w-4 h-4 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Menu Navigasi */}
            <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto">
                {menus.map((menu) => (
                    <Link
                        key={menu.path}
                        href={menu.path}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 ease-out group relative ${isActive(menu.path)} ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                    >
                        <span>{menuIcons[menu.icon]}</span>
                        {sidebarOpen && <span className="text-[13px] tracking-wide">{menu.name}</span>}
                        
                        {!sidebarOpen && (
                            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg pointer-events-none">
                                {menu.name}
                            </div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Profile & Logout */}
            <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-800 p-3 space-y-1.5">
                
                <Link
                    href="/profile"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 group relative ${!sidebarOpen ? 'justify-center' : ''}`}
                    title={!sidebarOpen ? 'Profile' : ''}
                >
                    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs ring-2 ring-primary/20 flex-shrink-0 group-hover:ring-primary/40 transition-all duration-300">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    {sidebarOpen && (
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Lihat Profile</p>
                        </div>
                    )}
                    {!sidebarOpen && (
                        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg pointer-events-none">
                            Profile
                        </div>
                    )}
                </Link>

                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group relative ${!sidebarOpen ? 'justify-center' : ''}`}
                >
                    <svg className="w-5 h-5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    {sidebarOpen && <span className="text-[13px] font-medium">Logout</span>}
                    
                    {!sidebarOpen && (
                        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg pointer-events-none">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}