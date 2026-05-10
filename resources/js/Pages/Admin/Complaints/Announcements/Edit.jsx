import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, announcement }) {
    const { data, setData, put, processing } = useForm({
        title: announcement.title,
        content: announcement.content,
        target: announcement.target,
        is_active: announcement.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.announcements.update', announcement.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Pengumuman</h2>}
        >
            <Head title="Edit Pengumuman" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Judul</label>
                                    <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Target</label>
                                    <select value={data.target} onChange={(e) => setData('target', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                        <option value="all">Semua User</option>
                                        <option value="mahasiswa">Mahasiswa</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Konten</label>
                                    <textarea value={data.content} onChange={(e) => setData('content', e.target.value)} rows={8} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>

                                <div className="flex items-center">
                                    <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 text-[#FF2A00]" />
                                    <label className="ml-2 text-sm text-gray-700">Aktifkan pengumuman</label>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <Link href={route('admin.announcements.index')} className="px-4 py-2 bg-gray-500 text-white rounded">Batal</Link>
                                    <button type="submit" disabled={processing} className="px-4 py-2 bg-[#FF2A00] text-white rounded">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}