<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asiento extends Model
{
    protected $fillable = ['zona_id', 'numero','fila', 'estado'];
    use HasFactory;
}
