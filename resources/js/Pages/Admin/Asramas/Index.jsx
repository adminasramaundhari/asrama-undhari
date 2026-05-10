import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, asramas }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAsramas = asramas?.filter(asrama =>
        asrama.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asrama.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asrama.address && asrama.address.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

    const handleDelete = (id, name) => {
        if (confirm(`Hapus asrama "${name}"?`)) {
            router.delete(route('admin.asramas.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Asrama</h2>}
        >
            <Head title="Manajemen Asrama" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 rounded-full bg-purple-500" />
                                <h3 className="text-lg font-bold text-gray-900">Data Asrama</h3>
                                <span className="text-sm text-gray-400">({filteredAsramas.length} asrama)</span>
                            </div>
                            <Link
                                href={route('admin.asramas.create')}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
                            >
                                + Tambah Asrama
                            </Link>
                        </div>

                        <div className="px-6 py-4 border-b border-gray-100">
                            <input
                                type="text"
                                placeholder="Cari asrama (nama, kode, alamat)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                        </div>

                        <div className="p-6">
                            {filteredAsramas.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p>{searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data asrama'}</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Nama Asrama</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Kode</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Alamat</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Total Kamar</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredAsramas.map((asrama) => (
                                                <tr key={asrama.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{asrama.name}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{asrama.code}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500">{asrama.address || '-'}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{asrama.rooms_count || 0} kamar</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <Link href={route('admin.asramas.show', asrama.id)} className="text-green-600 hover:text-green-800 text-sm">Detail</Link>
                                                            <Link href={route('admin.asramas.edit', asrama.id)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</Link>
                                                            <button onClick={() => handleDelete(asrama.id, asrama.name)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}