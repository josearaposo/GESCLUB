<?php

// ReservaController.php

namespace App\Http\Controllers;

use App\Models\Abono;
use App\Models\Asiento;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ReservaController extends Controller
{
    public function reservar(Request $request)
    {

        $request->validate(
            [
                'asiento_id' => 'required|exists:asientos,id',
                'nombre' => 'required|string',
                'dni' => 'required|unique:socios,dni',
                'email' => 'required|email|unique:users,email',
                'numero_socio' => 'required|unique:socios,numero_socio',
            ],
            [
                'numero_socio.unique' => 'Ese número de socio ya existe',
                'dni.unique' => 'Ya hay un socio registrado con ese DNI',
            ]
        );

        $asiento = Asiento::findOrFail($request->asiento_id);
        $estadio = $request->estadio;

        if ($asiento->estado === 'Libre') {
            //Aseguramos el proceso completo con una transacción
            DB::beginTransaction();

            try {
                // Crear el usuario y el socio asociados a la reserva
                $user = User::create([
                    'name' => $request->nombre,
                    'email' => $request->email,
                    'password' => Hash::make($request->dni),
                    'rol' => 'socio',
                    'activo' => true,
                ]);

                $socio = Socio::create([
                    'nombre' => $request->nombre,
                    'dni' => $request->dni,
                    'numero_socio' => $request->numero_socio,
                    'asiento_id' => $asiento->id,
                    'fecha_reserva' => now(),
                    'club_id' => $asiento->zona->estadio->club_id,
                    'user_id' => $user->id,
                ]);

                $user->clubes()->attach($socio->club_id);

                $asiento->update([
                    'estado' => 'Reservado',
                ]);

                $importe = $asiento->zona->precio;

                Abono::create([
                    'socio_id' => $socio->id,
                    'asiento_id' => $asiento->id,
                    'temporada' => Abono::temporadaActual(),
                    'importe' => $importe,
                ]);

                DB::commit();

                return redirect()
                    ->route('zonas.index', ['estadio' => $estadio])
                    ->with('success', 'Asiento reservado con éxito y socio registrado.');
            } catch (\Throwable $e) {
                DB::rollBack();
                return back()->withErrors([
                    'error' => 'No se pudo completar la reserva. Inténtalo de nuevo.',
                ]);
            }
        }
    }
}
