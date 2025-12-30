import React, { use } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Show({ partido }) {
    const titulares = partido.jugadores.filter(j => j.pivot.rol === 'titular');
    const suplentes = partido.jugadores.filter(j => j.pivot.rol === 'suplente');

    const estadisticasPorJugador = (jugadorId) =>
        partido.estadisticas.filter(e => e.jugador_id === jugadorId);

    const jugadoresDisponibles = partido.jugadores;
    const { data, setData, post, processing, errors, reset } = useForm({
        jugador_id: '',
        tipo: '',
        minuto: '',
        detalle: '',
    });


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Partido vs {partido.rival} ({partido.lugar}) - {new Date(partido.fecha).toLocaleDateString()}
            </h1>
            <p className="mb-4">División: {partido.division?.nombre}</p>
            <h2 className="text-xl font-bold mb-4">
                Marcador: {partido.goles_favor} - {partido.goles_contra}
            </h2>
            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h2 className="text-lg font-semibold mb-4">
                    Añadir estadística
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route('partidos.estadisticas.store', partido.id), {
                            preserveScroll: true,
                            onSuccess: () => reset(),
                        });
                    }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    <select
                        value={data.jugador_id}
                        onChange={(e) => setData('jugador_id', e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">Jugador</option>
                        {jugadoresDisponibles.map(j => (
                            <option key={j.id} value={j.id}>
                                {j.nombre}
                            </option>
                        ))}
                    </select>

                    <select
                        value={data.tipo}
                        onChange={(e) => setData('tipo', e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">Tipo</option>
                        <option value="gol">Gol</option>
                        <option value="asistencia">Asistencia</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="cambio">Cambio</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Minuto"
                        value={data.minuto}
                        onChange={(e) => setData('minuto', e.target.value)}
                        className="border rounded p-2"
                    />

                    <input
                        type="text"
                        placeholder="Detalle"
                        value={data.detalle}
                        onChange={(e) => setData('detalle', e.target.value)}
                        className="border rounded p-2"
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Guardar estadística
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Titulares</h2>
                    {titulares.length ? (
                        titulares.map(j => {
                            const stats = estadisticasPorJugador(j.id);

                            return (
                                <div key={j.id} className="mb-3">
                                    <div className="font-medium">{j.nombre}</div>

                                    {stats.length ? (
                                        <ul className="list-disc list-inside text-sm">
                                            {stats.map(e => (
                                                <li key={e.id}>
                                                    {e.tipo}
                                                    {e.minuto !== null && `  — minuto  ${e.minuto}'`}
                                                    <button
                                                        onClick={() => router.get(route('estadisticas.show', e.id))}
                                                        className="text-blue-600 text-sm hover:underline"
                                                    >
                                                        Editar
                                                    </button>

                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Sin estadísticas
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay titulares registrados.</p>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Suplentes</h2>
                    {suplentes.length ? (
                        suplentes.map(j => (
                            <div key={j.id} className="mb-2">
                                <div className="font-medium">{j.nombre}</div>
                                <ul className="list-disc list-inside text-sm">
                                    {estadisticasPorJugador(j.id).map(e => (
                                        <li key={e.id}>{e.tipo} — minuto {e.minuto}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No hay suplentes registrados.</p>
                    )}
                </div>
            </div>


            <Link
                href={route('partidos.index', { equipo: partido.equipo.id })}
                className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mt-6"
            >
                Volver al listado
            </Link>
        </div>
    );
}
