import FlashMessage from '@/Components/FlashMessage';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { confirmDelete } from '@/lib/confirmDelete';
import { Head, Link } from '@inertiajs/react';

type Booking = {
    idBooking: number;
    idPenyewa: number;
    idLapangan: number;
    idAdmin: number | null;
    tanggal: string;
    jamMulai: string;
    jamSelesai: string;
    totalBayar: number;
    status: string;
};

export default function TampilData({ databooking }: { databooking: Booking[] }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Booking
                </h2>
            }
        >
            <Head title="Data Booking" />

            <FlashMessage />

            <div className="mb-4">
                <Link href="/formbooking">
                    <Button>Tambah Booking</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">ID Penyewa</th>
                            <th className="px-4 py-3">ID Lapangan</th>
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3">Jam</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {databooking.map((row) => (
                            <tr key={row.idBooking}>
                                <td className="px-4 py-3">{row.idPenyewa}</td>
                                <td className="px-4 py-3">{row.idLapangan}</td>
                                <td className="px-4 py-3">{row.tanggal}</td>
                                <td className="px-4 py-3">
                                    {row.jamMulai.slice(0, 5)}-{row.jamSelesai.slice(0, 5)}
                                </td>
                                <td className="px-4 py-3">
                                    Rp{row.totalBayar.toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-3">{row.status}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/editbooking/${row.idBooking}`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                confirmDelete(`/deletebooking/${row.idBooking}`)
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {databooking.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
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
