<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    protected $table = 'jugadores';

    protected $fillable = ['apodo', 'nombre', 'primer_apellido' , 'segundo_apellido', 'equipo_id', 'year', 'ciudad','provincia', 'pais', 'lateralidad', 'altura', 'besoccer', 'internacional', 'primera_posicion', 'segunda_posicion','representante', 'salario', 'valor_marcado', 'fortalezas', 'debilidades', 'valoracion', 'imagen'];

    use HasFactory;
}
