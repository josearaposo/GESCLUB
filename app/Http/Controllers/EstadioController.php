<?php

namespace App\Http\Controllers;


use App\Models\Club;
use App\Models\Estadio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EstadioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $club_id = $request->input('club');

        // si viene desde club guardar en sesión si no ya esta almacenado en la sesión
        if (!$club_id) {
            $club_id = session('club');
        }
        session(['club' => $club_id]);
        $estadios = Estadio::where('club_id', $club_id)->get();
        $club = Club::find($club_id);

        return Inertia::render('Estadios/Index', [
            'club' => $club,
            'estadios' => $estadios
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $club = Club::findOrFail($request->input('club'));
        return Inertia::render('Estadios/Create', [
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
            'direccion' => 'required|string|max:255',
            'capacidad' => 'integer',
            'club_id' => 'required|exists:clubs,id',
        ]);

        Estadio::create($validated);

        return redirect()->route('estadios.index', ['club' => $validated['club_id']]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Estadio $estadio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estadio $estadio)
    {

        $clubId = $estadio->club_id;
        $club = Club::findOrFail($clubId);

        return Inertia::render('Estadios/Edit', [
            'estadio' => $estadio,
            'club' => $club
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estadio $estadio)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'capacidad' => 'integer',
        ]);

        $estadio->update($validated);

        return redirect()->route('estadios.index', ['club' => $estadio->club_id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estadio $estadio)
    {
        $clubId = $estadio->club_id;
        if ($estadio->zonas()->count() > 0) {
            Session::flash('error', 'No se puede eliminar el estadio porque tiene zonas asociadas.');
            return redirect()->route('estadios.index', ['club' => $clubId]);
        }
        $estadio->delete();

        return redirect()->route('estadios.index', ['club' => $clubId]);
    }
}
