import Navigation from "@/Components/Navigation";
import { Link, router, usePage } from "@inertiajs/react";


export default function Show({ equipo, partidos }) {
    const puedeCrearPartido = equipo.jugadores.filter(j => j.estado === 'fichado').length >= 11;
    const { auth } = usePage().props;

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/fondo.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-green-700 mb-6">
                            Detalles del Equipo
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-500 text-sm">Nombre</p>
                                <h2 className="text-xl font-semibold">{equipo.nombre}</h2>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">División</p>
                                <h2 className="text-xl font-semibold">
                                    {equipo.division.nombre}
                                </h2>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm">Club</p>
                                <h2 className="text-xl font-semibold">
                                    {equipo.club.nombre}
                                </h2>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-baseline gap-1">
                                    <p className="text-gray-500 text-sm">Jugadores:</p>
                                    <h2 className="text-xl font-semibold"> {equipo.jugadores.filter(j => j.estado === 'fichado').length}</h2>
                                </div>
                                <Link
                                    href={route("jugadores.index", { equipo: equipo.id, estado: "fichado" })}
                                    as="button"
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                >
                                    Plantilla
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* PARTIDOS */}
                    <div className="bg-white rounded-lg  mt-4 shadow-lg p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Partidos disputados
                            </h2>

                            {puedeCrearPartido ? (
                                auth?.user?.rol === "gestor" && (
                                    <Link
                                        href={route("posiciones.index", { equipo: equipo.id })}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        + Nuevo Partido
                                    </Link>
                                )
                            ) : (
                                <span
                                    className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-60"
                                    title="Necesitas al menos 11 jugadores en la plantilla para crear un partido"
                                >
                                    + Nuevo Partido
                                </span>
                            )}
                        </div>

                        {partidos.length ? (
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-[700px] w-full table-auto border">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="p-2">Fecha</th>
                                            <th>División</th>
                                            <th>Rival</th>
                                            <th>Lugar</th>
                                            <th>Resultado</th>
                                            <th className="text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partidos.map((partido) => (
                                            <tr key={partido.id} className="border-t hover:bg-gray-200 cursor-pointer"
                                                onClick={() => router.get(route("partidos.show", partido.id))}>
                                                < td className="p-2" >
                                                    {new Date(partido.fecha).toLocaleDateString()}
                                                </td>
                                                <td>{partido.division?.nombre}</td>
                                                <td>{partido.rival}</td>

                                                <td className="capitalize">{partido.lugar}</td>

                                                <td>
                                                    {partido.lugar === 'local'
                                                        ? `${partido.goles_favor} - ${partido.goles_contra}`
                                                        : `${partido.goles_contra} - ${partido.goles_favor}`}
                                                </td>
                                                <td className="text-right space-x-2 pr-2">
                                                    <Link
                                                        href={route("partidos.show", partido.id)}
                                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                    >
                                                        Datos
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No hay partidos registrados para este equipo.
                            </p>

                        )}

                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Link
                            href={route("equipos.index", { club: equipo.club.id })}
                            className="inline-block bg-gray-700 text-white px-4 mt-4 py-2 rounded hover:bg-gray-800"
                        >
                            Volver
                        </Link>
                    </div>
                </div >
            </div >
        </>
    );
}

