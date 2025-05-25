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
            ['nombre' => 'Portero', 'x'=> 15, 'y' => 50 ],
            ['nombre' => 'Lateral Derecho', 'x'=> 25, 'y' => 80 ],
            ['nombre' => 'Lateral Izquierdo' , 'x'=> 25, 'y' => 20],
            ['nombre' => 'Central' , 'x'=> 25, 'y' => 50],
            ['nombre' => 'Carrilero Izquierdo' , 'x'=> 35, 'y' => 20],
            ['nombre' => 'Carrilero Derecho', 'x'=> 35, 'y' => 80],
            ['nombre' => 'Mediocentro' , 'x'=> 50, 'y' => 50],
            ['nombre' => 'Pivote Defensivo' , 'x'=> 40, 'y' => 50],
            ['nombre' => 'Interior Izquierdo' , 'x'=> 60, 'y' => 20],
            ['nombre' => 'Interior Derecho' , 'x'=> 60, 'y' => 80],
            ['nombre' => 'Extremo Izquierdo' , 'x'=> 75, 'y' => 20],
            ['nombre' => 'Extremo Derecho' , 'x'=> 75, 'y' => 80],
            ['nombre' => 'Mediapunta' , 'x'=> 70, 'y' => 50],
            ['nombre' => 'Delantero', 'x'=> 80, 'y' => 50]
        ];

        DB::table('posiciones')->insert($posiciones);
    }
}
