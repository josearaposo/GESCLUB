<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abono extends Model
{
    use HasFactory;

    protected $fillable = ['socio_id', 'asiento_id', 'temporada', 'importe', 'pagado', 'fecha_pago'];

    protected $casts = [
        'pagado' => 'boolean',
        'pagado_en' => 'datetime',
    ];
    public function socio()
    {
        return $this->belongsTo(Socio::class);
    }


    public function marcarComoPagado(): void
    {
        $this->update([
            'pagado' => true,
            'pagado_en' => now(),
        ]);
    }

    public function asiento()
    {
        return $this->belongsTo(Asiento::class);
    }

    public static function temporadaActual(): string
    {
        $year = now()->year;

        // Si estamos antes de julio temporada empezó el año pasado
        if (now()->month < 7) {
            $inicio = $year - 1;
            $fin = $year;
        } else {
            $inicio = $year;
            $fin = $year + 1;
        }

        return "{$inicio}/{$fin}";
    }
}
