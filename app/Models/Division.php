<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{

    protected $fillable = ['nombre', 'numero_equipos', 'club_id'];
    protected $table = 'divisiones';
    use HasFactory;


    public function equipos()
    {
        return $this->hasMany(Equipo::class);
    }
    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
