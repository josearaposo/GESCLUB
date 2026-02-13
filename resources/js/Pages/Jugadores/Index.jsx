import React from "react";
import { Link } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";
import { usePage } from "@inertiajs/react";
import Jugador from "@/Components/Jugador";

export default function Index({ jugadores, equipo, estado }) {
    const { flash, auth } = usePage().props;
    return (
        <>
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/jugador.jpg')",
                }}>
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
                        <Link
                            href={route(
                                "equipos.show",
                                equipo
                            )}
                            as="button"
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                            Volver
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Gestión de Jugadores
                                <span className="ml-2 text-white">
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
                            <Jugador key={jugador.id} jugador={jugador} auth={auth} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
