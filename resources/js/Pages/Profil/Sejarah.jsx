import LandingLayout from '@/Layouts/LandingLayout';
import { Link } from '@inertiajs/react';

export default function Sejarah() {
    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="text-[#FF2A00] hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#FF2A00] mb-6">Sejarah Asrama UNDHARI</h1>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Asrama Universitas Dharmas Indonesia (UNDHARI) didirikan pada tahun 2015 sebagai bentuk komitmen universitas dalam menyediakan hunian yang nyaman dan kondusif bagi mahasiswa.</p>
                            <p>Awalnya, asrama hanya memiliki 1 gedung dengan kapasitas 50 mahasiswa. Seiring perkembangan jumlah mahasiswa, pada tahun 2018 dilakukan penambahan gedung baru.</p>
                            <p>Tahun 2020, asrama direnovasi total dengan penambahan fasilitas modern seperti ruang belajar bersama, musholla, dan area olahraga.</p>
                            <p>Hingga saat ini, Asrama UNDHARI telah melayani lebih dari 2.000 mahasiswa dan terus berkomitmen untuk memberikan pelayanan terbaik.</p>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}