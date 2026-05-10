import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Home({ rooms, announcements, testimonials }) {
    return (
        <LandingLayout>
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Sistem Informasi Asrama Resmi
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-[fadeInUp_0.8s_ease-out]">
                            Hunian Nyaman untuk <span className="text-yellow-300">Prestasi</span> Gemilang
                        </h1>
                        <p className="text-base md:text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out] animation-delay-200">
                            "Jayalah Undhari — Kampus Unggul Tepercaya & Berasrama"
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_0.8s_ease-out] animation-delay-400">
                            <Link 
                                href="/register" 
                                className="px-8 py-3.5 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 active:scale-95 w-full sm:w-auto"
                            >
                                Daftar Sekarang
                            </Link>
                            <a 
                                href="#ketersediaan" 
                                className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
                            >
                                Lihat Kamar
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 100" fill="currentColor" className="text-gray-50 dark:text-gray-950">
                        <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
                    </svg>
                </div>
            </section>

            {/* Ketersediaan Kamar */}
            <section id="ketersediaan" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Ketersediaan Kamar
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Pilih kamar sesuai kebutuhan Anda. Tersedia berbagai tipe dengan fasilitas lengkap.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {rooms && rooms.map((room) => (
                            <div key={room.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden transition-all duration-500 border border-gray-100 dark:border-gray-700">
                                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center overflow-hidden">
                                    {room.image ? (
                                        <img src={`/${room.image}`} alt={`Kamar ${room.room_number}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <svg className="w-20 h-20 text-primary/30 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                            <path d="M3 21h18" />
                                            <rect x="6" y="10" width="12" height="8" rx="1" />
                                        </svg>
                                    )}
                                    <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                                        room.status === 'available' ? 'bg-green-500' : room.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
                                    }`}>
                                        {room.status === 'available' ? 'Tersedia' : room.status === 'occupied' ? 'Terisi' : 'Perbaikan'}
                                    </span>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                            Kamar {room.room_number}
                                        </h3>
                                        <span className="text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-lg">
                                            {room.room_type}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <circle cx="9" cy="7" r="3" />
                                                <circle cx="18" cy="5" r="2.5" />
                                                <path d="M15 11a3.5 3.5 0 013 5" />
                                            </svg>
                                            Kapasitas {room.capacity} orang
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {room.facilities}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div>
                                            <p className="text-2xl font-black text-primary">
                                                Rp {Number(room.price_per_month).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">/bulan</p>
                                        </div>
                                        {room.status === 'available' && (
                                            <Link 
                                                href="/register" 
                                                className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
                                            >
                                                Pesan
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!rooms || rooms.length === 0) && (
                        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                            <svg className="w-20 h-20 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                <path d="M3 21h18" />
                            </svg>
                            <p className="text-lg font-medium">Data kamar belum tersedia</p>
                            <p className="text-sm mt-1">Silakan hubungi admin untuk informasi lebih lanjut</p>
                        </div>
                    )}
                </div>
            </section>

            {/* APA KATA MEREKA - Testimonial */}
            <section className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full text-primary text-sm font-semibold mb-4">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                            Testimonial
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Apa Kata Mereka?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Pengalaman nyata dari penghuni Asrama UNDHARI.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {(testimonials && testimonials.length > 0 ? testimonials : [
                            { name: 'Rina A.', role: 'Mahasiswi FKIP', rating: 5, message: 'Asrama UNDHARI sangat nyaman! Fasilitas lengkap, lingkungan bersih, dan dekat dengan kampus. Saya betah tinggal di sini.' },
                            { name: 'Budi S.', role: 'Mahasiswa Teknik', rating: 5, message: 'Pengelola asrama sangat ramah dan disiplin. Keamanan 24 jam bikin orang tua tenang. Harga terjangkau!' },
                            { name: 'Dewi K.', role: 'Mahasiswi Hukum', rating: 4, message: 'Tinggal di asrama sangat membantu fokus kuliah. Ruang belajar bersama nyaman, wifi kencang.' },
                        ]).map((item, index) => (
                            <div 
                                key={index}
                                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative"
                            >
                                <div className="absolute top-4 right-4 text-primary/10 dark:text-primary/20">
                                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                <div className="flex items-center gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < (item.rating || 5) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5 relative z-10">
                                    "{item.message || item.content}"
                                </p>

                                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-bold text-sm">
                                            {(item.name || 'A')[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.role || item.prodi || 'Penghuni Asrama'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pengumuman Publik */}
            <section id="pengumuman" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Pengumuman Terbaru
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Informasi penting seputar asrama dan kegiatan mahasiswa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {announcements && announcements.length > 0 ? (
                            announcements.slice(0, 4).map((announcement) => (
                                <div 
                                    key={announcement.id} 
                                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
                                >
                                    {announcement.image ? (
                                        <div className="relative h-52 overflow-hidden">
                                            <img 
                                                src={`/${announcement.image}`} 
                                                alt={announcement.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-lg">
                                                <svg className="w-3.5 h-3.5 inline-block mr-1.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                {announcement.published_at?.split('T')[0]}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative h-52 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                            </svg>
                                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-lg">
                                                <svg className="w-3.5 h-3.5 inline-block mr-1.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                {announcement.published_at?.split('T')[0]}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-5 md:p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold text-primary bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                                Pengumuman
                                            </span>
                                            {!announcement.image && (
                                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                                    {announcement.published_at?.split('T')[0]}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                            {announcement.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                                            {announcement.content?.substring(0, 150)}...
                                        </p>

                                        <Link 
                                            href={`/pengumuman/${announcement.id}`} 
                                            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all duration-300 group/link"
                                        >
                                            Baca Selengkapnya
                                            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-16 text-gray-400 dark:text-gray-500">
                                <svg className="w-20 h-20 mx-auto mb-4 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                </svg>
                                <p className="text-lg font-medium">Belum ada pengumuman</p>
                                <p className="text-sm mt-1">Pengumuman akan muncul di sini setelah dipublikasikan</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Prosedur Pendaftaran */}
            <section id="prosedur" className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Prosedur Pendaftaran
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Ikuti langkah mudah untuk menjadi penghuni Asrama UNDHARI.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
                        <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-primary/20" />
                        {[
                            { step: 1, title: 'Registrasi Online', desc: 'Isi formulir pendaftaran online di website kami dengan data lengkap', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <polyline points="17 11 19 13 23 9" />
                                </svg>
                            )},
                            { step: 2, title: 'Verifikasi Data', desc: 'Admin akan memverifikasi kelengkapan data Anda', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12l2 2 4-4" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )},
                            { step: 3, title: 'Pembayaran', desc: 'Lakukan pembayaran sesuai tagihan yang diberikan', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="3" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )},
                            { step: 4, title: 'Check-in', desc: 'Datang ke asrama untuk proses check-in', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
                                    <path d="M3 21h18" />
                                    <rect x="6" y="10" width="12" height="8" rx="1" />
                                </svg>
                            )},
                        ].map((item) => (
                            <div key={item.step} className="text-center relative z-10">
                                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/10 dark:ring-primary/20 relative group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-primary">{item.icon}</div>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                                        {item.step}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Profil Asrama */}
            <section id="profil" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Profil Asrama
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Mengenal lebih dekat Asrama Universitas Dharmas Indonesia.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Identitas', desc: 'Asrama Universitas Dharmas Indonesia (UNDHARI) adalah hunian resmi bagi mahasiswa UNDHARI yang mengutamakan kenyamanan dan keamanan.', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            )},
                            { title: 'Struktur', desc: 'Pengelolaan asrama dilakukan oleh Kepala Asrama, Pembina, dan Pengurus Harian yang profesional.', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                    <path d="M16 3.13a4 4 0 010 7.75" />
                                </svg>
                            )},
                            { title: 'Sejarah', desc: 'Berdiri sejak tahun 2015, Asrama UNDHARI telah melayani ribuan mahasiswa dari berbagai daerah.', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            )},
                            { title: 'Visi & Misi', desc: 'Menjadi asrama unggul yang mendukung prestasi akademik dan pembentukan karakter mahasiswa.', icon: (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            )},
                        ].map((item, i) => (
                            <div key={i} className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500">
                                    <div className="text-primary group-hover:text-white transition-colors duration-500">{item.icon}</div>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PETA LOKASI - Google Maps */}
            <section id="lokasi" className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full text-primary text-sm font-semibold mb-4">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Lokasi Kami
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Peta Lokasi Asrama
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Kunjungi kami di Kampus Universitas Dharmas Indonesia, Dharmasraya, Sumatera Barat.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                            
                            {/* Google Maps iframe — Koordinat UNDHARI */}
                            <div className="relative w-full h-[400px] md:h-[500px]">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.80123456789!2d101.640917!3d-1.058167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDMnMjkuNCLCsDEwMcKwMzgnMjcuMyJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                                    className="absolute inset-0 w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Peta Lokasi Asrama UNDHARI — Universitas Dharmas Indonesia"
                                />
                            </div>

                            {/* Info Lokasi */}
                            <div className="p-6 grid sm:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Alamat</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Kampus UNDHARI, Dharmasraya</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Koordinat</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">-1.058167, 101.643417</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Kontak</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">(0754) 1234567</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Buka di Google Maps */}
                            <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
                                <a 
                                    href="https://www.google.com/maps/@-1.058167,101.643417,829m/data=!3m1!1e3?hl=id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Buka di Google Maps
                                </a>
                                <a 
                                    href="https://www.google.com/maps/dir/?api=1&destination=-1.058167,101.643417"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Petunjuk Arah
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kontak */}
            <section id="kontak" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                            Hubungi Kami
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Punya pertanyaan? Jangan ragu untuk menghubungi kami.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="space-y-6">
                            {[
                                { icon: (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                ), title: 'Alamat', content: 'Kampus Universitas Dharmas Indonesia, Dharmasraya, Sumatera Barat' },
                                { icon: (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                ), title: 'Telepon', content: '(0754) 1234567' },
                                { icon: (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                ), title: 'Email', content: 'asrama@undhari.ac.id' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.content}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Download Aturan
                                </h3>
                                <a href="/downloads/aturan-asrama.pdf" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    PDF Aturan Asrama
                                </a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Kirim Pesan</h3>
                            <form className="space-y-4">
                                <div>
                                    <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Alamat Email" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300" />
                                </div>
                                <div>
                                    <textarea rows={4} placeholder="Tulis pesan Anda..." className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none" />
                                </div>
                                <button type="submit" className="w-full px-6 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95">
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </LandingLayout>
    );
}