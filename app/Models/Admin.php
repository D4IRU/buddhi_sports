<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $primaryKey = 'idAdmin';
    public $timestamps = false;

    protected $fillable = [
        'namaAdmin',
        'username',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
 
    public function laporanPembayarans()
    {
        return $this->hasMany(LaporanPembayaran::class, 'idAdmin', 'idAdmin');
    }
 
    public function pembayarans()
    {
        return $this->hasMany(Pembayaran::class, 'idAdmin', 'idAdmin');
    }
 
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'idAdmin', 'idAdmin');
    }
}
 