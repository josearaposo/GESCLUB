<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepresentanteRequest;
use App\Http\Requests\UpdateRepresentanteRequest;
use App\Models\Club;
use App\Models\Representante;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepresentanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Representante::class);

        $clubId = session('club');
        $club = Club::find($clubId);

        $representantes = $club->representantes()
            ->orderBy('nombre')
            ->get();

        return Inertia::render('Representantes/Index', [
            'representantes' => $representantes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Representante::class);

        return Inertia::render('Representantes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'primer_apellido' => 'required|string|max:255',
            'segundo_apellido' => 'string|max:255',
            'telefono' => 'string|max:255',
            'email' => 'string|max:255',
            'direccion' => 'string|max:255',
            'pais' => 'required|string|max:255',

        ]);
        $validated['club_id'] = session('club');

        Representante::create($validated);

        return redirect()->route('representantes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Representante $representante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Representante $representante)
    {
        return Inertia::render('Representantes/Edit', [
            'representante' => $representante,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Representante $representante)
    {

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'primer_apellido' => 'required|string|max:255',
            'segundo_apellido' => 'string|max:255',
            'telefono' => 'string|max:255',
            'email' => 'string|max:255',
            'direccion' => 'string|max:255',
            'pais' => 'required|string|max:255',

        ]);

        $representante->update($validated);

        return redirect()->route('representantes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Representante $representante)
    {
        if ($representante->jugadores()->exists()) {
            return redirect()->back()->with(
                'error',
                'No se puede eliminar el representante por que tiene jugadores'
            );
        }

        $representante->delete();

        return redirect()->back()->with(
            'success',
            'Representante eliminado correctamente.'
        );
    }
}
