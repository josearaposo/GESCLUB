<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asiento extends Model
{
    protected $fillable = ['zona_id', 'numero', 'fila', 'estado'];
    use HasFactory;

    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }

    public function socio()
    {
        return $this->hasOne(Socio::class);
    }
}
