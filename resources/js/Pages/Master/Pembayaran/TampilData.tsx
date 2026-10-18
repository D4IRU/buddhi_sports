import FlashMessage from '@/Components/FlashMessage';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { confirmDelete } from '@/lib/confirmDelete';
import { Head, Link } from '@inertiajs/react';

type Pembayaran = {
    idPembayaran: number;
    idAdmin: number | null;
    idBooking: number;
    tglBayar: string;
    jumlahBayar: number;
    buktiBayar: string | null;
    status: string;
};

export default function TampilData({ datapembayaran }: { datapembayaran: Pembayaran[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Pembayaran
                </h2>
            }
        >
            <Head title="Data Pembayaran" />

            <FlashMessage />

            <div className="mb-4">
                <Link href="/formpembayaran">
                    <Button>Tambah Pembayaran</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">ID Booking</th>
                            <th className="px-4 py-3">Tgl Bayar</th>
                            <th className="px-4 py-3">Jumlah</th>
                            <th className="px-4 py-3">Bukti</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {datapembayaran.map((row) => (
                            <tr key={row.idPembayaran}>
                                <td className="px-4 py-3">{row.idBooking}</td>
                                <td className="px-4 py-3">{row.tglBayar}</td>
                                <td className="px-4 py-3">
                                    Rp{row.jumlahBayar.toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-3">{row.buktiBayar ?? '-'}</td>
                                <td className="px-4 py-3">{row.status}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/editpembayaran/${row.idPembayaran}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(
                                                    `/deletepembayaran/${row.idPembayaran}`,
                                                )
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {datapembayaran.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
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
