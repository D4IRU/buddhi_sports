<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporan_pembayarans', function (Blueprint $table) {
            $table->id('idLaporan');
            $table->foreignId('idAdmin')->constrained('admins', 'idAdmin');
            $table->foreignId('idManager')->constrained('managers', 'idManager');
            $table->integer('bulan');
            $table->integer('tahun');
            $table->integer('totalPemasukan');
            $table->date('tglLaporan');
            $table->unsignedBigInteger('idPembayaran')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_pembayarans');
    }
};
