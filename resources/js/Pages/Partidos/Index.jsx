import React from "react";
import { Link } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";
import { usePage } from "@inertiajs/react";

export default function Index({ equipo, partidos }) {

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
                <h1 className="text-2xl font-bold mb-4">Posiciones</h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href={route("partidos.create", { equipo: equipo.id })}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nuevo Partido
                    </Link>
                </div>

                <h1 className="text-2xl font-bold mb-4">
                    Partidos del equipo {equipo.nombre}
                </h1>

                <div className="bg-white rounded shadow p-4">
                    {partidos.length > 0 ? (
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2">Fecha</th>
                                    <th>División</th>
                                    <th>Rival</th>
                                    <th>Lugar</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partidos.map((partido) => (
                                    <tr key={partido.id} className="border-b">
                                        <td className="py-2">
                                            {new Date(
                                                partido.fecha
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{partido.division?.nombre}</td>
                                        <td>{partido.rival}</td>
                                        <td>{partido.lugar}</td>
                                        <td>
                                            <Link
                                                href={route("partidos.show", {
                                                    partido: partido.id,
                                                })}
                                                className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mt-4"
                                            >
                                                Estadisticas
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay partidos registrados para este equipo.</p>
                    )}
                </div>

            </div>
        </>
    );
}
