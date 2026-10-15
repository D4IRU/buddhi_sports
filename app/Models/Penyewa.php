<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Penyewa extends Model
{
    protected $primaryKey = 'idPenyewa';
    public $timestamps = false;
 
    protected $fillable = [
        'namaPenyewa',
        'noHp',
        'email',
        'password',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'idPenyewa', 'idPenyewa');
    }
}