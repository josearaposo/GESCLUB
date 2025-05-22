import React from "react";
import FicharJugador from "./FicharJugador";
import Navigation from "@/Components/Navigation";
import { Link, usePage } from "@inertiajs/react";

export default function Show({ jugador, equipos, traspasos }) {
    const { flash } = usePage().props;
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
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
                <div className="p-6 space-y-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                <div className="mt-8">
                    <Link
                        href={route("jugadores.index", {
                            equipo: jugador.equipo_id, estado: 'fichado'
                        })}
                        className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                    >
                        Volver
                    </Link>
                </div>

                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {jugador.nombre_completo}
                    </h1>
                    <p className="text-lg text-gray-700">
                        Estado actual:{" "}
                        <span className="font-semibold text-indigo-600">
                        {jugador.estado === "fichado"
                                    ? "Plantilla"
                                    : "Seguimiento"}
                        </span>
                    </p>

                    {(jugador.estado === "ojeado" ||
                        jugador.estado === "fichado") && (
                        <div className="mt-8 p-6 bg-indigo-50 rounded-lg shadow-inner">
                            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                                {jugador.estado === "ojeado"
                                    ? "Fichar Jugador"
                                    : "Traspasar Jugador"}
                            </h2>
                            <FicharJugador
                                jugador={jugador}
                                equipos={equipos}
                            />
                        </div>
                    )}
                </div>

                <section className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Historial de Traspasos
                    </h1>

                    {traspasos.length === 0 ? (
                        <p className="text-gray-600 text-center py-10">
                            No hay traspasos registrados.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {traspasos.map((traspaso) => (
                                <li
                                    key={traspaso.id}
                                    className="border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                                >
                                    <p className="text-gray-800">
                                        <strong>Fecha:</strong>{" "}
                                        <time
                                            dateTime={traspaso.fecha_traspaso}
                                        >
                                            {new Date(
                                                traspaso.fecha_traspaso
                                            ).toLocaleDateString()}
                                        </time>
                                    </p>
                                    <p className="text-gray-800">
                                        <strong>Tipo:</strong> {traspaso.tipo}
                                    </p>
                                    <p className="text-gray-800">
                                        <strong>Desde:</strong>{" "}
                                        {traspaso.equipo_origen?.nombre ||
                                            traspaso.equipo_origen_externo ||
                                            "—"}
                                    </p>
                                    <p className="text-gray-800">
                                        <strong>Hacia:</strong>{" "}
                                        {traspaso.equipo_destino?.nombre ||
                                            traspaso.equipo_destino_externo ||
                                            "—"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
}
