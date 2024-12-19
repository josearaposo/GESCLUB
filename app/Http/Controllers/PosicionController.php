<?php

namespace App\Http\Controllers;

use App\Models\Posicion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosicionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posiciones = Posicion::all();
        return Inertia::render('Posiciones/Index', [
            'posiciones' => $posiciones
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posiciones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        Posicion::create($validated);

        return redirect()->route('posiciones.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Posicion $posicion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Posicion $posicion)
    {

        return Inertia::render('Posiciones/Edit', [
            'posicion' => $posicion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Posicion $posicion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Posicion $posicion)
    {
        //
    }
}
