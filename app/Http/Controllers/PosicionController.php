<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use App\Models\Posicion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosicionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posiciones = Posicion::all();
        return Inertia::render('Posiciones/Index', [
            'posiciones' => $posiciones
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posiciones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'nombre' => 'required|string|max:255',
            'x' => 'nullable|numeric|min:0|max:100',
            'y' => 'nullable|numeric|min:0|max:100',
        ]);

        Posicion::create([
            'nombre' => $request->nombre,
            'x' => $request->x,
            'y' => $request->y,
        ]);

        return redirect()->route('posiciones.index')->with('success', 'Posición creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Posicion $posicion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Posicion $posicion)
    {
        return Inertia::render('Posiciones/Edit', [
            'posicion' => $posicion,
        ]);
    }

    public function update(Request $request, Posicion $posicion)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'x' => 'nullable|numeric|min:0|max:100',
            'y' => 'nullable|numeric|min:0|max:100',
        ]);

        $posicion->update([
            'nombre' => $request->nombre,
            'x' => $request->x,
            'y' => $request->y,
        ]);

        return redirect()->route('posiciones.index')->with('success', 'Posición actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Posicion $posicion)
    {

        if (
            Jugador::where('primera_posicion', $posicion->id)->exists() ||
            Jugador::where('segunda_posicion', $posicion->id)->exists()
        ) {

            return redirect()->route('posiciones.index')
                ->with('error', 'No se puede eliminar la posición. Hay jugadores que la utilizan.');
        }

        $posicion->delete();

        return redirect()->route('posiciones.index')->with('success', 'Posicion eliminada correctamente.');
    }
}
