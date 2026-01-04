<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartidoRequest;
use App\Http\Requests\UpdatePartidoRequest;
use App\Models\Partido;
use App\Models\Division;
use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\Posicion;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        $division = Division::findOrFail($request->equipo);
        $equipo = Equipo::findOrFail($request->equipo);
        $jugadores = Jugador::all();
        $posiciones = Posicion::where('activo', true)
            ->orderByRaw("CASE WHEN nombre = 'PT' THEN 0 ELSE 1 END") // Portero primero
            ->orderBy('id') //
            ->get();

        if ($posiciones->count() !== 11) {
            return redirect()->route('posiciones.index')
                ->with('error', 'No tienes 11 posiciones activas para crear un partido.');
        } else {

            return inertia(
                'Partidos/Create',
                [
                    'jugadores' => $jugadores,
                    'division' => $division,
                    'equipo' => $equipo,
                    'posiciones' => $posiciones,
                ]
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([

            'division_id' => ['required', 'exists:divisiones,id'],
            'equipo_id'   => ['required', 'exists:equipos,id'],
            'rival'       => ['required', 'string', 'max:255'],
            'fecha'       => ['required', 'date'],
            'lugar'       => ['required', 'in:local,visitante'],

            // Titulares 11 jugadores, cada uno con posición y distintos
            'titulares'                => ['required', 'array', 'size:11'],
            'titulares.*.jugador_id'   => ['required', 'exists:jugadores,id', 'distinct'],
            'titulares.*.posicion_id'  => ['required', 'exists:posiciones,id', 'distinct'],

            // Suplentes 7 como maximo jugadores distintos
            'suplentes'          => ['nullable', 'array', 'max:7'],
            'suplentes.*'        => ['exists:jugadores,id', 'distinct'],
        ]);
        //ningún jugador puede estar en titulares y suplentes a la vez
        $jugadoresTitulares = array_column($validated['titulares'], 'jugador_id');
        $repetidos = array_intersect($jugadoresTitulares, $validated['suplentes'] ?? []);

        if (count($repetidos) > 0) {
            return back()->withErrors([
                'alineacion' => 'Un jugador no puede ser titular y suplente a la vez.'
            ])->withInput();
        }


        $partido = DB::transaction(function () use ($validated) {


            $partido = Partido::create([
                'division_id' => $validated['division_id'],
                'equipo_id'   => $validated['equipo_id'],
                'rival'       => $validated['rival'],
                'fecha'       => $validated['fecha'],
                'lugar'       => $validated['lugar'],
            ]);

            // Guardar titulares con posición
            foreach ($validated['titulares'] as $t) {
                $partido->alineaciones()->create([
                    'jugador_id'  => $t['jugador_id'],
                    'rol'         => 'titular',
                    'posicion_id' => $t['posicion_id'],
                ]);
            }

            // Guardar suplentes (sin posición)
            foreach ($validated['suplentes'] ?? [] as $jugadorId) {
                $partido->alineaciones()->create([
                    'jugador_id'  => $jugadorId,
                    'rol'         => 'suplente',
                    'posicion_id' => null,
                ]);
            }

            return $partido;
        });


        return redirect()
            ->route('partidos.show', $partido)
            ->with('success', 'Partido creado correctamente');
    }


    /**
     * Display the specified resource.
     */
    public function show(Partido $partido)
    {
        $partido->goles_favor = $partido->golesFavor();
        $partido->goles_contra = $partido->golesContra();

        $partido->load([
            'division',
            'equipo',
            'jugadores',
            'estadisticas',
        ]);

        return Inertia::render('Partidos/Show', [
            'partido' => $partido,
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
}
