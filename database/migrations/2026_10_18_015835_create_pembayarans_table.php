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
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id('idPembayaran');
            $table->foreignId('idAdmin')->nullable()->constrained('admins', 'idAdmin');
            $table->foreignId('idBooking')->unique()->constrained('bookings', 'idBooking');
            $table->date('tglBayar');
            $table->integer('jumlahBayar');
            $table->string('buktiBayar')->nullable();
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};
