import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";
import { usePage } from "@inertiajs/react";

export default function Index({ jugadores, equipo, estado }) {
    const { flash } = usePage().props;
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                {/* Mensajes flash */}
                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-400 rounded">
                        {flash.success}
                    </div>
                )}

                {flash.error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                        {flash.error}
                    </div>
                )}
                <h1 className="text-2xl font-bold mb-4">
                    Gestión de Jugadores{" "}
                    {estado === "fichado" ? "de la plantilla" : "ojeados"}
                </h1>

                <div className="flex justify-end mb-4 px-3">
                    <Link
                        href={route("jugadores.create", {
                            equipo: equipo,
                            estado: "fichado",
                        })}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nuevo Jugador
                    </Link>
                    <Link
                        href={route("jugadores.create", {
                            equipo: equipo,
                            estado: "ojeado",
                        })}
                        className="bg-amber-300 text-white px-4 ml-2 py-2 rounded hover:bg-amber-600"
                    >
                        Jugador a Ojear
                    </Link>
                </div>

                <div className="space-y-4">
                    {jugadores.map((jugador) => (
                        <div
                            key={jugador.id}
                            className="bg-white border rounded-lg shadow flex flex-col md:flex-row items-center md:items-start p-4 gap-4"
                        >
                            <img
                                src={`/storage/${
                                    jugador.imagen || "images/default.jpg"
                                }`}
                                alt={`Imagen de ${jugador.nombre}`}
                                className="w-24 h-24 object-cover rounded-full border"
                            />

                            <div className="flex-1">
                                <Link
                                    href={route("jugadores.show", jugador.id)}
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 hover:underline cursor-pointer">
                                        {jugador.apodo}
                                    </h3>
                                </Link>
                                <p className="text-gray-600">
                                    {jugador.nombre} {jugador.primer_apellido}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Posición: {jugador.primera_posicion.nombre}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Edad:{" "}
                                    {new Date().getFullYear() - jugador.year}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Valoración: {jugador.valoracion}
                                </p>
                            </div>
                            {jugador.estado === "ojeado" && (
                                <div>Equipo: {jugador.equipo_externo}</div>
                            )}

                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Link
                                    href={route("informes.create", {
                                        jugador: jugador.id,
                                    })}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                >
                                    Nuevo Informe
                                </Link>
                                <Link
                                    href={route("informes.index", {
                                        jugador: jugador.id,
                                    })}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                                >
                                    Ver Informes
                                </Link>
                                <Link
                                    href={route("jugadores.edit", jugador.id)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                                >
                                    Editar
                                </Link>
                                <Link
                                    href={route(
                                        "jugadores.destroy",
                                        jugador.id
                                    )}
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
