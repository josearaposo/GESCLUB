<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJugadorRequest;
use App\Http\Requests\UpdateJugadorRequest;
use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\Posicion;
use App\Models\Representante;
use Inertia\Inertia;

class JugadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jugadores = Jugador::all();
        return Inertia::render('Jugadores/Index', [
            'jugadores' => $jugadores
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $equipos = Equipo::all();
        $posiciones = Posicion::all();
        $representantes = Representante::all();
        return Inertia::render('Jugadores/Create', [
            'equipos' => $equipos,
            'posiciones' => $posiciones,
            'representantes' => $representantes

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJugadorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Jugador $jugador)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jugador $jugador)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJugadorRequest $request, Jugador $jugador)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugador $jugador)
    {
        //
    }
}
