<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Division;
use App\Models\Equipo;
use App\Models\Partido;
use App\Models\Posicion;
use App\Support\PosicionesBase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $club = $request->input('club');

        // si viene desde club guardar en sesión si no ya esta almacenado en la sesión
        if ($club) {
            session(['club' => $club]);
        }
        $club = session('club');

        // Control de error si no hay club seleccionado
        if (!$club) {
            return redirect()->route('clubs.index')
                ->with('error', 'Debes seleccionar un club primero.');
        }
        $equipos = Equipo::with('division', 'club')
            ->when($club, function ($query, $club) {
                $query->where('club_id', $club);
            })
            ->get();

        return Inertia::render('Equipos/Index', [
            'equipos' => $equipos,
            'club' => $club,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Equipo::class);

        $clubId = Session::get('club');
        $divisiones = Division::where('club_id', $clubId)->get();

        $club = Club::findOrFail($clubId);

        return Inertia::render('Equipos/Create', [
            'divisiones' => $divisiones,
            'club' => $club
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'division_id' => 'required|exists:divisiones,id',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $equipo = Equipo::create($validated);
        foreach (PosicionesBase::all() as $posicion) {
            Posicion::create([
                'equipo_id' => $equipo->id,
                'nombre'    => $posicion['nombre'],
                'x'         => $posicion['x'],
                'y'         => $posicion['y'],
            ]);
        }

        return redirect()->route('equipos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {

        $equipo->load('division', 'club', 'jugadores');

        $partidos = Partido::with('division')
            ->where('equipo_id', $equipo->id)
            ->orderBy('fecha', 'desc')
            ->get();

        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo,
            'partidos' => $partidos,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipo $equipo)
    {
        $clubId = Session::get('club');
        $divisiones = Division::where('club_id', $clubId)->get();

        $club = Club::findOrFail($clubId);
        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
            'divisiones' => $divisiones,
            'club' => $club,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipo $equipo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'division_id' => 'required|exists:divisiones,id',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $equipo->update($validated);

        return redirect()->route('equipos.index')->with('success', 'Equipo actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipo $equipo)
    {
        if ($equipo->jugadores()->exists()) {
            return redirect()->back()->with(
                'error',
                'No se puede eliminar el equipo porque tiene jugadores asociados.'
            );
        }

        $equipo->delete();

        return redirect()->back()->with(
            'success',
            'Equipo eliminado correctamente.'
        );
    }
}
