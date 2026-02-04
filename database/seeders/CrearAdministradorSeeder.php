<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CrearAdministradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear un usuario administrador si no existe
        User::firstOrCreate(
            ['email' => 'admin@gesclub.com'],
            [
                'name' => 'Administrador',
                // encriptar la contraseña
                'password' => Hash::make('Admin123.'),
                'rol' => 'superadmin',
            ]
        );
    }
}
