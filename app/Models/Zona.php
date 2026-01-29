<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{

    protected $fillable = ['nombre', 'precio', 'aforo', 'filas', 'estadio_id'];

    use HasFactory;

    public function asientos()
    {
        return $this->hasMany(Asiento::class);
    }
    public function estadio()
    {
        return $this->belongsTo(Estadio::class);
    }
}
