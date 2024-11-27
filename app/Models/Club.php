<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $fillable = ['nombre', 'estadio', 'presupuesto', 'contacto', 'web', 'direccion', 'ciudad', 'pais', 'empleados', 'fundacion', 'imagen'];
    use HasFactory;
}
