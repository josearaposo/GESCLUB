<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDivisionRequest;
use App\Http\Requests\UpdateDivisionRequest;
use App\Models\Club;
use App\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class DivisionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clubId = Session::get('club');

        $club = Club::findOrFail($clubId);

        $divisiones = $club->equipos() // Obtener los equipos del club
            ->with('division') // Cargar la relación de division en cada equipo
            ->get()
            ->pluck('division')
            ->values();

        return Inertia::render('Divisiones/Index', [
            'divisiones' => $divisiones
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Divisiones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'numero_equipos' => 'integer',
        ]);

        Division::create($validated);

        return redirect()->route('divisiones.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Division $division)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Division $division)
    {

        return Inertia::render('Divisiones/Edit', [
            'division' => $division,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Division $division)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'numero_equipos' => 'integer',
        ]);

        $division->update($validated);

        return redirect()->route('divisiones.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Division $division)
    {
        //
    }
}
