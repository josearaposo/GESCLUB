<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartidoRequest;
use App\Http\Requests\UpdatePartidoRequest;
use App\Models\Partido;
use App\Models\Division;
use App\Models\Equipo;
use App\Models\Jugador;
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
    public function create()
    {
        $divisiones = Division::all();
        $equipos = Equipo::all();
        $jugadores = Jugador::all();

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
        $validated = $request->validate([
            'division_id' => ['required', 'exists:divisiones,id'],
            'equipo_id'   => ['required', 'exists:equipos,id'],
            'rival'       => ['required', 'string', 'max:255'],
            'fecha'       => ['required', 'date'],
            'lugar'       => ['required', 'in:local,visitante'],

            'titulares'   => ['required', 'array', 'size:11'],
            'titulares.*' => ['exists:jugadores,id'],

            'suplentes'   => ['nullable', 'array', 'max:7'],
            'suplentes.*' => ['exists:jugadores,id'],
        ]);

        /**
         * ❌ SEGURIDAD:
         * Ningún jugador puede estar en titulares y suplentes a la vez
         */
        $repetidos = array_intersect(
            $validated['titulares'],
            $validated['suplentes'] ?? []
        );

        if (count($repetidos) > 0) {
            return back()->withErrors([
                'alineacion' => 'Un jugador no puede ser titular y suplente a la vez.'
            ])->withInput();
        }

        $partido = DB::transaction(function () use ($validated) {

            // Crear partido
            $partido = Partido::create([
                'division_id' => $validated['division_id'],
                'equipo_id'   => $validated['equipo_id'],
                'rival'       => $validated['rival'],
                'fecha'       => $validated['fecha'],
                'lugar'       => $validated['lugar'],
            ]);

            // Guardar titulares
            foreach ($validated['titulares'] as $jugadorId) {
                $partido->jugadores()->attach($jugadorId, [
                    'rol' => 'titular'
                ]);
            }

            // Guardar suplentes
            foreach ($validated['suplentes'] ?? [] as $jugadorId) {
                $partido->jugadores()->attach($jugadorId, [
                    'rol' => 'suplente'
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
