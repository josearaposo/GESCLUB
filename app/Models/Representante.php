<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Representante extends Model
{
    protected $fillable = ['nombre', 'primer_apellido', 'segundo_apellido', 'telefono', 'email', 'direccion', 'pais'];

    use HasFactory;
}
