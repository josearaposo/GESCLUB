<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    protected $fillable = ['nombre', 'dni', 'numero_socio', 'asiento_id', 'fecha_reserva'];
    use HasFactory;

    public function asiento()
    {
        return $this->belongsTo(Asiento::class);
    }
}
