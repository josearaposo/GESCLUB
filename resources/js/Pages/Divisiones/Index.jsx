import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";


export default function Index({ divisiones }) {
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de divisiones</h1>


            <div className="flex justify-end mb-4">
                <Link
                    href={route('divisiones.create')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nueva Division
                </Link>
            </div>


            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Equipos</th>
                            <th className="border border-gray-300 px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {divisiones.map((division) => (
                            <tr key={division.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{division.nombre}</td>
                                <td className="border border-gray-300 px-4 py-2">{division.numero_equipos}</td>
                                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                    <Link
                                        href={route('divisiones.show', division.id)}
                                        as="button"
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Ver
                                    </Link>

                                    <Link
                                        href={route('divisiones.edit', division.id)}
                                        as="button"
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </Link>
                                    <Link
                                        href={route('divisiones.destroy', division.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </Link>
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
