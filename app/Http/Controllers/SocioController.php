<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSocioRequest;
use App\Http\Requests\UpdateSocioRequest;
use App\Models\Asiento;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Http\Request;

class SocioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSocioRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Socio $socio)
    {
        $socio->load('asiento.zona', 'abonoActual');

        $asientos = $socio->asiento->zona
            ->asientos()
            ->orderBy('numero')
            ->get();

        return inertia('Socios/Show', [
            'socio' => $socio,
            'asientos' => $asientos,
            'filas' => $socio->asiento->zona->filas,
            'abono' => $socio->abonoActual,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Socio $socio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Socio $socio)
    {
        $request->validate(
            [
                'nombre' => 'required|string',
                'dni' => 'required|unique:socios,dni,' . $socio->id,
                'numero_socio' => 'required|unique:socios,numero_socio,' . $socio->id,
                'asiento_id' => 'required|exists:asientos,id',
            ],
            [
                'numero_socio.unique' => 'Ese número de socio ya existe',
                'dni.unique' => 'Ya hay un socio registrado con ese DNI',
            ]
        );

        $socio->nombre = $request->nombre;
        $socio->dni = $request->dni;
        $socio->numero_socio = $request->numero_socio;
        $socio->asiento->estado = 'Libre';
        $socio->asiento->save();

        $nuevoAsiento = Asiento::findOrFail($request->asiento_id);

        $nuevoAsiento->update([
            'estado' => 'Reservado',
        ]);


        $socio->update([
            'asiento_id' => $nuevoAsiento->id,
        ]);
        $socio->save();

        return redirect()->route('zonas.show', ['zona' => $socio->asiento->zona_id])->with('success', 'Socio actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Socio $socio)
    {
        $asiento = $socio->asiento;

        if ($asiento) {
            $asiento->estado = 'Libre';
            $asiento->save();
        }
        $socio->user->clubes()->detach();

        $socio->delete();
        $users = User::findOrFail($socio->user_id);
        $users->delete();
        return redirect()->route('zonas.show', ['zona' => $socio->asiento->zona_id])->with('success', 'Socio eliminado correctamente.');
    }
}
