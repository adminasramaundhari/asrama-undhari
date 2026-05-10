import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PieChart from '@/Components/PieChart';
import DonutChart from '@/Components/DonutChart';

export default function Dashboard({ auth, title, role, stats, okupansiData, paymentStatusData, user, tagihan, recentActivities = [], notifications = [] }) {
    const [loading, setLoading] = useState(true);
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [animatedStats, setAnimatedStats] = useState({});
    const [confetti, setConfetti] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Selamat Pagi');
        else if (hour < 15) setGreeting('Selamat Siang');
        else if (hour < 18) setGreeting('Selamat Sore');
        else setGreeting('Selamat Malam');
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setCurrentDate(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
        const t = setInterval(() => setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

    useEffect(() => {
        if (!loading && stats) {
            const targets = {
                okupansi: stats.total_kamar ? Math.round((stats.total_mahasiswa / stats.total_kamar) * 100) : 0,
                mahasiswa: stats.total_mahasiswa || 0,
                kamar: stats.total_kamar || 0,
                pembayaran: stats.total_pembayaran || 0,
                pengaduan: stats.total_pengaduan || 0,
                pendapatan: (stats.total_pembayaran || 0) * 500000,
            };
            const steps = 12;
            let step = 0;
            const timer = setInterval(() => {
                step++;
                const e = 1 - Math.pow(1 - step / steps, 3);
                setAnimatedStats({
                    okupansi: Math.round(targets.okupansi * e),
                    mahasiswa: Math.round(targets.mahasiswa * e),
                    kamar: Math.round(targets.kamar * e),
                    pembayaran: Math.round(targets.pembayaran * e),
                    pengaduan: Math.round(targets.pengaduan * e),
                    pendapatan: Math.round(targets.pendapatan * e),
                });
                if (step >= steps) { clearInterval(timer); setAnimatedStats(targets); }
            }, 40);
            return () => clearInterval(timer);
        }
    }, [loading, stats]);

    useEffect(() => {
        if (animatedStats.okupansi >= 90) { setConfetti(true); setTimeout(() => setConfetti(false), 3000); }
    }, [animatedStats.okupansi]);

    const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
    const quotes = [
        { text: "Kesuksesan adalah hasil dari kerja keras, doa, dan konsistensi.", author: "Admin UNDHARI" },
        { text: "Asrama bukan hanya tempat tinggal, tapi rumah kedua untuk berprestasi.", author: "Kepala Asrama" },
        { text: "Disiplin adalah jembatan antara tujuan dan pencapaian.", author: "Pembina Asrama" },
        { text: "Jayalah Undhari — Kampus Unggul Tepercaya & Berasrama.", author: "Slogan UNDHARI" },
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    if (loading) {
        return (
            <AuthenticatedLayout user={auth.user} header={null}>
                <Head title={title} />
                <div className="p-4 space-y-4 animate-pulse">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5"><div className="flex gap-4"><div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl"/><div className="flex-1"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"/><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"/></div></div></div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // ==================== ADMIN DASHBOARD ====================
    if (role === 'admin') {
        const adminMenus = [
            { label: 'Tagihan', href: '/admin/payments/create', badge: null, color: 'from-emerald-500 to-green-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
            { label: 'Aduan', href: '/admin/complaints', badge: stats?.total_pengaduan, color: 'from-amber-400 to-orange-500', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/></svg> },
            { label: 'Umumkan', href: '/admin/announcements/create', badge: null, color: 'from-blue-500 to-indigo-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/></svg> },
            { label: 'Verif', href: '/admin/verifikasi', badge: stats?.pending_verifikasi, color: 'from-rose-500 to-red-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg> },
            { label: 'Survey', href: '/admin/surveys/create', badge: null, color: 'from-teal-500 to-cyan-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="8" y1="8" x2="16" y2="8"/></svg> },
            { label: 'Galeri', href: '/admin/gallery/create', badge: null, color: 'from-purple-500 to-violet-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/></svg> },
            { label: 'Laporan', href: '/admin/laporan', badge: null, color: 'from-gray-700 to-gray-900', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg> },
            { label: 'Notif', href: '/admin/notifications/create', badge: null, color: 'from-pink-500 to-rose-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18"/></svg> },
        ];

        return (
            <AuthenticatedLayout user={auth.user} header={null}>
                <Head title={title} />
                {confetti && <div className="fixed inset-0 pointer-events-none z-50">{[...Array(50)].map((_, i) => <div key={i} className="absolute animate-[confetti_3s_ease-out_forwards]" style={{left:`${Math.random()*100}%`,top:'-5%',width:'10px',height:'10px',backgroundColor:['#FF2A00','#FFD700','#00FF00','#0080FF','#FF00FF'][Math.floor(Math.random()*5)],borderRadius:Math.random()>0.5?'50%':'0',animationDelay:`${Math.random()*0.5}s`,transform:`rotate(${Math.random()*360}deg)`}}/>)}</div>}
                
                <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto">
                    
                    {/* HEADER ADMIN */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center text-xl font-black">{auth.user?.name?.charAt(0)?.toUpperCase() || 'A'}</div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{greeting},</p>
                                <h1 className="text-base font-black text-gray-900 dark:text-white">{auth.user?.name}</h1>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500">Admin Asrama • {currentTime} WIB</p>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right">
                            <p className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">{currentTime}</p>
                            <p className="text-[10px] text-gray-400">{currentDate}</p>
                        </div>
                    </div>

                    {/* Alert Verifikasi */}
                    {stats?.pending_verifikasi > 0 && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 flex items-center gap-3">
                            <span>⚠️</span>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 flex-1">Ada <span className="font-black">{stats.pending_verifikasi}</span> akun menunggu verifikasi!</p>
                            <Link href="/admin/verifikasi" className="text-xs font-bold text-yellow-700 dark:text-yellow-400 hover:underline">Verifikasi →</Link>
                        </div>
                    )}

                    {/* 6 Stat Cards Admin */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { label: 'Mahasiswa', value: animatedStats.mahasiswa, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="3"/><circle cx="18" cy="5" r="2.5"/></svg>, color: 'bg-primary' },
                            { label: 'Kamar', value: animatedStats.kamar, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16"/></svg>, color: 'bg-blue-500' },
                            { label: 'Bayar', value: animatedStats.pembayaran, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/></svg>, color: 'bg-green-500' },
                            { label: 'Aduan', value: animatedStats.pengaduan, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/></svg>, color: 'bg-yellow-500' },
                            { label: 'Okupansi', value: `${animatedStats.okupansi || 0}%`, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 11-18 0"/></svg>, color: 'bg-purple-500' },
                            { label: 'Pendapatan', value: formatRupiah(animatedStats.pendapatan || 0), icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5"/></svg>, color: 'bg-teal-500' },
                        ].map((card, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                                <div className="flex items-center gap-2 mb-2"><div className={`w-7 h-7 rounded-lg ${card.color} text-white flex items-center justify-center`}>{card.icon}</div></div>
                                <p className="text-lg font-black text-gray-900 dark:text-white truncate">{card.value}</p>
                                <p className="text-[10px] text-gray-400 uppercase">{card.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Menu Cepat Admin */}
                    <div>
                        <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 ml-1">Menu Cepat</h3>
                        <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                            {adminMenus.map((menu, i) => (
                                <a key={i} href={menu.href} className="group relative bg-white dark:bg-gray-800 rounded-xl p-2.5 shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center">
                                    <div className={`w-9 h-9 mx-auto mb-1.5 rounded-lg bg-gradient-to-br ${menu.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>{menu.icon}</div>
                                    <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{menu.label}</p>
                                    {menu.badge > 0 && <span className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[9px] font-black shadow">{menu.badge}</span>}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Charts + Info Admin */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-3 space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"><h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">OKUPANSI KAMAR</h3><div className="h-56"><PieChart title="" labels={okupansiData?.labels || []} data={okupansiData?.data || []} /></div></div>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"><h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">STATUS PEMBAYARAN</h3><div className="h-56"><DonutChart title="" labels={paymentStatusData?.labels || []} data={paymentStatusData?.data || []} /></div></div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">AKTIVITAS TERBARU</h3>
                                <div className="space-y-2">
                                    {recentActivities.length > 0 ? recentActivities.slice(0, 5).map((act, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm"><span className={`w-2 h-2 rounded-full ${['bg-green-500','bg-yellow-500','bg-blue-500','bg-purple-500','bg-red-500'][i]||'bg-gray-400'}`}/><span className="text-gray-700 dark:text-gray-300 flex-1 truncate">{act.title||act.message}</span><span className="text-xs text-gray-400">{act.time||act.created_at}</span></div>
                                    )) : <p className="text-sm text-gray-400">Belum ada aktivitas</p>}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"><h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Notifikasi</h3><div className="space-y-2.5 max-h-[200px] overflow-y-auto">{notifications.length>0?notifications.slice(0,5).map((n,i)=><div key={i} className="flex items-start gap-2"><span className={`w-2 h-2 rounded-full mt-1.5 ${n.is_read?'bg-gray-300':'bg-primary animate-pulse'}`}/><div className="min-w-0"><p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1 font-medium">{n.title}</p><p className="text-[10px] text-gray-400 line-clamp-1">{n.message}</p></div></div>):<p className="text-xs text-gray-400">Tidak ada notifikasi</p>}</div></div>
                            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-white shadow-lg"><h3 className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-3">Info Sistem</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-white/70">Versi</span><span className="font-black">v2.4.0</span></div><div className="flex justify-between"><span className="text-white/70">Status</span><span className="font-black text-green-300 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"/>Online</span></div></div></div>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"><h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">💬 Quote</h3><p className="text-xs text-gray-600 dark:text-gray-400 italic">"{randomQuote.text}"</p><p className="text-[10px] text-gray-400 mt-2">— {randomQuote.author}</p></div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // ==================== MAHASISWA DASHBOARD ====================
    const mhsMenus = [
        { label: 'Tagihan', href: '/mahasiswa/payments', color: 'from-primary to-primary/80', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="12" cy="12" r="3"/></svg> },
        { label: 'Aduan', href: '/mahasiswa/complaints/create', color: 'from-amber-400 to-orange-500', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
        { label: 'Info', href: '/mahasiswa/announcements', color: 'from-blue-500 to-indigo-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/></svg> },
        { label: 'Galeri', href: '/mahasiswa/galeri', color: 'from-purple-500 to-violet-600', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/></svg> },
    ];

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title={title} />
            <div className="p-3 sm:p-5 space-y-4 max-w-[1600px] mx-auto">
                
                {/* HEADER MAHASISWA */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center text-xl font-black flex-shrink-0">{user?.name?.charAt(0)?.toUpperCase() || 'M'}</div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{greeting},</p>
                            <h1 className="text-base font-black text-gray-900 dark:text-white">{user?.name}</h1>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500">{user?.nim || 'NIM'} • {user?.prodi || 'Prodi'} • {currentTime}</p>
                        </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${user?.is_verified ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {user?.is_verified ? '✓ Aktif' : '⏳ Pending'}
                    </span>
                </div>

                {/* Menu Cepat Mahasiswa */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 ml-1">Menu Cepat</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {mhsMenus.map((menu, i) => (
                            <a key={i} href={menu.href} className="group relative bg-white dark:bg-gray-800 rounded-xl p-2.5 shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center">
                                <div className={`w-9 h-9 mx-auto mb-1.5 rounded-lg bg-gradient-to-br ${menu.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>{menu.icon}</div>
                                <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{menu.label}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Informasi Pribadi + Kamar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">INFORMASI PRIBADI</h3>
                        <div className="space-y-2 text-sm">
                            {[
                                { l: 'Nama', v: user?.name },
                                { l: 'NIM', v: user?.nim || '-' },
                                { l: 'Email', v: user?.email || '-' },
                                { l: 'Fakultas', v: user?.faculty || '-' },
                                { l: 'Prodi', v: user?.prodi || '-' },
                                { l: 'Telepon', v: user?.phone || '-' },
                                { l: 'Status', v: user?.is_verified ? '✅ Terverifikasi' : '⏳ Menunggu Verifikasi' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between"><span className="text-gray-400">{item.l}</span><span className="font-medium text-gray-900 dark:text-white">{item.v}</span></div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">INFORMASI KAMAR</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">Kamar</span><span className="font-bold text-gray-900 dark:text-white">{user?.active_room?.room?.room_number || 'Belum assign'}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Tipe</span><span className="font-medium text-gray-900 dark:text-white">{user?.active_room?.room?.room_type || '-'}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Kapasitas</span><span className="font-medium text-gray-900 dark:text-white">{user?.active_room?.room?.capacity || 0} orang</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Check-in</span><span className="font-medium text-gray-900 dark:text-white">{user?.active_room?.check_in_date?.split('T')[0] || '-'}</span></div>
                        </div>
                    </div>
                </div>

                {/* Tagihan + Notifikasi Mahasiswa */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">STATUS TAGIHAN</h3>
                            <Link href="/mahasiswa/payments" className="text-xs font-semibold text-primary hover:underline">Lihat Semua →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead><tr className="border-b border-gray-200 dark:border-gray-700 text-left">{['No','Invoice','Jumlah','Jatuh Tempo','Status','Aksi'].map(th=><th key={th} className="pb-2 text-[10px] text-gray-400 uppercase font-bold">{th}</th>)}</tr></thead>
                                <tbody>
                                    {tagihan && tagihan.length > 0 ? tagihan.slice(0, 3).map((t, i) => (
                                        <tr key={t.id} className="border-b border-gray-100 dark:border-gray-700">
                                            <td className="py-2 text-xs">{i+1}</td>
                                            <td className="py-2 text-xs font-medium">{t.invoice_number || `INV00${i+1}`}</td>
                                            <td className="py-2 text-xs">Rp {Number(t.amount || 500000).toLocaleString()}</td>
                                            <td className="py-2 text-xs">{t.due_date?.split('T')[0] || '-'}</td>
                                            <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.status==='success'||t.status==='lunas'?'bg-green-100 text-green-700':t.status==='pending'?'bg-yellow-100 text-yellow-700':'bg-gray-100 text-gray-600'}`}>{t.status==='success'||t.status==='lunas'?'✅ Lunas':t.status==='pending'?'🟡 Pending':'⏳ Menunggu'}</span></td>
                                            <td className="py-2"><Link href={`/mahasiswa/payments/${t.id}`} className="text-primary font-semibold text-[10px] hover:underline">Detail</Link>{(t.status!=='success'&&t.status!=='lunas')&&<Link href={`/mahasiswa/payments/${t.id}`} className="ml-2 text-blue-500 font-semibold text-[10px] hover:underline">Bayar</Link>}</td>
                                        </tr>
                                    )) : <tr><td colSpan="6" className="py-6 text-center text-xs text-gray-400">Belum ada tagihan</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">PENGUMUMAN TERBARU</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm"><span>📢</span><span className="text-gray-700 dark:text-gray-300">Pemberitahuan Libur Semester</span><span className="text-xs text-gray-400 ml-auto">20 Des 2025</span></div>
                                <div className="flex items-center gap-2 text-sm"><span>✅</span><span className="text-gray-700 dark:text-gray-300">Jadwal Pemeliharaan Kamar</span><span className="text-xs text-gray-400 ml-auto">15 Jan 2026</span></div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">💬 Quote Hari Ini</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{randomQuote.text}"</p>
                            <p className="text-[10px] text-gray-400 mt-2">— {randomQuote.author}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}