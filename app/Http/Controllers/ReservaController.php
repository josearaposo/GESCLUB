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
        // Validar que el asiento exista y los datos del socio
        $request->validate([
            'asiento_id' => 'required|exists:asientos,id', // Validamos que el asiento exista
            'nombre' => 'required|string|max:255', // Validar nombre del socio
            'dni' => 'required|string|max:20', // Validar el DNI del socio
            'numero_socio' => 'required|integer', // Validar el número de socio
        ]);

        // Obtener el asiento
        $asiento = Asiento::findOrFail($request->asiento_id);
        $estadio = $request->estadio;

        // Verificamos que el asiento esté libre
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


