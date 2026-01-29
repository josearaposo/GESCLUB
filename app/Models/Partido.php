<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Alineacion;

class Partido extends Model
{
    protected $fillable = ['division_id', 'equipo_id', 'rival', 'fecha', 'lugar'];
    protected $appends = ['goles_favor', 'goles_contra'];

    use HasFactory;

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function estadisticas()
    {
        return $this->hasMany(Estadistica::class);
    }

    public function jugadores()
    {
        return $this->belongsToMany(Jugador::class, 'alineaciones')
            ->withPivot('rol')
            ->withTimestamps();
    }

    public function alineaciones()
    {
        return $this->hasMany(Alineacion::class);
    }

    public function golesFavor()
    {
        return $this->estadisticas()
            ->where('tipo', 'gol')
            ->whereHas('jugador.primera_posicion', function ($q) {
                $q->where('nombre', '!=', 'Portero');
            })
            ->count();
    }

    public function golesContra()
    {
        return $this->estadisticas()
            ->where('tipo', 'gol')
            ->whereHas('jugador.primera_posicion', function ($q) {
                $q->where('nombre', 'Portero');
            })
            ->count();
    }

    public function getGolesFavorAttribute()
    {
        return $this->golesFavor();
    }

    public function getGolesContraAttribute()
    {
        return $this->golesContra();
    }
}
