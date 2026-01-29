<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadio extends Model
{
    protected $fillable = [
        'nombre',
        'club_id',
        'direccion',
        'capacidad',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    use HasFactory;
}
