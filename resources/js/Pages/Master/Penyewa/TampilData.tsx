import FlashMessage from '@/Components/FlashMessage';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { confirmDelete } from '@/lib/confirmDelete';
import { Head, Link } from '@inertiajs/react';

type Penyewa = {
    idPenyewa: number;
    namaPenyewa: string;
    noHp: string;
    email: string;
};

export default function TampilData({ datapenyewa }: { datapenyewa: Penyewa[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Penyewa
                </h2>
            }
        >
            <Head title="Data Penyewa" />

            <FlashMessage />

            <div className="mb-4">
                <Link href="/formpenyewa">
                    <Button>Tambah Penyewa</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">No HP</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {datapenyewa.map((row) => (
                            <tr key={row.idPenyewa}>
                                <td className="px-4 py-3">{row.namaPenyewa}</td>
                                <td className="px-4 py-3">{row.noHp}</td>
                                <td className="px-4 py-3">{row.email}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/editpenyewa/${row.idPenyewa}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(`/deletepenyewa/${row.idPenyewa}`)
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datapenyewa.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
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
