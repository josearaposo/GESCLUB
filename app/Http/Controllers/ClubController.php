<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClubRequest;
use App\Http\Requests\UpdateClubRequest;
use App\Models\Club;
use App\Models\Estadio;
use App\Models\Jugador;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $user = auth()->user();
        $filtro = $request->get('estado', 'activos');

        // Obtener clubes según el rol del usuario
        if ($user->rol === 'superadmin') {
            $clubs = Club::all();
        } else {
            $clubs = Auth::user()
                ->clubes()
                ->when($filtro === 'eliminados', function ($query) {
                    $query->onlyTrashed();
                })
                ->when($filtro === 'activos', function ($query) {
                    $query->whereNull('deleted_at');
                })
                ->orderBy('nombre')
                ->get();
        }


        return Inertia::render('Clubs/Index', [
            'clubs' => $clubs,
            'estado' => $filtro,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Clubs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'estadio' => 'required|string|max:255',
            'presupuesto' => 'required|numeric',
            'contacto' => 'required|string|max:255',
            'web' => 'nullable|url',
            'direccion' => 'nullable|string|max:255',
            'ciudad' => 'nullable|string|max:255',
            'pais' => 'nullable|string|max:255',
            'empleados' => 'nullable|integer',
            'fundacion' => 'nullable|integer|min:1900|max:' . date('Y'),
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('imagen')) {

            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        }

        $club = Club::create($validated);

        $user = auth()->user();
        $user->clubes()->attach($club->id);

        Estadio::create([
            'nombre' => $validated['estadio'],
            'club_id' => $club->id,
            'direccion' => null,
            'capacidad' => null,
        ]);


        return redirect()->route('clubs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Club $club)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Club $club)
    {
        return Inertia::render('Clubs/Edit', [
            'club' => $club,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Club $club)
    {

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'estadio' => 'required|string|max:255',
            'presupuesto' => 'required|numeric',
            'contacto' => 'required|string|max:255',
            'web' => 'nullable|url',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'empleados' => 'nullable|integer',
            'fundacion' => 'nullable|integer|min:1900|max:' . date('Y'),
        ]);
        $club->update($validated);

        return redirect()
            ->route('clubs.index')
            ->with('success', 'Club modificado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Club $club)
    {

        //if ($club->equipos()->exists()) {
        // return redirect()->route('clubs.index')->with('error', 'No se puede eliminar el club porque tiene equipos asociados.');
        // }

        $club->delete();

        return redirect()->route('clubs.index');
    }

    public function restore($id)
    {
        $club = Club::withTrashed()->findOrFail($id);
        $club->restore();

        return redirect()
            ->route('clubs.index')
            ->with('success', 'Club restaurado correctamente.');
    }

    public function acceder(Club $club)
    {
        session(['club' => $club]);

        return redirect()->route('equipos.index');
    }

    public function salir(Club $club)
    {
        session()->forget('club');

        return redirect()->route('clubs.index');
    }
}
