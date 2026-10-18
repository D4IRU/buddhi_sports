<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MasterPembayaranController extends Controller
{

    public function tampilData(){

        $varpembayaran = DB::table('pembayarans')->get();
        return Inertia::render('Master/Pembayaran/TampilData', ['datapembayaran' => $varpembayaran]);
    }

    public function tampilFormTambah(){
        return Inertia::render('Master/Pembayaran/FormTambah', [
            'databooking' => DB::table('bookings')->get(),
            'dataadmin' => DB::table('admins')->get(),
        ]);
    }

    public function tampilFormEdit($idedit){
        $varpembayaran = DB::table('pembayarans')->where('idPembayaran', $idedit)->first();
        return Inertia::render('Master/Pembayaran/FormEdit', [
            'datapembayaran' => $varpembayaran,
            'databooking' => DB::table('bookings')->get(),
            'dataadmin' => DB::table('admins')->get(),
        ]);
    }

    public function insertData(Request $request){
        $request->validate([
            'txtadmin' => 'nullable|integer',
            'txtbooking' => 'required|integer',
            'txttglbayar' => 'required|date',
            'txtjumlah' => 'required|integer|min:0',
            'txtbukti' => 'nullable|string|max:255',
            'txtstatus' => 'required|string|max:255',
        ]);

        // satu booking hanya boleh punya satu pembayaran
        $sudahAda = DB::table('pembayarans')->where('idBooking', $request->txtbooking)->exists();
        if ($sudahAda) {
            return redirect('/formpembayaran')->with('error', 'Booking ini sudah memiliki data pembayaran.');
        }

        DB::table('pembayarans') -> insert ([
            'idAdmin' => $request->txtadmin,
            'idBooking' => $request->txtbooking,
            'tglBayar' => $request->txttglbayar,
            'jumlahBayar' => $request->txtjumlah,
            'buktiBayar' => $request->txtbukti,
            'status' => $request->txtstatus,
        ]);

        return redirect('/tampilpembayaran');
    }

    public function updateData(Request $request){
        $request->validate([
            'txtid' => 'required|integer',
            'txtadmin' => 'nullable|integer',
            'txtbooking' => 'required|integer',
            'txttglbayar' => 'required|date',
            'txtjumlah' => 'required|integer|min:0',
            'txtbukti' => 'nullable|string|max:255',
            'txtstatus' => 'required|string|max:255',
        ]);

        // booking tidak boleh dipindah ke booking lain yang sudah punya pembayaran
        $sudahAda = DB::table('pembayarans')
            ->where('idBooking', $request->txtbooking)
            ->where('idPembayaran', '!=', $request->txtid)
            ->exists();
        if ($sudahAda) {
            return redirect('/editpembayaran/'.$request->txtid)->with('error', 'Booking ini sudah memiliki data pembayaran lain.');
        }

        DB::table('pembayarans')
        -> where('idPembayaran', $request->txtid)
        ->update([
            'idAdmin' => $request->txtadmin,
            'idBooking' => $request->txtbooking,
            'tglBayar' => $request->txttglbayar,
            'jumlahBayar' => $request->txtjumlah,
            'buktiBayar' => $request->txtbukti,
            'status' => $request->txtstatus,
        ]);

        return redirect('/tampilpembayaran');
    }

    public function deleteDataPembayaran($idhapus){
        try {
            DB::table('pembayarans')->where('idPembayaran', $idhapus)->delete();
        } catch (QueryException $e) {
            // masih dirujuk oleh laporan pembayaran
            return redirect('/tampilpembayaran')->with('error', 'Pembayaran tidak bisa dihapus karena masih digunakan pada laporan pembayaran.');
        }

        return redirect('/tampilpembayaran');
    }
}
