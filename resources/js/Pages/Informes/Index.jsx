import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Index({ informes, jugador }) {
    const { auth, flash } = usePage().props;

    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                {/* Mensajes Flash */}
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
                    Informes de {jugador.nombre} {jugador.primer_apellido}
                </h1>

                <div className="grid gap-4">
                    {informes.length === 0 && (
                        <p className="text-gray-500">
                            No hay informes aún para este jugador.
                        </p>
                    )}

                    {informes.map((informe) => {
                        const numericKeys = Object.keys(informe).filter(
                            (key) =>
                                typeof informe[key] === "number" &&
                                !["id", "jugador_id", "user_id"].includes(key)
                        );
                        const promedio = (
                            numericKeys.reduce(
                                (sum, key) => sum + informe[key],
                                0
                            ) / numericKeys.length
                        ).toFixed(2);

                        return (
                            <div
                                key={informe.id}
                                className="bg-white border rounded-lg shadow p-4"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {informe.titulo}
                                </h3>

                                <p className="text-gray-600 mb-2">
                                    {informe.descripcion}
                                </p>

                                <p className="text-sm text-gray-500 mb-2">
                                    Valoración promedio:{" "}
                                    <strong>{promedio}</strong>/10
                                </p>

                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>Autor: {informe.user?.name}</span>

                                    {auth.user.id === informe.user_id && (
                                        <div className="flex gap-2">
                                            <Link
                                                href={route(
                                                    "informes.show",
                                                    informe.id
                                                )}
                                                as="button"
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route(
                                                    "informes.edit",
                                                    informe.id
                                                )}
                                                as="button"
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route(
                                                    "informes.destroy",
                                                    informe.id
                                                )}
                                                method="delete"
                                                as="button"
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Eliminar
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8">
                <Link
                    href={route('jugadores.index', {equipo: jugador.equipo_id})}
                    className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                    Volver
                </Link>
            </div>
            </div>
        </>
    );
}
