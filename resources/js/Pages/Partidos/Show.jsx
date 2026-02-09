
import { Link, router, useForm, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";



export default function Show({ partido, posiciones }) {
    const { auth } = usePage().props;
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
        <>
            <Navigation />
            <div className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/estadisticas.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <h1 className="text-2xl font-bold mb-4">
                        Partido vs {partido.rival} ({partido.lugar}) - {new Date(partido.fecha).toLocaleDateString()}
                    </h1>
                    <p className="mb-4">División: {partido.division?.nombre}</p>
                    <h2 className="text-xl font-bold mb-4">
                        Marcador:{' '}
                        {partido.lugar === 'local'
                            ? `${partido.goles_favor} - ${partido.goles_contra}`
                            : `${partido.goles_contra} - ${partido.goles_favor}`}
                    </h2>
                    {(auth?.user?.rol === "gestor" || auth?.user?.rol === "informador") && (
                        <div className="mt-8 p-4 rounded">
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
                                            {j.apodo}
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
                                    className="md:col-span-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                                >
                                    Guardar estadística
                                </button>
                            </form>
                        </div>
                    )}
                    {/* ITULARES */}
                    <div className="mt-8">

                        <div
                            className="relative w-full max-w-xl h-96 mx-auto"
                            style={{
                                backgroundImage: "url('/imagenes/campofutbol.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            {posiciones.map((p) => {
                                const titular = partido.jugadores.find(
                                    (j) => j.pivot.rol === "titular" && j.pivot.posicion_id === p.id
                                );

                                if (!titular) return null;

                                return (
                                    <div
                                        key={p.id}
                                        className="absolute group"
                                        style={{
                                            left: `${p.x}%`,
                                            top: `${p.y}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        {/* Jugador */}
                                        <Link
                                            href={route("jugadores.show", titular.id)}
                                            className="text-xs bg-black/70 text-white px-2 py-1 rounded cursor-pointer hover:bg-black transition"
                                        >
                                            {titular.apodo}
                                        </Link>

                                        {(() => {
                                            const estadisticas = estadisticasPorJugador(titular.id);
                                            if (!estadisticas.length) return null;

                                            return (
                                                <div className="mt-1 flex flex-wrap gap-1 justify-center text-[10px] bg-white/90 text-black px-1 py-0.5 rounded shadow">
                                                    {estadisticas.map((e) => {
                                                        let icono = "";

                                                        if (e.tipo === "gol") icono = "⚽ ";
                                                        if (e.tipo === "asistencia") icono = "👟 ";
                                                        if (e.tipo === "tarjeta") {
                                                            icono = e.detalle === "roja" ? "🟥 " : "🟨 ";
                                                        }
                                                        if (e.tipo === "cambio") {
                                                            icono = "🔄 ";
                                                        }

                                                        return (
                                                            <span key={e.id}>
                                                                {icono}
                                                                {e.minuto !== null && `${e.minuto}'`}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })()}
                                    </div>

                                );
                            })}
                        </div>
                    </div>
                    {/* SUPLENTES */}
                    <div className="mt-8 max-w-md mx-auto">
                        {suplentes.length ? (
                            <div className="space-y-2">
                                {suplentes.map((j) => {
                                    const stats = estadisticasPorJugador(j.id);

                                    return (
                                        <div
                                            key={j.id}
                                            className="flex items-center justify-between bg-gray-100 rounded px-3 py-1.5 text-sm"
                                        >
                                            <Link
                                                href={route("jugadores.show", j.id)}
                                                className="text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition"
                                            >
                                                {j.apodo}
                                            </Link>

                                            {/* Estadísticas pequeñas */}
                                            {stats.length > 0 && (
                                                <div className="flex items-center gap-1 text-[11px]">
                                                    {stats.map((e) => {
                                                        let icono = "";

                                                        if (e.tipo === "gol") icono = "⚽";
                                                        if (e.tipo === "asistencia") icono = "👟";
                                                        if (e.tipo === "tarjeta") {
                                                            icono = e.detalle === "roja" ? "🟥" : "🟨";
                                                        }
                                                        if (e.tipo === "cambio") {
                                                            icono = "🔄";
                                                        }

                                                        return (
                                                            <span key={e.id}>
                                                                {icono}
                                                                {e.minuto !== null && `${e.minuto}'`}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">No hay suplentes registrados.</p>
                        )}
                    </div>

                    <Link
                        href={route('equipos.show', { equipo: partido.equipo.id })}
                        className="inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 mt-6"
                    >
                        Volver
                    </Link>
                </div>

            </div >

        </>
    );
}
