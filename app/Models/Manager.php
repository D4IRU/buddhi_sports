<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Manager extends Model
{
    protected $primaryKey = 'idManager';
    public $timestamps = false;
 
    protected $fillable = [
        'namaManager',
        'username',
        'password',
    ];
 
    public function laporanPembayarans()
    {
        return $this->hasMany(LaporanPembayaran::class, 'idManager', 'idManager');
    }
}