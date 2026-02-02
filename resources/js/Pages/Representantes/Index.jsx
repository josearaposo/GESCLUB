import React from "react";
import { Link } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";



export default function Index({ representantes }) {


    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/representantes.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <h1 className="text-2xl sm:text-4xl text-white font-bold mb-4">Gestión de Representantes</h1>


                    <div className="flex justify-end mb-4">
                        <Link
                            href={route('representantes.create')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Nuevo Representante
                        </Link>
                    </div>


                    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                        <table class="w-full text-left table-auto min-w-max">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                    <th className="border border-gray-300 px-4 py-2">Primer Apellido</th>
                                    <th className="border border-gray-300 px-4 py-2">Segundo Apellido</th>
                                    <th className="border border-gray-300 px-4 py-2">Telefono</th>
                                    <th className="border border-gray-300 px-4 py-2">Correo electronico</th>
                                    <th className="border border-gray-300 px-4 py-2">Direccion</th>
                                    <th className="border border-gray-300 px-4 py-2">Pais</th>
                                    <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {representantes.map((representante) => (
                                    <tr key={representante.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{representante.nombre}</td>
                                        <td className="border border-gray-300 px-4 py-2">{representante.primer_apellido}</td>
                                        <td className="border border-gray-300 px-4 py-2">{representante.segundo_apellido}</td>
                                        <td className="border border-gray-300 px-4 py-2">{representante.telefono}</td>
                                        <td className="border border-gray-300 px-4 py-2">{representante.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{representante.direccion}</td>
                                        <td className="border border-gray-300 px-4 py-2">{representante.pais}</td>
                                        <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                            <Link
                                                href={route('representantes.show', representante.id)}
                                                as="button"
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Ver
                                            </Link>

                                            <Link
                                                href={route('representantes.edit', representante.id)}
                                                as="button"
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route('representantes.destroy', representante.id)}
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
            </div>
        </>
    );
}
