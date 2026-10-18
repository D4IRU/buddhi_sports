<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Manager extends Authenticatable
{
    protected $primaryKey = 'idManager';
    public $timestamps = false;

    protected $fillable = [
        'namaManager',
        'username',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
 
    public function laporanPembayarans()
    {
        return $this->hasMany(LaporanPembayaran::class, 'idManager', 'idManager');
    }
}