import FlashMessage from '@/Components/FlashMessage';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
type Penyewa = { idPenyewa: number; namaPenyewa: string };
type Lapangan = { idLapangan: number; namaLapangan: string };
type Admin = { idAdmin: number; namaAdmin: string };

const selectClass =
    'mt-1 flex h-8 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50';

export default function FormEdit({
    databooking,
    datapenyewa,
    datalapangan,
    dataadmin,
}: {
    databooking: Booking;
    datapenyewa: Penyewa[];
    datalapangan: Lapangan[];
    dataadmin: Admin[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        txtid: databooking.idBooking,
        txtpenyewa: String(databooking.idPenyewa),
        txtlapangan: String(databooking.idLapangan),
        txtadmin: databooking.idAdmin ? String(databooking.idAdmin) : '',
        txttanggal: databooking.tanggal,
        txtjammulai: databooking.jamMulai.slice(0, 5),
        txtjamselesai: databooking.jamSelesai.slice(0, 5),
        txttotal: String(databooking.totalBayar),
        txtstatus: databooking.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/updatebooking');
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Booking
                </h2>
            }
        >
            <Head title="Edit Booking" />

            <FlashMessage />

            <form
                onSubmit={submit}
                className="max-w-md space-y-4 rounded-lg bg-white p-6 shadow-sm"
            >
                <div>
                    <Label htmlFor="txtpenyewa">Penyewa</Label>
                    <select
                        id="txtpenyewa"
                        className={selectClass}
                        value={data.txtpenyewa}
                        onChange={(e) => setData('txtpenyewa', e.target.value)}
                    >
                        <option value="">Pilih Penyewa</option>
                        {datapenyewa.map((p) => (
                            <option key={p.idPenyewa} value={p.idPenyewa}>
                                {p.namaPenyewa}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtpenyewa} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtlapangan">Lapangan</Label>
                    <select
                        id="txtlapangan"
                        className={selectClass}
                        value={data.txtlapangan}
                        onChange={(e) => setData('txtlapangan', e.target.value)}
                    >
                        <option value="">Pilih Lapangan</option>
                        {datalapangan.map((l) => (
                            <option key={l.idLapangan} value={l.idLapangan}>
                                {l.namaLapangan}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtlapangan} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtadmin">Admin (opsional)</Label>
                    <select
                        id="txtadmin"
                        className={selectClass}
                        value={data.txtadmin}
                        onChange={(e) => setData('txtadmin', e.target.value)}
                    >
                        <option value="">-</option>
                        {dataadmin.map((a) => (
                            <option key={a.idAdmin} value={a.idAdmin}>
                                {a.namaAdmin}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtadmin} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txttanggal">Tanggal</Label>
                    <Input
                        id="txttanggal"
                        type="date"
                        className="mt-1"
                        value={data.txttanggal}
                        onChange={(e) => setData('txttanggal', e.target.value)}
                    />
                    <InputError message={errors.txttanggal} className="mt-1" />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Label htmlFor="txtjammulai">Jam Mulai</Label>
                        <Input
                            id="txtjammulai"
                            type="time"
                            className="mt-1"
                            value={data.txtjammulai}
                            onChange={(e) => setData('txtjammulai', e.target.value)}
                        />
                        <InputError message={errors.txtjammulai} className="mt-1" />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="txtjamselesai">Jam Selesai</Label>
                        <Input
                            id="txtjamselesai"
                            type="time"
                            className="mt-1"
                            value={data.txtjamselesai}
                            onChange={(e) => setData('txtjamselesai', e.target.value)}
                        />
                        <InputError message={errors.txtjamselesai} className="mt-1" />
                    </div>
                </div>

                <div>
                    <Label htmlFor="txttotal">Total Bayar (Rp)</Label>
                    <Input
                        id="txttotal"
                        type="number"
                        min={0}
                        className="mt-1"
                        value={data.txttotal}
                        onChange={(e) => setData('txttotal', e.target.value)}
                    />
                    <InputError message={errors.txttotal} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtstatus">Status</Label>
                    <select
                        id="txtstatus"
                        className={selectClass}
                        value={data.txtstatus}
                        onChange={(e) => setData('txtstatus', e.target.value)}
                    >
                        <option value="Dipesan">Dipesan</option>
                        <option value="Dibayar">Dibayar</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                    <InputError message={errors.txtstatus} className="mt-1" />
                </div>

                <Button disabled={processing}>Simpan Perubahan</Button>
            </form>
        </AdminLayout>
    );
}
