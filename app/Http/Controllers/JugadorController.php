<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateJugadorRequest;
use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\Posicion;
use App\Models\Representante;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JugadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $equipoId = $request->input('equipo');

        $jugadores = Jugador::with('primera_posicion')
            ->when($equipoId, function ($query, $equipoId) {
                $query->where('equipo_id', $equipoId);
            })
            ->get();

        return Inertia::render('Jugadores/Index', [
            'jugadores' => $jugadores,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
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
    public function store(Request $request)
    {

        $equipoId = $request->input('equipo');
        $validated = $request->validate([
            'apodo' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'primer_apellido' => 'required|string|max:255',
            'segundo_apellido' => 'nullable|string|max:255',
            'equipo_id' => 'required|exists:equipos,id',
            'year' => 'required|integer',
            'ciudad' => 'required|string|max:255',
            'provincia' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'lateralidad' => 'required|string|max:255',
            'altura' => 'required|integer',
            'besoccer' => 'required|string|max:255',
            'internacional' => 'required|boolean',
            'primera_posicion' => 'required|exists:posiciones,id',
            'segunda_posicion' => 'nullable|exists:posiciones,id',
            'representante' => 'nullable|exists:representantes,id',
            'salario' => 'nullable|integer',
            'valor_mercado' => 'nullable|integer',
            'fortalezas' => 'nullable|string',
            'debilidades' => 'nullable|string',
            'valoracion' => 'nullable|numeric|min:0|max:10',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        } else {
            // Ruta de la imagen por defecto
            $validated['imagen'] = 'images/default.jpg';
        }
        Jugador::create($validated);

        return redirect()->route('jugadores.index', $equipoId)->with('success', 'Jugador creado correctamente.');
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

        $equipos = Equipo::all();
        $posiciones = Posicion::all();
        $representantes = Representante::all();
        return Inertia::render('Jugadores/Edit', [
            'jugador' => $jugador,
            'equipos' => $equipos,
            'posiciones' => $posiciones,
            'representantes' => $representantes

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jugador $jugador)
    {
        $validated = $request->validate([
            'apodo' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'primer_apellido' => 'required|string|max:255',
            'segundo_apellido' => 'nullable|string|max:255',
            'equipo_id' => 'required|exists:equipos,id',
            'year' => 'required|integer',
            'ciudad' => 'required|string|max:255',
            'provincia' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'lateralidad' => 'required|string|max:255',
            'altura' => 'required|integer',
            'besoccer' => 'required|string|max:255',
            'internacional' => 'required|boolean',
            'primera_posicion' => 'required|exists:posiciones,id',
            'segunda_posicion' => 'nullable|exists:posiciones,id',
            'representante' => 'nullable|exists:representantes,id',
            'salario' => 'nullable|integer',
            'valor_mercado' => 'nullable|integer',
            'fortalezas' => 'nullable|string',
            'debilidades' => 'nullable|string',
            'valoracion' => 'nullable|numeric|min:0|max:10',
            'imagen' => 'nullable|string|max:255',
        ]);


        $jugador->update($validated);

        return redirect()->route('jugadores.index') ->with('success', 'Jugador modificado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugador $jugador)
    {

        if ($jugador->informes()->exists()) {
            return redirect()->route('jugadores.index')->with('error', 'No se puede eliminar el jugador porque tiene informes asociados.');
        }

        $jugador->delete();

        return redirect()->route('jugadores.index')->with('success', 'Jugador eliminado correctamente.');
    }
}
