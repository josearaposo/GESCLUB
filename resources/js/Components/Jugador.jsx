import { Link } from "@inertiajs/react";

export default function Jugador({ jugador, auth }) {
    const rol = auth?.user?.rol;

    return (
        <div className="bg-white border rounded-lg shadow flex flex-col md:flex-row items-center md:items-start p-4 gap-4">
            <img
                src={`/storage/${jugador.imagen || "images/default.jpg"}`}
                alt={`Imagen de ${jugador.nombre}`}
                className="w-24 h-24 object-cover rounded-full border"
            />

            <div className="flex-1">
                <Link href={route("jugadores.show", jugador.id)}>
                    <h3 className="text-xl font-semibold text-gray-800 hover:underline cursor-pointer">
                        {jugador.apodo}
                    </h3>
                </Link>

                <p className="text-gray-600">
                    {jugador.nombre} {jugador.primer_apellido}
                </p>

                <p className="text-sm text-gray-500">
                    Posición: {jugador.primera_posicion?.nombre}
                </p>

                <p className="text-sm text-gray-500">
                    Edad: {new Date().getFullYear() - jugador.year}
                </p>

                {rol === "gestor" && (
                    <p className="text-sm text-gray-500">
                        Valoración: {jugador.valoracion}
                    </p>
                )}
            </div>

            {jugador.estado === "ojeado" && (
                <div className="text-sm text-gray-600">
                    Equipo: {jugador.equipo_externo}
                </div>
            )}

            <div className="flex gap-2 mt-4 md:mt-0">
                {(rol === "gestor" || rol === "informador") && (
                    <>
                        <Link
                            href={route("informes.create", { jugador: jugador.id })}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        >
                            Nuevo Informe
                        </Link>

                        <Link
                            href={route("informes.index", { jugador: jugador.id })}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                            Ver Informes
                        </Link>
                    </>
                )}

                {rol === "gestor" && (
                    <>
                        <Link
                            href={route("jugadores.historial", { jugador: jugador.id })}
                            className="bg-stone-500 text-white px-3 py-1 rounded hover:bg-stone-700 text-sm"
                        >
                            Historial
                        </Link>

                        <Link
                            href={route("jugadores.edit", jugador.id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                        >
                            Editar
                        </Link>
                    </>
                )}

                {(rol === "gestor" || rol === "superadmin") && (
                    <Link
                        href={route("jugadores.destroy", jugador.id)}
                        method="delete"
                        as="button"
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                        Eliminar
                    </Link>
                )}
            </div>
        </div>
    );
}
