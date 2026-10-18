import FlashMessage from '@/Components/FlashMessage';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Booking = { idBooking: number; tanggal: string };
type Admin = { idAdmin: number; namaAdmin: string };

const selectClass =
    'mt-1 flex h-10 w-full rounded-lg border border-gray-200 bg-background px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50';

export default function FormTambah({
    databooking,
    dataadmin,
}: {
    databooking: Booking[];
    dataadmin: Admin[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        txtadmin: '',
        txtbooking: '',
        txttglbayar: '',
        txtjumlah: '',
        txtbukti: '',
        txtstatus: 'Menunggu Verifikasi',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/insertpembayaran');
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Pembayaran
                </h2>
            }
        >
            <Head title="Tambah Pembayaran" />

            <FlashMessage />

            <form
                onSubmit={submit}
                className="max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <Label htmlFor="txtbooking">Booking</Label>
                    <select
                        id="txtbooking"
                        className={selectClass}
                        value={data.txtbooking}
                        onChange={(e) => setData('txtbooking', e.target.value)}
                    >
                        <option value="">Pilih Booking</option>
                        {databooking.map((b) => (
                            <option key={b.idBooking} value={b.idBooking}>
                                #{b.idBooking} - {b.tanggal}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.txtbooking} className="mt-1" />
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
                    <Label htmlFor="txttglbayar">Tanggal Bayar</Label>
                    <Input
                        id="txttglbayar"
                        type="date"
                        className="mt-1"
                        value={data.txttglbayar}
                        onChange={(e) => setData('txttglbayar', e.target.value)}
                    />
                    <InputError message={errors.txttglbayar} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtjumlah">Jumlah Bayar (Rp)</Label>
                    <Input
                        id="txtjumlah"
                        type="number"
                        min={0}
                        className="mt-1"
                        value={data.txtjumlah}
                        onChange={(e) => setData('txtjumlah', e.target.value)}
                    />
                    <InputError message={errors.txtjumlah} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtbukti">Bukti Bayar (nama file/path)</Label>
                    <Input
                        id="txtbukti"
                        className="mt-1"
                        value={data.txtbukti}
                        onChange={(e) => setData('txtbukti', e.target.value)}
                    />
                    <InputError message={errors.txtbukti} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtstatus">Status</Label>
                    <select
                        id="txtstatus"
                        className={selectClass}
                        value={data.txtstatus}
                        onChange={(e) => setData('txtstatus', e.target.value)}
                    >
                        <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                    <InputError message={errors.txtstatus} className="mt-1" />
                </div>

                <Button className="w-full" disabled={processing}>Simpan</Button>
            </form>
        </AdminLayout>
    );
}
