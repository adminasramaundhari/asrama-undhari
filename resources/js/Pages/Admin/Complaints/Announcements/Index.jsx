import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, announcements }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Pengumuman</h2>}
        >
            <Head title="Manajemen Pengumuman" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-lg font-semibold">Daftar Pengumuman</h3>
                                <Link
                                    href={route('admin.announcements.create')}
                                    className="bg-[#FF2A00] text-white px-4 py-2 rounded hover:bg-[#CC2200]"
                                >
                                    + Buat Pengumuman
                                </Link>
                            </div>
                            <p className="text-gray-500">Halaman pengumuman sedang dalam pengembangan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}