<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipoRequest;
use App\Http\Requests\UpdateEquipoRequest;
use App\Models\Club;
use App\Models\Division;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $club = $request->input('club');

        $equipos = Equipo::with('division', 'club')
            ->when($club, function ($query, $club) {
                $query->where('club_id', $club);
            })
            ->get();

        return Inertia::render('Equipos/Index', [
            'equipos' => $equipos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $divisiones = Division::all();
        $clubs = Club::all();
        return Inertia::render('Equipos/Create', [
            'divisiones' => $divisiones,
            'clubs' => $clubs
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
        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo
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
