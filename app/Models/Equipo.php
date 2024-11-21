<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    protected $fillable = ['nombre', 'division_id'];

    use HasFactory;

    public function division()
   {
       return $this->belongsTo(Division::class);
   }

}
