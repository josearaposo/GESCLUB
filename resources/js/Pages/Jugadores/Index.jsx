import React from "react";
import { Link } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";
import { usePage } from "@inertiajs/react";

export default function Index({ jugadores, equipo, estado }) {
    const { flash, auth } = usePage().props;
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6 pt-32">
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

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Gestión de Jugadores
                            <span className="ml-2 text-sm text-gray-500">
                                ({estado === "fichado" ? "Plantilla" : "Ojeados"})
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {estado === 'ojeado' && (
                            <Link
                                href={route("jugadores.index", { estado: "fichado", equipo: equipo })}
                                className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded hover:bg-indigo-200 text-sm"
                            >
                                Jugadores Plantilla
                            </Link>
                        )}

                        {estado === 'fichado' && (
                            (auth?.user?.rol === "gestor" || auth?.user?.rol === "informador") && (
                                <Link
                                    href={route("jugadores.index", { estado: "ojeado", equipo: equipo })}
                                    className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded hover:bg-indigo-200 text-sm"
                                >
                                    Jugadores Ojeados
                                </Link>
                            )
                        )}
                        {auth?.user?.rol === "gestor" && (
                            <Link
                                href={route("jugadores.create", { equipo: equipo, estado: "fichado" })}
                                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                            >
                                Nuevo Jugador
                            </Link>
                        )}
                        {(auth?.user?.rol === "gestor" || auth?.user?.rol === "informador") && (
                            <Link
                                href={route("jugadores.create", { equipo: equipo, estado: "ojeado" })}
                                className="bg-amber-500 text-white px-3 py-2 rounded hover:bg-amber-600 text-sm"
                            >
                                🔍 Ojear Jugador
                            </Link>
                        )}
                        {auth?.user?.rol === "gestor" && (
                            <Link
                                href={route("informes.comparar")}
                                className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 text-sm"
                            >
                                📊 Comparar
                            </Link>
                        )}
                    </div>
                </div>
                {jugadores.length === 0 && (
                    <div className="bg-gray-50 border rounded p-6 text-center text-gray-600">
                        No hay jugadores registrados en esta sección.
                    </div>
                )}
                <div className="space-y-4">
                    {jugadores.map((jugador) => (
                        <div
                            key={jugador.id}
                            className="bg-white border rounded-lg shadow flex flex-col md:flex-row items-center md:items-start p-4 gap-4"
                        >
                            <img
                                src={`/storage/${jugador.imagen || "images/default.jpg"
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
                                {auth?.user?.rol === "gestor" && (
                                    <p className="text-sm text-gray-500">
                                        Valoración: {jugador.valoracion}
                                    </p>
                                )}
                            </div>
                            {jugador.estado === "ojeado" && (
                                <div>Equipo: {jugador.equipo_externo}</div>
                            )}

                            <div className="flex gap-2 mt-4 md:mt-0">
                                {(auth?.user?.rol === "gestor" || auth?.user?.rol === "informador") && (
                                    <>
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
                                    </>
                                )}
                                {auth?.user?.rol === "gestor" && (
                                    <>
                                        <Link
                                            href={route("jugadores.historial", {
                                                jugador: jugador.id,
                                            })}
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
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
