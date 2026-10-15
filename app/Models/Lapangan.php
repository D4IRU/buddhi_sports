<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Lapangan extends Model
{
    protected $primaryKey = 'idLapangan';
    public $timestamps = false;
 
    protected $fillable = [
        'namaLapangan',
        'jenisLapangan',
        'tarifPerJam',
        'status',
    ];
 
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'idLapangan', 'idLapangan');
    }
}