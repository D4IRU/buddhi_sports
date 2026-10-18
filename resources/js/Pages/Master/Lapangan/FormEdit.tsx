import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Lapangan = {
    idLapangan: number;
    namaLapangan: string;
    jenisLapangan: string;
    tarifPerJam: number;
    status: string;
};

const selectClass =
    'mt-1 flex h-8 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50';

export default function FormEdit({ datalapangan }: { datalapangan: Lapangan }) {
    const { data, setData, post, processing, errors } = useForm({
        txtid: datalapangan.idLapangan,
        txtnama: datalapangan.namaLapangan,
        txtjenis: datalapangan.jenisLapangan,
        txttarif: String(datalapangan.tarifPerJam),
        txtstatus: datalapangan.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/updatelapangan');
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Lapangan
                </h2>
            }
        >
            <Head title="Edit Lapangan" />

            <form
                onSubmit={submit}
                className="max-w-md space-y-4 rounded-lg bg-white p-6 shadow-sm"
            >
                <div>
                    <Label htmlFor="txtnama">Nama Lapangan</Label>
                    <Input
                        id="txtnama"
                        className="mt-1"
                        value={data.txtnama}
                        onChange={(e) => setData('txtnama', e.target.value)}
                    />
                    <InputError message={errors.txtnama} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtjenis">Jenis</Label>
                    <select
                        id="txtjenis"
                        className={selectClass}
                        value={data.txtjenis}
                        onChange={(e) => setData('txtjenis', e.target.value)}
                    >
                        <option value="Bulu Tangkis">Bulu Tangkis</option>
                        <option value="Basket">Basket</option>
                    </select>
                    <InputError message={errors.txtjenis} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txttarif">Tarif per Jam (Rp)</Label>
                    <Input
                        id="txttarif"
                        type="number"
                        min={0}
                        className="mt-1"
                        value={data.txttarif}
                        onChange={(e) => setData('txttarif', e.target.value)}
                    />
                    <InputError message={errors.txttarif} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="txtstatus">Status</Label>
                    <select
                        id="txtstatus"
                        className={selectClass}
                        value={data.txtstatus}
                        onChange={(e) => setData('txtstatus', e.target.value)}
                    >
                        <option value="Kosong">Kosong</option>
                        <option value="Terbooking">Terbooking</option>
                    </select>
                    <InputError message={errors.txtstatus} className="mt-1" />
                </div>

                <Button disabled={processing}>Simpan Perubahan</Button>
            </form>
        </AdminLayout>
    );
}
