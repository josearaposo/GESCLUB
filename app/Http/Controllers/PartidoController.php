<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartidoRequest;
use App\Http\Requests\UpdatePartidoRequest;
use App\Models\Division;
use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\Partido;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $equipo = Equipo::findOrFail($request->equipo);

        $partidos = Partido::with('division')
            ->where('equipo_id', $equipo->id)
            ->orderByDesc('fecha')
            ->get();

        return Inertia::render('Partidos/Index', [
            'equipo' => $equipo,
            'partidos' => $partidos,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $equipo_id = $request->input('equipo');
        $divisiones = Division::all();
        $equipos = Equipo::all();
        $jugadores = Jugador::where('equipo_id', $equipo_id)->get();

        return Inertia::render('Partidos/Create', [
            'divisiones' => $divisiones,
            'equipos' => $equipos,
            'jugadores' => $jugadores,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $equipo_id = $request->input('equipo');
        $validated = $request->validate([
            'division_id' => ['required', 'exists:divisiones,id'],
            'equipo_id' => ['required', 'exists:equipos,id'],
            'rival' => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'lugar' => ['required', 'in:local,visitante'],
            'titulares' => ['required', 'array', 'size:11'],
            'titulares.*' => ['exists:jugadores,id'],
            'suplentes' => ['nullable', 'array', 'max:7'],
            'suplentes.*' => ['exists:jugadores,id'],
        ]);

        DB::transaction(function () use ($validated) {
            $partido = Partido::create([
                'division_id' => $validated['division_id'],
                'equipo_id' => $validated['equipo_id'],
                'rival' => $validated['rival'],
                'fecha' => $validated['fecha'],
                'lugar' => $validated['lugar'],
            ]);

            // Asociar titulares
            foreach ($validated['titulares'] as $jugadorId) {
                $partido->jugadores()->attach($jugadorId, ['rol' => 'titular']);
            }

            // Asociar suplentes
            if (!empty($validated['suplentes'])) {
                foreach ($validated['suplentes'] as $jugadorId) {
                    $partido->jugadores()->attach($jugadorId, ['rol' => 'suplente']);
                }
            }
        });

        return redirect()->route('equipos.index', ['equipo' => $equipo_id])
                 ->with('success', 'Partido creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Partido $partido)
    {
        $partido->load([
            'division',
            'equipo',
            'jugadores',
            'estadisticas.jugador'
        ]);

        return Inertia::render('Partidos/Show', [
            'partido' => $partido
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partido $partido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePartidoRequest $request, Partido $partido)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partido $partido)
    {
        //
    }

    public function guardarEstadistica(Request $request, Partido $partido)
{
    $request->validate([
        'jugador_id' => 'required|exists:jugadores,id',
        'tipo' => 'required|in:gol,asistencia,tarjeta,cambio',
        'detalle' => 'nullable|string|max:255',
        'minuto' => 'nullable|integer|min:0|max:120',
    ]);

    $partido->estadisticas()->create([
        'jugador_id' => $request->jugador_id,
        'tipo' => $request->tipo,
        'detalle' => $request->detalle,
        'minuto' => $request->minuto,
    ]);

    return back()->with('success', 'Estadística registrada correctamente.');
}

}
