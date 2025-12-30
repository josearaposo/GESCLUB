import React from "react";
import Navigation from "@/Components/Navigation";
import { usePage, Link } from "@inertiajs/react";

export default function Index({ equipos, club }) {
    const { flash, auth } = usePage().props;
    const clubNombre = equipos[0]?.club?.nombre;
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

                <h1 className="text-2xl font-bold mb-1">
                    Equipos del club
                </h1>
                <p className="text-gray-600 mb-6">
                    {clubNombre}
                </p>

                <div className="flex justify-end mb-4">
                    {auth?.user?.rol === "gestor" && (
                        <>
                            <Link
                                href={route("equipos.create")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Nuevo Equipo
                            </Link>
                            <Link
                                href={route("usuarios.index", { club: club })}
                                className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-600 ml-2"
                            >
                                Informadores
                            </Link>
                        </>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                    Nombre
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    División
                                </th>

                                <th className="border border-gray-300 px-4 py-2">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipos.map((equipo) => (
                                <tr
                                    key={equipo.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {equipo.nombre}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {equipo.division.nombre}
                                    </td>

                                    <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                        <Link
                                            href={route("jugadores.index", {
                                                equipo: equipo.id, estado: "fichado"
                                            })}
                                            as="button"
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Jugadores
                                        </Link>
                                        <Link
                                            href={route(
                                                "equipos.show",
                                                equipo.id
                                            )}
                                            as="button"
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Ver
                                        </Link>
                                        {auth?.user?.rol === "gestor" && (
                                            <>
                                                <Link
                                                    href={route(
                                                        "equipos.edit",
                                                        equipo.id
                                                    )}
                                                    as="button"
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "equipos.destroy",
                                                        equipo.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </Link>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
