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
            ['nombre' => 'Portero', 'x' => 15, 'y' => 50],
            ['nombre' => 'Lateral Derecho', 'x' => 25, 'y' => 80],
            ['nombre' => 'Lateral Izquierdo', 'x' => 25, 'y' => 20],
            ['nombre' => 'Central Izquierdo', 'x' => 25, 'y' => 40],
            ['nombre' => 'Central Derecho', 'x' => 25, 'y' => 60],
            ['nombre' => 'Medio Izquierdo', 'x' => 50, 'y' => 40],
            ['nombre' => 'Medio Derecho', 'x' => 50, 'y' => 60],
            ['nombre' => 'Interior Izquierdo', 'x' => 60, 'y' => 20],
            ['nombre' => 'Interior Derecho', 'x' => 60, 'y' => 80],
            ['nombre' => 'Mediapunta', 'x' => 70, 'y' => 50],
            ['nombre' => 'Delantero', 'x' => 80, 'y' => 50]
        ];

        DB::table('posiciones')->insert($posiciones);
    }
}
