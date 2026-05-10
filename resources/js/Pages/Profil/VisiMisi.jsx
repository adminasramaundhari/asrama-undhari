import LandingLayout from '@/Layouts/LandingLayout';
import { Link } from '@inertiajs/react';

export default function VisiMisi() {
    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="text-[#FF2A00] hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#FF2A00] mb-6">Visi & Misi Asrama UNDHARI</h1>
                        
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#FF2A00] mb-3">Visi</h2>
                            <p className="text-gray-700">"Menjadi asrama yang unggul, terpercaya, dan berkarakter dalam mendukung prestasi akademik mahasiswa"</p>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-bold text-[#FF2A00] mb-3">Misi</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Menciptakan lingkungan hunian yang aman, nyaman, dan kondusif untuk belajar.</li>
                                <li>Membangun karakter mahasiswa yang disiplin, bertanggung jawab, dan berakhlak mulia.</li>
                                <li>Menyediakan fasilitas pendukung yang memadai untuk kegiatan akademik dan non-akademik.</li>
                                <li>Mengembangkan program pembinaan dan pengembangan softskill mahasiswa.</li>
                                <li>Menjalin kerjasama dengan berbagai pihak untuk meningkatkan kualitas pelayanan asrama.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}