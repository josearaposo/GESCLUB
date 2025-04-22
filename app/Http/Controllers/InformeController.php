<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInformeRequest;
use App\Http\Requests\UpdateInformeRequest;
use App\Models\Informe;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $jugadorId = $request->input('jugador');
        $jugador = Jugador::findOrFail($jugadorId);

        $informes = Informe::with('user')
            ->where('jugador_id', $jugadorId)
            ->get();

        return Inertia::render('Informes/Index', [
            'informes' => $informes,
            'jugador' => $jugador
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $jugadorId = $request->input('jugador');
        $jugador = Jugador::findOrFail($jugadorId);

        return Inertia::render('Informes/Create', [
            'jugador' => $jugador,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $jugadorId = $request->input('jugador_id');
        $jugador = Jugador::findOrFail($jugadorId);
        $validated = $request->validate([
            'jugador_id' => 'required|exists:jugadores,id',

            // Técnicas
            'centros' => 'required|integer|min:0|max:10',
            'regates' => 'required|integer|min:0|max:10',
            'definicion' => 'required|integer|min:0|max:10',
            'primer_toque' => 'required|integer|min:0|max:10',
            'tiro_libre' => 'required|integer|min:0|max:10',
            'aereo' => 'required|integer|min:0|max:10',
            'larga_distancia' => 'required|integer|min:0|max:10',
            'pase_largo' => 'required|integer|min:0|max:10',
            'marca' => 'required|integer|min:0|max:10',
            'pase' => 'required|integer|min:0|max:10',
            'penalti' => 'required|integer|min:0|max:10',
            'tackling' => 'required|integer|min:0|max:10',
            'tecnica' => 'required|integer|min:0|max:10',

            // Físico
            'aceleracion' => 'required|integer|min:0|max:10',
            'agilidad' => 'required|integer|min:0|max:10',
            'balence' => 'required|integer|min:0|max:10',
            'salto' => 'required|integer|min:0|max:10',
            'corpulencia' => 'required|integer|min:0|max:10',
            'cambio_ritmo' => 'required|integer|min:0|max:10',
            'resistencia' => 'required|integer|min:0|max:10',

            // Mental
            'agresion' => 'required|integer|min:0|max:10',
            'anticipacion' => 'required|integer|min:0|max:10',
            'compostura' => 'required|integer|min:0|max:10',
            'concentracion' => 'required|integer|min:0|max:10',
            'decisiones' => 'required|integer|min:0|max:10',
            'determinacion' => 'required|integer|min:0|max:10',
            'liderazgo' => 'required|integer|min:0|max:10',
            'sin_balon' => 'required|integer|min:0|max:10',
            'posicionamiento' => 'required|integer|min:0|max:10',
            'en_equipo' => 'required|integer|min:0|max:10',
            'vision' => 'required|integer|min:0|max:10',

            // Textos
            'pros' => 'required|string',
            'contras' => 'required|string',
        ]);

        $atributosNumericos = collect($validated)->except(['jugador_id', 'user_id', 'pros', 'contras']);
        $promedio = $atributosNumericos->avg();

        $validated['user_id'] = auth()->id();

        Informe::create($validated);

        $informes = $jugador->informes;

        if ($informes->count() > 0) {
            $media = $informes->map(function ($informe) {
                $campos = collect($informe->toArray())
                    ->except(['id', 'jugador_id', 'user_id', 'pros', 'contras', 'created_at', 'updated_at']);
                return $campos->avg();
            })->avg();
            $jugador->valoracion = round($media, 2);
        } else {
            $jugador->valoracion = round($promedio, 2);

        }


        $jugador->save();

        return redirect()
            ->route('jugadores.index')
            ->with('success', 'Informe creado correctamente.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Informe $informe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Informe $informe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInformeRequest $request, Informe $informe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Informe $informe)
    {
        $jugadorId = $informe->jugador_id;
        $informe->delete();

        // Recalcular valoración del jugador
        $jugador = Jugador::find($jugadorId);
        $informes = $jugador->informes;

        if ($informes->count()) {
            $media = $informes->map(function ($informe) {
                $campos = collect($informe->toArray())
                    ->except(['id', 'jugador_id', 'user_id', 'pros', 'contras', 'created_at', 'updated_at']);
                return $campos->avg();
            })->avg();
            $jugador->valoracion = round($media, 2);
        } else {
            $jugador->valoracion = 0;

        }

        $jugador->save();

        return redirect()->route('informes.index', [ 'jugador' => $jugador])->with('success', 'Informe eliminado correctamente.');
    }
}
