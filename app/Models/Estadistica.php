<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadistica extends Model
{
    protected $fillable = ['partido_id', 'jugador_id', 'tipo', 'detalle', 'minuto'];

    use HasFactory;

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }
}
