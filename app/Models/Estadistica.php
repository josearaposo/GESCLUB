<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadistica extends Model
{
    protected $fillable = ['jugador_id', 'tipo', 'detalle', 'minuto'];

    use HasFactory;

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }
}
