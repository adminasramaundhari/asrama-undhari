import LandingLayout from '@/Layouts/LandingLayout';
import { Link } from '@inertiajs/react';

export default function Identitas() {
    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="text-[#FF2A00] hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#FF2A00] mb-6">Identitas Asrama UNDHARI</h1>
                        <div className="space-y-4 text-gray-700">
                            <p><strong>Nama Asrama:</strong> Asrama Universitas Dharmas Indonesia (UNDHARI)</p>
                            <p><strong>Alamat:</strong> Kampus Universitas Dharmas Indonesia, Dharmasraya, Sumatera Barat</p>
                            <p><strong>Tahun Berdiri:</strong> 2015</p>
                            <p><strong>Kapasitas:</strong> 200+ mahasiswa</p>
                            <p><strong>Luas Area:</strong> 2.500 m²</p>
                            <p><strong>Status:</strong> Asrama Resmi UNDHARI</p>
                            <p><strong>Akreditasi:</strong> Terakreditasi B</p>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}