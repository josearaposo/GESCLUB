<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    protected $table = 'jugadores';

    protected $fillable = ['apodo', 'nombre', 'primer_apellido', 'segundo_apellido', 'equipo_id', 'equipo_externo', 'estado', 'year', 'ciudad', 'provincia', 'pais', 'lateralidad', 'altura', 'besoccer', 'internacional', 'primera_posicion', 'segunda_posicion', 'representante_id', 'salario', 'valor_mercado', 'valoracion', 'imagen'];

    use HasFactory;

    public function primera_posicion()
    {
        return $this->belongsTo(Posicion::class, 'primera_posicion');
    }
    public function segunda_posicion()
    {
        return $this->belongsTo(Posicion::class, 'segunda_posicion');
    }

    public function informes()
    {
        return $this->hasMany(Informe::class);
    }

    public function representante()
    {
        return $this->belongsTo(Representante::class);
    }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function traspasos()
    {
        return $this->hasMany(Traspaso::class);
    }

    public function estadisticas()
    {
        return $this->hasMany(Estadistica::class);
    }
    public function partidos()
    {
        return $this->belongsToMany(Partido::class, 'alineaciones')
            ->withPivot('rol')
            ->withTimestamps();
    }
}
