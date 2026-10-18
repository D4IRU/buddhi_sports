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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('idBooking');
            $table->foreignId('idPenyewa')->constrained('penyewas', 'idPenyewa');
            $table->foreignId('idLapangan')->constrained('lapangans', 'idLapangan');
            $table->foreignId('idAdmin')->nullable()->constrained('admins', 'idAdmin');
            $table->date('tanggal');
            $table->time('jamMulai');
            $table->time('jamSelesai');
            $table->integer('totalBayar');
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
