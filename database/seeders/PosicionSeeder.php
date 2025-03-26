<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PosicionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posiciones = [
            ['nombre' => 'Portero'],
            ['nombre' => 'Lateral Derecho'],
            ['nombre' => 'Lateral Izquierdo'],
            ['nombre' => 'Carrilero Izquierdo'],
            ['nombre' => 'Carrilero Derecho'],
            ['nombre' => 'Mediocentro'],
            ['nombre' => 'Pivote Defensivo'],
            ['nombre' => 'Interior Izquierdo'],
            ['nombre' => 'Interior Derecho'],
            ['nombre' => 'Extremo Izquierdo'],
            ['nombre' => 'Extremo Derecho'],
            ['nombre' => 'Mediapunta'],
            ['nombre' => 'Delantero']
        ];

        DB::table('posiciones')->insert($posiciones);
    }
}
