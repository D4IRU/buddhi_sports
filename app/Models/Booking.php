<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Booking extends Model
{
    protected $primaryKey = 'idBooking';
    public $timestamps = false;
 
    protected $fillable = [
        'idPenyewa',
        'idLapangan',
        'idAdmin',
        'tanggal',
        'jamMulai',
        'jamSelesai',
        'totalBayar',
        'status',
    ];

    public function penyewa()
    {
        return $this->belongsTo(Penyewa::class, 'idPenyewa', 'idPenyewa');
    }
 
    public function lapangan()
    {
        return $this->belongsTo(Lapangan::class, 'idLapangan', 'idLapangan');
    }
 
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'idAdmin', 'idAdmin');
    }
 
    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class, 'idBooking', 'idBooking');
    }
}
 