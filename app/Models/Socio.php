<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    protected $fillable = ['nombre', 'dni', 'numero_socio', 'asiento_id', 'fecha_reserva', 'user_id', 'club_id'];
    use HasFactory;

    public function asiento()
    {
        return $this->belongsTo(Asiento::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
    public function abonos()
    {
        return $this->hasMany(Abono::class);
    }

    public function abonoActual()
    {
        return $this->hasOne(Abono::class)->latestOfMany();
    }
}
