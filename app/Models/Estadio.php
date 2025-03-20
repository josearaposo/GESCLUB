<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadio extends Model
{
    protected $fillable = ['nombre', 'direccion', 'capacidad', 'club_id'];

    use HasFactory;
}
