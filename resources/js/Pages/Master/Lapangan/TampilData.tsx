import FlashMessage from '@/Components/FlashMessage';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { confirmDelete } from '@/lib/confirmDelete';
import { Head, Link } from '@inertiajs/react';

type Lapangan = {
    idLapangan: number;
    namaLapangan: string;
    jenisLapangan: string;
    tarifPerJam: number;
    status: string;
};

export default function TampilData({ datalapangan }: { datalapangan: Lapangan[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Lapangan
                </h2>
            }
        >
            <Head title="Data Lapangan" />

            <FlashMessage />

            <div className="mb-4">
                <Link href="/formlapangan">
                    <Button>Tambah Lapangan</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Jenis</th>
                            <th className="px-4 py-3">Tarif/Jam</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {datalapangan.map((row) => (
                            <tr key={row.idLapangan}>
                                <td className="px-4 py-3">{row.namaLapangan}</td>
                                <td className="px-4 py-3">{row.jenisLapangan}</td>
                                <td className="px-4 py-3">
                                    Rp{row.tarifPerJam.toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-3">{row.status}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/editlapangan/${row.idLapangan}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(`/deletelapangan/${row.idLapangan}`)
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datalapangan.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
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
