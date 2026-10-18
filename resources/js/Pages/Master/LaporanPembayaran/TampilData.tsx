import FlashMessage from '@/Components/FlashMessage';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { confirmDelete } from '@/lib/confirmDelete';
import { Head, Link } from '@inertiajs/react';

type Laporan = {
    idLaporan: number;
    idAdmin: number;
    idManager: number;
    bulan: number;
    tahun: number;
    totalPemasukan: number;
    tglLaporan: string;
    idPembayaran: number | null;
};

export default function TampilData({ datalaporan }: { datalaporan: Laporan[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Laporan Pembayaran
                </h2>
            }
        >
            <Head title="Data Laporan Pembayaran" />

            <FlashMessage />

            <div className="mb-4">
                <Link href="/formlaporanpembayaran">
                    <Button>Tambah Laporan</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Bulan</th>
                            <th className="px-4 py-3">Tahun</th>
                            <th className="px-4 py-3">Total Pemasukan</th>
                            <th className="px-4 py-3">Tgl Laporan</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {datalaporan.map((row) => (
                            <tr key={row.idLaporan}>
                                <td className="px-4 py-3">{row.bulan}</td>
                                <td className="px-4 py-3">{row.tahun}</td>
                                <td className="px-4 py-3">
                                    Rp{row.totalPemasukan.toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-3">{row.tglLaporan}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/editlaporanpembayaran/${row.idLaporan}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(
                                                    `/deletelaporanpembayaran/${row.idLaporan}`,
                                                )
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datalaporan.length === 0 && (
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
