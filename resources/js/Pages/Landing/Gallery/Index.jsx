import LandingLayout from '@/Layouts/LandingLayout';
import { Head } from '@inertiajs/react';

export default function Index({ galleries }) {
    return (
        <LandingLayout>
            <Head title="Galeri Asrama UNDHARI" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Galeri Asrama UNDHARI</h1>
                
                {!galleries || galleries.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada foto galeri</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {galleries.map((g) => (
                            <div key={g.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                <img src={`/${g.image}`} alt={g.title} className="w-full h-56 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{g.title}</h3>
                                    <p className="text-sm text-gray-500">{g.category}</p>
                                    <p className="text-sm text-gray-600 mt-1">{g.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </LandingLayout>
    );
}