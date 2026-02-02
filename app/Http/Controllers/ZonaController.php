<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreZonaRequest;
use App\Http\Requests\UpdateZonaRequest;
use App\Models\Asiento;
use App\Models\Estadio;
use App\Models\Socio;
use App\Models\Zona;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ZonaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $estadio_id = $request->input('estadio');
        $zonas = Zona::where('estadio_id', $estadio_id)->get();

        $ultimoNumero = Socio::max('numero_socio') ?? 0;
        $numeroSocio = $ultimoNumero + 1;

        return Inertia::render('Zonas/Index', [
            'zonas' => $zonas,
            'estadio' => $estadio_id,
            'numero_socio' => $numeroSocio,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $estadio = Estadio::findOrFail($request->input('estadio'));
        return Inertia::render('Zonas/Create', [
            'estadio' => $estadio
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'aforo' => 'integer',
            'filas' => 'integer',
            'estadio_id' => 'required|exists:estadios,id',
        ]);

        $zona = Zona::create($validated);

        $capacidad = $validated['aforo'];
        $filas = $validated['filas'];
        $asientosPorFila = ceil($capacidad / $filas);

        for ($numero = 1; $numero <= $capacidad; $numero++) {
            $fila = intval(ceil($numero / $asientosPorFila)); // calcula la fila correspondiente

            Asiento::create([
                'zona_id' => $zona->id,
                'numero' => $numero,
                'fila' => $fila,
                'estado' => 'Libre',
            ]);
        }
        return redirect()->route('zonas.index', ['estadio' => $validated['estadio_id']]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Zona $zona)
    {
        $zona->load(['asientos' => function ($q) {
            $q->orderBy('numero');
        }, 'asientos.socio']);

        return Inertia::render('Zonas/Show', [
            'zona' => $zona,
            'asientos' => $zona->asientos,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Zona $zona)
    {
        return Inertia::render('Zonas/Edit', [
            'zona' => $zona,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zona $zona)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'aforo' => 'integer',
            'filas' => 'integer',
        ]);
        $zona->update($validated);

        return redirect()->route('zonas.index', ['estadio' => $zona->estadio_id])->with('success', 'Zona actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zona $zona)
    {
        $estadio_id = $zona->estadio_id;
        if ($zona->asientos()->whereHas('socio')->exists()) {
            return redirect()->route('zonas.index', ['estadio' => $estadio_id])->with('error', 'No se puede eliminar la zona porque tiene socios.');
        }

        $zona->delete();
        return redirect()->route('zonas.index', ['estadio' => $estadio_id])->with('success', 'Zona eliminada correctamente.');
    }

    public function asientos(Zona $zona)
    {
        return response()->json($zona->asientos);
    }
}
