<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Jugador;
use App\Models\Partido;
use App\Models\Posicion;
use App\Models\Representante;
use App\Models\Traspaso;
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
        $estado = $request->input('estado');

        $jugadores = Jugador::with('primera_posicion', 'equipo')
            ->where('estado', $estado)
            ->when($equipoId, function ($query, $equipoId) {
                $query->where('equipo_id', $equipoId);
            })
            ->get();

        return Inertia::render('Jugadores/Index', [
            'jugadores' => $jugadores,
            'equipo' => $equipoId,
            'estado' => $estado,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $estado = $request->input('estado');
        $equipoId = $request->input('equipo');
        $equipo = Equipo::findOrFail($equipoId);
        $posiciones = Posicion::where('equipo_id', $equipo->id)->get();
        $representantes = Representante::all();
        return Inertia::render('Jugadores/Create', [
            'equipo' => $equipo,
            'posiciones' => $posiciones,
            'representantes' => $representantes,
            'estado' => $estado,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Evitar cadenas vacias
        $request->merge([
            'equipo_externo' => $request->filled('equipo_externo') ? $request->equipo_externo : null,
            'segundo_apellido' => $request->filled('segundo_apellido') ? $request->segundo_apellido : null,
            'representante_id' => $request->filled('representante_id') ? $request->representante_id : null,
        ]);

        $equipoId = $request->input('equipo_id');

        $validated = $request->validate([
            'apodo' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'primer_apellido' => 'required|string|max:255',
            'segundo_apellido' => 'nullable|string|max:255',
            'equipo_id' => 'required|exists:equipos,id',
            'equipo_externo' => 'nullable|string|max:255',
            'estado' => 'required',
            'year' => 'required|integer',
            'ciudad' => 'required|string|max:255',
            'provincia' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'lateralidad' => 'required|string|max:255',
            'altura' => 'required|integer',
            'besoccer' => 'nullable|string|max:255',
            'internacional' => 'required|boolean',
            'primera_posicion' => ['required', 'exists:posiciones,id'],
            'segunda_posicion' => ['nullable', 'exists:posiciones,id', 'different:primera_posicion'],
            'representante_id' => 'nullable|exists:representantes,id',
            'salario' => 'nullable|integer',
            'valor_mercado' => 'nullable|integer',
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

        return redirect()->route('equipos.show', ['equipo' => $equipoId])->with('success', 'Jugador modificado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function historial(Jugador $jugador)
    {
        $equipos = Equipo::all();
        $traspasos = $jugador->traspasos()->with(['equipoOrigen', 'equipoDestino'])->get();

        return Inertia::render('Jugadores/Historial', [
            'jugador' => $jugador,
            'equipos' => $equipos,
            'traspasos' => $traspasos,
        ]);
    }


    public function show(Jugador $jugador)
    {
        $partidos = Partido::whereHas('jugadores', function ($q) use ($jugador) {
            $q->where('jugador_id', $jugador->id);
        })
            ->with([
                'division',
                // cargamos SOLO el jugador actual con su pivot
                'jugadores' => function ($q) use ($jugador) {
                    $q->where('jugador_id', $jugador->id);
                },
                'estadisticas' => function ($q) use ($jugador) {
                    $q->where('jugador_id', $jugador->id);
                }
            ])
            ->orderByDesc('fecha')
            ->get();

        return Inertia::render('Jugadores/Show', [
            'jugador' => $jugador,
            'partidos' => $partidos,
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jugador $jugador)
    {

        $posiciones = Posicion::all();
        $representantes = Representante::all();
        return Inertia::render('Jugadores/Edit', [
            'jugador' => $jugador,
            'posiciones' => $posiciones,
            'representantes' => $representantes

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jugador $jugador)
    {
        $equipoId = $jugador->equipo_id;
        $validated = $request->validate([
            'apodo' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'primer_apellido' => 'required|string|max:255',
            'segundo_apellido' => 'nullable|string|max:255',
            'equipo_id' => 'required|exists:equipos,id',
            'equipo_externo' => 'nullable|string|max:255',
            'year' => 'required|integer',
            'ciudad' => 'required|string|max:255',
            'provincia' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'lateralidad' => 'required|string|max:255',
            'altura' => 'required|integer',
            'besoccer' => 'nullable|string|max:255',
            'internacional' => 'required|boolean',
            'primera_posicion' => ['required', 'exists:posiciones,id'],
            'segunda_posicion' => ['nullable', 'exists:posiciones,id', 'different:primera_posicion'],
            'representante' => 'nullable|exists:representantes,id',
            'salario' => 'nullable|integer',
            'valor_mercado' => 'nullable|integer',
            'valoracion' => 'nullable|numeric|min:0|max:10',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        }

        $jugador->update($validated);

        return redirect()->route('equipos.show', ['equipo' => $equipoId])->with('success', 'Jugador modificado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugador $jugador)
    {

        $this->authorize('delete', $jugador);

        if ($jugador->informes()->exists()) {
            return redirect()->route('jugadores.index')->with('error', 'No se puede eliminar el jugador porque tiene informes asociados.');
        }

        $jugador->delete();

        return redirect()->route('jugadores.index')->with('success', 'Jugador eliminado correctamente.');
    }

    public function fichar(Request $request, Jugador $jugador)
    {
        // Verifica que el jugador esté ojeado antes de ficharlo

        if ($jugador->estado === 'ojeado') {
            if ($request->equipo_id != null) {

                $jugador->estado = 'fichado';
                $jugador->equipo_id = $request->equipo_id;

                Traspaso::create([
                    'jugador_id' => $jugador->id,
                    'equipo_origen_id' => null,
                    'equipo_destino_id' => $request->equipo_id,
                    'equipo_origen_externo' => $jugador->equipo_externo,
                    'equipo_destino_externo' => null,
                    'fecha_traspaso' => now(),
                    'tipo' => $request->tipo,
                ]);
            } else {
                //Fichaje a otro equipo externo
                if ($request->equipo_destino_externo != "") {

                    $anteriorEquipo = $jugador->equipo_externo;
                    $jugador->equipo_externo = $request->equipo_destino_externo;
                    $jugador->save();

                    Traspaso::create([
                        'jugador_id' => $jugador->id,
                        'equipo_origen_id' => null,
                        'equipo_destino_id' => null,
                        'equipo_origen_externo' => $anteriorEquipo,
                        'equipo_destino_externo' => $request->equipo_destino_externo,
                        'fecha_traspaso' => now(),
                        'tipo' => $request->tipo,
                    ]);

                    return redirect()->route('jugadores.index', [
                        'equipo' => $jugador->equipo->id,
                        'estado' => 'ojeado',
                    ])->with('success', 'Traspaso registrado correctamente.');
                }
                return redirect()->route('jugadores.index', [
                    'equipo' => $jugador->equipo->id,
                    'estado' => 'ojeado',
                ])->with('error', 'Equipo no válido.');
            }


            $jugador->save();
        } else {
            if ($jugador->equipo_id != $request->equipo_id && $request->equipo_destino_externo != "") {
                $jugador->estado = 'ojeado';
                $jugador->equipo_externo = $request->equipo_destino_externo;
                $jugador->save();

                Traspaso::create([
                    'jugador_id' => $jugador->id,
                    'equipo_origen_id' => $jugador->equipo_id,
                    'equipo_destino_id' => $request->equipo_id,
                    'equipo_origen_externo' => null,
                    'equipo_destino_externo' => $request->equipo_destino_externo,
                    'fecha_traspaso' => now(),
                    'tipo' => $request->tipo,
                ]);
            } else {

                return redirect()->route('jugadores.index', [
                    'equipo' => $jugador->equipo->id,
                    'estado' => 'fichado',
                ])->with('error', 'Equipo no válido.');
            }
        }





        return redirect()->route('jugadores.index', [
            'equipo' => $jugador->equipo->id,
            'estado' => 'fichado',
        ])->with('success', 'Jugador fichado correctamente.');
    }
}
