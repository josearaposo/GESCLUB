import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";


export default function Index({ club , estadios }) {

    return (

        <>

            <Navigation />
            <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión del Estadio</h1>


            <div className="flex justify-end mb-4">
                <Link
                    href={route('estadios.create', { club: club.id })}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nuevo Estadio
                </Link>
            </div>


            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Direccion</th>
                            <th className="border border-gray-300 px-4 py-2">Capacidad</th>
                            <th className="border border-gray-300 px-4 py-2">Abonados</th>
                        </tr>
                    </thead>
                    <tbody>

                        {estadios.map((estadio) => (
                            <tr key={estadio.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{estadio.nombre}</td>
                                <td className="border border-gray-300 px-4 py-2">{estadio.direccion}</td>
                                <td className="border border-gray-300 px-4 py-2">{estadio.capacidad}</td>
                                <td className="border border-gray-300 px-4 py-2 ">
                                    <Link

                                        href={route('zonas.index', { estadio: estadio.id })}
                                        as="button"
                                        className="bg-cyan-700 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Zona Abonados
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                    <Link
                                        href={route('estadios.show', estadio.id)}
                                        as="button"
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Ver
                                    </Link>

                                    <Link
                                        href={route('estadios.edit', estadio.id)}
                                        as="button"
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </Link>
                                    <Link
                                        href={route('estadios.destroy', estadio.id)}
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
