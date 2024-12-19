<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepresentanteRequest;
use App\Http\Requests\UpdateRepresentanteRequest;
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
        $representantes = Representante::all();
        return Inertia::render('Representantes/Index', [
            'representantes' => $representantes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
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

        $representante -> update($validated);

        return redirect()->route('representantes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Representante $representante)
    {
        $representante->delete();

        return redirect()->route('representantes.index');
    }
}
