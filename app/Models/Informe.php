<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Informe extends Model
{
    use HasFactory;

    protected $fillable = [
        'jugador_id','user_id',
        'centros', 'regates', 'definicion', 'primer_toque', 'tiro_libre', 'aereo',
        'larga_distancia', 'pase_largo', 'marca', 'pase', 'penalti', 'tackling', 'tecnica',
        'aceleracion', 'agilidad', 'balence', 'salto', 'corpulencia', 'cambio_ritmo', 'resistencia',
        'agresion', 'anticipacion', 'compostura', 'concentracion', 'decisiones', 'determinacion',
        'liderazgo', 'sin_balon', 'posicionamiento', 'en_equipo', 'vision', 'pros', 'contras'
    ];

    public function jugador()
    {
        return $this->belongsTo(Jugador::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
