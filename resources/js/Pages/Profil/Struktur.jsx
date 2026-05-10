import LandingLayout from '@/Layouts/LandingLayout';
import { Link } from '@inertiajs/react';

export default function Struktur() {
    return (
        <LandingLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="text-[#FF2A00] hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#FF2A00] mb-6">Struktur Pengelola Asrama</h1>
                        <div className="space-y-6">
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-lg">Kepala Asrama</h3>
                                <p>Dr. Ahmad Rizki, M.Pd</p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-lg">Pembina Asrama</h3>
                                <p>Drs. Budi Santoso, M.Si<br/>Dra. Siti Aminah, M.Ag</p>
                            </div>
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-lg">Pengurus Harian</h3>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>Ketua: Muhammad Rizki (FILKOM)</li>
                                    <li>Sekretaris: Putri Amelia (FHEB)</li>
                                    <li>Bendahara: Fitri Handayani (FIKES)</li>
                                    <li>Koordinator Keamanan: Andi Saputra (FKIP)</li>
                                    <li>Koordinator Kebersihan: Indah Permata</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}