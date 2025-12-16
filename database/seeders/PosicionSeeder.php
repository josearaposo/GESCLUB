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
            ['nombre' => 'PT', 'x' => 15, 'y' => 50],
            ['nombre' => 'LD', 'x' => 25, 'y' => 80],
            ['nombre' => 'LI', 'x' => 25, 'y' => 20],
            ['nombre' => 'CFI', 'x' => 25, 'y' => 40],
            ['nombre' => 'CFD', 'x' => 25, 'y' => 60],
            ['nombre' => 'CI', 'x' => 35, 'y' => 20],
            ['nombre' => 'CD', 'x' => 35, 'y' => 80],
            ['nombre' => 'MC', 'x' => 50, 'y' => 50],
            ['nombre' => 'PD', 'x' => 40, 'y' => 50],
            ['nombre' => 'II', 'x' => 60, 'y' => 20],
            ['nombre' => 'ID', 'x' => 60, 'y' => 80],
            ['nombre' => 'EI', 'x' => 75, 'y' => 20],
            ['nombre' => 'ED', 'x' => 75, 'y' => 80],
            ['nombre' => 'MP', 'x' => 70, 'y' => 50],
            ['nombre' => 'DC', 'x' => 80, 'y' => 50]
        ];

        DB::table('posiciones')->insert($posiciones);
    }
}
