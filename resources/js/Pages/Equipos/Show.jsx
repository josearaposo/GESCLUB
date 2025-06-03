import Navigation from "@/Components/Navigation";
import { Link } from "@inertiajs/react";

export default function Show({ equipo }) {
    return (
        <>
            <Navigation />
            <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-green-700 mb-6">
                    Detalles del Equipo
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Nombre del equipo
                        </p>
                        <h2 className="text-xl font-semibold">
                            {equipo.nombre}
                        </h2>
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
                        <p className="text-gray-500 text-sm">Nº de Jugadores</p>
                        <h2 className="text-xl font-semibold">
                            {equipo.jugadores.length}
                        </h2>
                    </div>
                </div>
                <Link
                    href={route("partidos.index", { equipo: equipo.id })}
                    className="inline-block bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                >
                    Partidos
                </Link>

                <div className="mt-8">
                    <Link
                        href={route("equipos.index", { club: equipo.club.id })}
                        className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </>
    );
}
