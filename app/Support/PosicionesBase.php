<?php

namespace App\Support;

class PosicionesBase
{
    public static function all(): array
    {
        return [
            ['nombre' => 'Portero', 'x' => 10, 'y' => 50],
            ['nombre' => 'Lateral Derecho', 'x' => 25, 'y' => 80],
            ['nombre' => 'Lateral Izquierdo', 'x' => 25, 'y' => 20],
            ['nombre' => 'Central Izquierdo', 'x' => 25, 'y' => 40],
            ['nombre' => 'Central Derecho', 'x' => 25, 'y' => 60],
            ['nombre' => 'Medio Izquierdo', 'x' => 50, 'y' => 40],
            ['nombre' => 'Medio Derecho', 'x' => 50, 'y' => 60],
            ['nombre' => 'Interior Izquierdo', 'x' => 60, 'y' => 20],
            ['nombre' => 'Interior Derecho', 'x' => 60, 'y' => 80],
            ['nombre' => 'Mediapunta', 'x' => 70, 'y' => 50],
            ['nombre' => 'Delantero', 'x' => 80, 'y' => 50],
        ];
    }
}
