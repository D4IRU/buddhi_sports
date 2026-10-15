<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Pembayaran extends Model
{
    protected $primaryKey = 'idPembayaran';
    public $timestamps = false;
 
    protected $fillable = [
        'idAdmin',
        'idBooking',
        'tglBayar',
        'jumlahBayar',
        'buktiBayar',
        'status',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'idAdmin', 'idAdmin');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'idBooking', 'idBooking');
    }
}