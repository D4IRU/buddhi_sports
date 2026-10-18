<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MasterLaporanPembayaranController extends Controller
{

    public function tampilData(){

        $varlaporan = DB::table('laporan_pembayarans')->get();
        return Inertia::render('Master/LaporanPembayaran/TampilData', ['datalaporan' => $varlaporan]);
    }

    public function tampilFormTambah(){
        return Inertia::render('Master/LaporanPembayaran/FormTambah', [
            'dataadmin' => DB::table('admins')->get(),
            'datamanager' => DB::table('managers')->get(),
            'datapembayaran' => DB::table('pembayarans')->get(),
        ]);
    }

    public function tampilFormEdit($idedit){
        $varlaporan = DB::table('laporan_pembayarans')->where('idLaporan', $idedit)->first();
        return Inertia::render('Master/LaporanPembayaran/FormEdit', [
            'datalaporan' => $varlaporan,
            'dataadmin' => DB::table('admins')->get(),
            'datamanager' => DB::table('managers')->get(),
            'datapembayaran' => DB::table('pembayarans')->get(),
        ]);
    }

    public function insertData(Request $request){
        $request->validate([
            'txtadmin' => 'required|integer',
            'txtmanager' => 'required|integer',
            'txtbulan' => 'required|integer|min:1|max:12',
            'txttahun' => 'required|integer',
            'txttotal' => 'required|integer|min:0',
            'txttgllaporan' => 'required|date',
            'txtpembayaran' => 'nullable|integer',
        ]);

        DB::table('laporan_pembayarans') -> insert ([
            'idAdmin' => $request->txtadmin,
            'idManager' => $request->txtmanager,
            'bulan' => $request->txtbulan,
            'tahun' => $request->txttahun,
            'totalPemasukan' => $request->txttotal,
            'tglLaporan' => $request->txttgllaporan,
            'idPembayaran' => $request->txtpembayaran,
        ]);

        return redirect('/tampillaporanpembayaran');
    }

    public function updateData(Request $request){
        $request->validate([
            'txtid' => 'required|integer',
            'txtadmin' => 'required|integer',
            'txtmanager' => 'required|integer',
            'txtbulan' => 'required|integer|min:1|max:12',
            'txttahun' => 'required|integer',
            'txttotal' => 'required|integer|min:0',
            'txttgllaporan' => 'required|date',
            'txtpembayaran' => 'nullable|integer',
        ]);

        DB::table('laporan_pembayarans')
        -> where('idLaporan', $request->txtid)
        ->update([
            'idAdmin' => $request->txtadmin,
            'idManager' => $request->txtmanager,
            'bulan' => $request->txtbulan,
            'tahun' => $request->txttahun,
            'totalPemasukan' => $request->txttotal,
            'tglLaporan' => $request->txttgllaporan,
            'idPembayaran' => $request->txtpembayaran,
        ]);

        return redirect('/tampillaporanpembayaran');
    }

    public function deleteDataLaporanPembayaran($idhapus){
        try {
            DB::table('laporan_pembayarans')->where('idLaporan', $idhapus)->delete();
        } catch (QueryException $e) {
            return redirect('/tampillaporanpembayaran')->with('error', 'Laporan tidak bisa dihapus.');
        }

        return redirect('/tampillaporanpembayaran');
    }
}
