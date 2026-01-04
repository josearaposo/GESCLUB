<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posicion extends Model
{
    protected $table = 'posiciones';

    protected $fillable = ['nombre', 'equipo_id', 'x', 'y', 'activo'];

    use HasFactory;

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }
}
