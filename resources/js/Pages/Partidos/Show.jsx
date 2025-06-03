import React from "react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Show({ partido }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        jugador_id: "",
        tipo: "",
        detalle: "",
        minuto: "",
    });

    const handleEstadisticaSubmit = (e) => {
        e.preventDefault();
        post(route("partidos.estadisticas.guardar", { partido: partido.id }), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const titulares = partido.jugadores.filter(
        (j) => j.pivot.rol === "titular"
    );
    const suplentes = partido.jugadores.filter(
        (j) => j.pivot.rol === "suplente"
    );

    const estadisticasPorJugador = (jugadorId) =>
        partido.estadisticas.filter((e) => e.jugador_id === jugadorId);

    const contarGoles = () => {
        let aFavor = 0;
        let enContra = 0;

        partido.estadisticas.forEach((e) => {
            if (e.tipo === "gol") {
                if (e.detalle?.toLowerCase().includes("encajado")) {
                    enContra++;
                } else {
                    aFavor++;
                }
            }
        });

        return { aFavor, enContra };
    };

    const { aFavor, enContra } = contarGoles();

    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Partido vs {partido.rival} ({partido.lugar}) -{" "}
                    {new Date(partido.fecha).toLocaleDateString()}
                </h1>
                <p className="mb-4">División: {partido.division?.nombre}</p>
                <h2 className="text-xl font-semibold mb-4">
                    Resultado: {aFavor} - {enContra}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Titulares
                        </h2>
                        {titulares.length ? (
                            titulares.map((j) => (
                                <div key={j.id} className="mb-2">
                                    <div className="font-medium">
                                        {j.nombre}
                                    </div>
                                    <ul className="list-disc list-inside text-sm">
                                        {estadisticasPorJugador(j.id).map(
                                            (e) => (
                                                <li key={e.id}>
                                                    {e.tipo} — minuto {e.minuto}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No hay titulares registrados.</p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Suplentes
                        </h2>
                        {suplentes.length ? (
                            suplentes.map((j) => (
                                <div key={j.id} className="mb-2">
                                    <div className="font-medium">
                                        {j.nombre}
                                    </div>
                                    <ul className="list-disc list-inside text-sm">
                                        {estadisticasPorJugador(j.id).map(
                                            (e) => (
                                                <li key={e.id}>
                                                    {e.tipo} — minuto {e.minuto}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No hay suplentes registrados.</p>
                        )}
                    </div>
                </div>
                <div className="mt-8 p-4 bg-gray-50 border rounded">
                    <h2 className="text-lg font-semibold mb-2">
                        Registrar Estadística
                    </h2>
                    <form
                        onSubmit={handleEstadisticaSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block mb-1">Jugador</label>
                            <select
                                value={data.jugador_id}
                                onChange={(e) =>
                                    setData("jugador_id", e.target.value)
                                }
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Selecciona un jugador</option>
                                {partido.jugadores.map((jugador) => (
                                    <option key={jugador.id} value={jugador.id}>
                                        {jugador.nombre} ({jugador.pivot.rol})
                                    </option>
                                ))}
                            </select>
                            {errors.jugador_id && (
                                <p className="text-red-600">
                                    {errors.jugador_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Tipo</label>
                            <select
                                value={data.tipo}
                                onChange={(e) =>
                                    setData("tipo", e.target.value)
                                }
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Selecciona tipo</option>
                                <option value="gol">Gol</option>
                                <option value="asistencia">Asistencia</option>
                                <option value="tarjeta">Tarjeta</option>
                                <option value="cambio">Cambio</option>
                            </select>
                            {errors.tipo && (
                                <p className="text-red-600">{errors.tipo}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">
                                Detalle (opcional)
                            </label>
                            <input
                                type="text"
                                value={data.detalle}
                                onChange={(e) =>
                                    setData("detalle", e.target.value)
                                }
                                className="w-full border p-2 rounded"
                            />
                            {errors.detalle && (
                                <p className="text-red-600">{errors.detalle}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1">Minuto</label>
                            <input
                                type="number"
                                value={data.minuto}
                                onChange={(e) =>
                                    setData("minuto", e.target.value)
                                }
                                className="w-full border p-2 rounded"
                            />
                            {errors.minuto && (
                                <p className="text-red-600">{errors.minuto}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </form>
                </div>

                <Link
                    href={route("partidos.index", {
                        equipo: partido.equipo.id,
                    })}
                    className="inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mt-6"
                >
                    Volver al listado
                </Link>
            </div>
        </>
    );
}
