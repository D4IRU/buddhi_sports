import FlashMessage from '@/Components/FlashMessage';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { confirmDelete } from '@/lib/confirmDelete';
import { Head, Link } from '@inertiajs/react';

type Manager = {
    idManager: number;
    namaManager: string;
    username: string;
};

export default function TampilData({ datamanager }: { datamanager: Manager[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Manager
                </h2>
            }
        >
            <Head title="Data Manager" />

            <FlashMessage />

            <div className="mb-4">
                <Link href="/formmanager">
                    <Button>Tambah Manager</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {datamanager.map((row) => (
                            <tr key={row.idManager}>
                                <td className="px-4 py-3">{row.namaManager}</td>
                                <td className="px-4 py-3">{row.username}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/editmanager/${row.idManager}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(`/deletemanager/${row.idManager}`)
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datamanager.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
                                    Belum ada data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
