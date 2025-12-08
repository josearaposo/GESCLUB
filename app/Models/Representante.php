<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Representante extends Model
{
    protected $fillable = ['nombre', 'primer_apellido', 'segundo_apellido', 'telefono', 'email', 'direccion', 'pais', 'club_id'];

    use HasFactory;

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
