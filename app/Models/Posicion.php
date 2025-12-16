<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posicion extends Model
{
    protected $table = 'posiciones';

    protected $fillable = ['nombre', 'x', 'y', 'activo'];

    use HasFactory;

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }
}
