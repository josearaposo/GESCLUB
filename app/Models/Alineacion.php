<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alineacion extends Model
{
    use HasFactory;
    protected $table = 'alineaciones';

    protected $fillable = [
        'partido_id',
        'jugador_id',
        'posicion_id',
        'rol', // 'titular' o 'suplente'
    ];

    // Relaciones (opcional)
    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }
}
