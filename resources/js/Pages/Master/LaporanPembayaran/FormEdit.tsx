import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
type Admin = { idAdmin: number; namaAdmin: string };
type Manager = { idManager: number; namaManager: string };
type Pembayaran = { idPembayaran: number; jumlahBayar: number };

const selectClass =
    'mt-1 flex h-10 w-full rounded-lg border border-gray-200 bg-background px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50';

export default function FormEdit({
    datalaporan,
    dataadmin,
    datamanager,
    datapembayaran,
}: {
    datalaporan: Laporan;
    dataadmin: Admin[];
    datamanager: Manager[];
    datapembayaran: Pembayaran[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        txtid: datalaporan.idLaporan,
        txtadmin: String(datalaporan.idAdmin),
        txtmanager: String(datalaporan.idManager),
        txtbulan: String(datalaporan.bulan),
        txttahun: String(datalaporan.tahun),
        txttotal: String(datalaporan.totalPemasukan),
        txttgllaporan: datalaporan.tglLaporan,
        txtpembayaran: datalaporan.idPembayaran ? String(datalaporan.idPembayaran) : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/updatelaporanpembayaran');
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Laporan Pembayaran
                </h2>
            }
        >
            <Head title="Edit Laporan Pembayaran" />

            <form
                onSubmit={submit}
                className="max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <Label htmlFor="txtadmin">Admin</Label>
                    <select
                        id="txtadmin"
                        className={selectClass}
                        value={data.txtadmin}
                        onChange={(e) => setData('txtadmin', e.target.value)}
                    >
                        <option value="">Pilih Admin</option>
                        {dataadmin.map((a) => (
                            <option key={a.idAdmin} value={a.idAdmin}>
                                {a.namaAdmin}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtadmin} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtmanager">Manager</Label>
                    <select
                        id="txtmanager"
                        className={selectClass}
                        value={data.txtmanager}
                        onChange={(e) => setData('txtmanager', e.target.value)}
                    >
                        <option value="">Pilih Manager</option>
                        {datamanager.map((m) => (
                            <option key={m.idManager} value={m.idManager}>
                                {m.namaManager}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtmanager} className="mt-1" />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Label htmlFor="txtbulan">Bulan (1-12)</Label>
                        <Input
                            id="txtbulan"
                            type="number"
                            min={1}
                            max={12}
                            className="mt-1"
                            value={data.txtbulan}
                            onChange={(e) => setData('txtbulan', e.target.value)}
                        />
                        <InputError message={errors.txtbulan} className="mt-1" />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="txttahun">Tahun</Label>
                        <Input
                            id="txttahun"
                            type="number"
                            min={2000}
                            className="mt-1"
                            value={data.txttahun}
                            onChange={(e) => setData('txttahun', e.target.value)}
                        />
                        <InputError message={errors.txttahun} className="mt-1" />
                    </div>
                </div>

                <div>
                    <Label htmlFor="txttotal">Total Pemasukan (Rp)</Label>
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
                    <Label htmlFor="txttgllaporan">Tanggal Laporan</Label>
                    <Input
                        id="txttgllaporan"
                        type="date"
                        className="mt-1"
                        value={data.txttgllaporan}
                        onChange={(e) => setData('txttgllaporan', e.target.value)}
                    />
                    <InputError message={errors.txttgllaporan} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtpembayaran">Pembayaran (opsional)</Label>
                    <select
                        id="txtpembayaran"
                        className={selectClass}
                        value={data.txtpembayaran}
                        onChange={(e) => setData('txtpembayaran', e.target.value)}
                    >
                        <option value="">-</option>
                        {datapembayaran.map((p) => (
                            <option key={p.idPembayaran} value={p.idPembayaran}>
                                #{p.idPembayaran} - Rp{p.jumlahBayar.toLocaleString('id-ID')}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtpembayaran} className="mt-1" />
                </div>

                <Button className="w-full" disabled={processing}>Simpan Perubahan</Button>
            </form>
        </AdminLayout>
    );
}
