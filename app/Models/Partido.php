<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    protected $fillable = ['division_id', 'equipo_id', 'rival', 'fecha', 'lugar'];

    use HasFactory;

    public function estadisticas()
    {
        return $this->hasMany(Estadistica::class);
    }
    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function jugadores()
    {
        return $this->belongsToMany(Jugador::class, 'alineaciones')
            ->withPivot('rol')
            ->withTimestamps();
    }
}
