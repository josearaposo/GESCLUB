<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $table = 'divisiones';
    use HasFactory;

    public function equipos()
    {
        return $this->hasMany(Equipo::class);
    }

}
