import { Link } from "@inertiajs/react";

export default function Show({ equipo, partidos }) {
    return (
        <div className="max-w-5xl mx-auto mt-10 space-y-8">

            {/* DATOS DEL EQUIPO */}
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

                    <div>
                        <p className="text-gray-500 text-sm">Jugadores</p>
                        <h2 className="text-xl font-semibold">
                            {equipo.jugadores.length}
                        </h2>
                    </div>
                </div>
            </div>

            {/* PARTIDOS */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Partidos disputados
                    </h2>

                    <Link
                        href={route("partidos.create", { equipo: equipo.id })}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Nuevo Partido
                    </Link>
                </div>

                {partidos.length ? (
                    <table className="w-full table-auto border">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2">Fecha</th>
                                <th>División</th>
                                <th>Rival</th>
                                <th>Lugar</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partidos.map((partido) => (
                                <tr key={partido.id} className="border-t">
                                    <td className="p-2">
                                        {new Date(partido.fecha).toLocaleDateString()}
                                    </td>
                                    <td>{partido.division?.nombre}</td>
                                    <td>{partido.rival}</td>

                                    <td className="capitalize">{partido.lugar}</td>
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
                ) : (
                    <p className="text-gray-500">
                        No hay partidos registrados para este equipo.
                    </p>
                )}
            </div>

            {/* VOLVER */}
            <div>
                <Link
                    href={route("equipos.index", { club: equipo.club.id })}
                    className="inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Volver
                </Link>
            </div>
        </div>
    );
}

