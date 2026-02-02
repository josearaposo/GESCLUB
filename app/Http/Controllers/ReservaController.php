<?php

// ReservaController.php

namespace App\Http\Controllers;


use App\Models\Asiento;
use App\Models\Socio;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function reservar(Request $request)
    {

        $request->validate(
            [
                'asiento_id' => 'required|exists:asientos,id', // Validamos que el asiento exista
                'nombre' => 'required|string',
                'dni' => 'required|unique:socios,dni',
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
            // Crear el nuevo socio
            $socio = Socio::create([
                'nombre' => $request->nombre,
                'dni' => $request->dni,
                'numero_socio' => $request->numero_socio,
                'asiento_id' => $asiento->id,
                'fecha_reserva' => now(), // Guardamos la fecha de la reserva
            ]);

            // Actualizamos el estado del asiento a "Reservado"
            $asiento->estado = 'Reservado';
            $asiento->save();

            // Redirigir a la página de zonas con un mensaje de éxito
            return redirect()
                ->route('zonas.index', ['estadio' => $estadio])
                ->with('success', 'Asiento reservado con éxito y socio registrado.');
        } else {
            // Si el asiento no está libre, devolver un mensaje de error
            return response()->json(['message' => 'Este asiento ya está reservado.'], 400);
        }
    }
}
