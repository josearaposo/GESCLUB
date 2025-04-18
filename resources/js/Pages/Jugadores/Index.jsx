import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";

export default function Index({ jugadores }) {
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Gestión de jugadores
                </h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href={route("jugadores.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nuevo Jugador
                    </Link>
                </div>

                <div className="space-y-4">
                    {jugadores.map((jugador) => (
                        <div
                            key={jugador.id}
                            className="bg-white border rounded-lg shadow flex flex-col md:flex-row items-center md:items-start p-4 gap-4"
                        >
                            <img
                                src={`/storage/${jugador.imagen || "images/default.jpg"}`}
                                alt={`Imagen de ${jugador.nombre}`}
                                className="w-24 h-24 object-cover rounded-full border"
                            />

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {jugador.apodo}
                                </h3>
                                <p className="text-gray-600">
                                    {jugador.nombre} {jugador.primer_apellido}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Posición: {jugador.primera_posicion.nombre}
                                </p>
                            </div>

                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Link
                                    href={route("jugadores.show", jugador.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                >
                                    Informe
                                </Link>
                                <Link
                                    href={route("jugadores.edit", jugador.id)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                                >
                                    Editar
                                </Link>
                                    <Link
                                        href={route('jugadores.destroy', jugador.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

