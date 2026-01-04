<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $fillable = ['nombre', 'division_id', 'club_id'];

    use HasFactory;

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    public function posiciones()
    {
        return $this->hasMany(Posicion::class);
    }
}
