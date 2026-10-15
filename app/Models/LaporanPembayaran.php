<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class LaporanPembayaran extends Model
{
    protected $primaryKey = 'idLaporan';
    public $timestamps = false;
 
    protected $fillable = [
        'idAdmin',
        'idManager',
        'bulan',
        'tahun',
        'totalPemasukan',
        'tglLaporan',
        'idPembayaran',
    ];

    public function manager()
    {
        return $this->belongsTo(Manager::class, 'idManager', 'idManager');
    }
 
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'idAdmin', 'idAdmin');
    }

    public function pembayaran()
    {
        return $this->belongsTo(Pembayaran::class, 'idPembayaran', 'idPembayaran');
    }
}
