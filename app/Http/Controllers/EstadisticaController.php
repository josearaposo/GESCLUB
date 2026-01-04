<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEstadisticaRequest;
use App\Http\Requests\UpdateEstadisticaRequest;
use App\Models\Estadistica;
use App\Models\Partido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstadisticaController extends Controller
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
    public function store(Request $request, Partido $partido)
    {
        $validated = $request->validate([
            'jugador_id' => ['required', 'exists:jugadores,id'],
            'tipo' => ['required', 'in:gol,asistencia,tarjeta,cambio'],
            'minuto' => ['nullable', 'integer', 'min:0', 'max:120'],
            'detalle' => ['nullable', 'string', 'max:255'],
        ]);

        /**
         *
         * El jugador debe estar alineado en el partido
         */
        $estaAlineado = $partido->jugadores()
            ->where('jugador_id', $validated['jugador_id'])
            ->exists();

        if (!$estaAlineado) {
            return back()->withErrors([
                'jugador_id' => 'El jugador no está alineado en este partido.'
            ]);
        }

        $partido->estadisticas()->create($validated);

        return back()->with('success', 'Estadística añadida');
    }

    /**
     * Display the specified resource.
     */
    public function show(Estadistica $estadistica)
    {
        return Inertia::render('Estadisticas/Show', [
            'estadistica' => $estadistica->load('jugador', 'partido'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estadistica $estadistica)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estadistica $estadistica)
    {
        $request->validate([
            'tipo' => 'required|string',
            'minuto' => 'nullable|integer|min:0|max:120',
            'detalle' => 'nullable|string|max:255',
        ]);

        $estadistica->update([
            'tipo' => $request->tipo,
            'minuto' => $request->minuto,
            'detalle' => $request->detalle,
        ]);

        return redirect()->route('partidos.show', $estadistica->partido_id)
            ->with('success', 'Estadística actualizada');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estadistica $estadistica)
    {
        $partidoId = $estadistica->partido_id;
        $estadistica->delete();

        return redirect()->route('partidos.show', $partidoId)
            ->with('success', 'Estadística eliminada');
    }
}
