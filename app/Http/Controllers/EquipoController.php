<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipoRequest;
use App\Http\Requests\UpdateEquipoRequest;
use App\Models\Club;
use App\Models\Division;
use App\Models\Equipo;
use App\Models\Partido;
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

        // Control de rror si no hay club seleccionado
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
        $divisiones = Division::all();
        $clubId = Session::get('club');

        $club = Club::findOrFail($clubId);
        $clubs = Club::all();
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

        Equipo::create($validated);

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
        $divisiones = Division::all();
        $clubs = Club::all();
        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
            'divisiones' => $divisiones,
            'clubs' => $clubs,
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

        return redirect()->route('equipos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipo $equipo)
    {
        $equipo->delete();

        return redirect()->route('equipos.index');
    }
}
