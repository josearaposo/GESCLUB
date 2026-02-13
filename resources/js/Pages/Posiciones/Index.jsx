import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Index({ posiciones, equipo }) {
    const { flash } = usePage().props;
    const [obtenerPosicion, setObtenerPosicion] = useState(null);

    const toggleActivo = (posicionId, activo) => {

        router.post(route("posiciones.toggleActivo", posicionId), {
            activo: !activo,
        });
    };

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/fondo.jpg')",
                }}>
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
                    <Link
                        href={route("equipos.show", {
                            equipo: equipo, estado: "fichado"
                        })}
                        className="inline-block bg-white px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Volver
                    </Link>
                    <h1 className="text-4xl text-white font-bold mt-4 mb-4">Posiciones</h1>

                    <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4">
                        <Link
                            href={route("partidos.create", { equipo: equipo.id })}
                            className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
                        >
                            Nuevo Partido
                        </Link>

                        <Link
                            href={route("posiciones.create", { equipo: equipo.id })}
                            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                        >
                            Nueva Posición
                        </Link>
                    </div>


                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Tabla de posiciones */}
                        <div className="w-full lg:w-1/2 overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                        <th className="border border-gray-300 px-4 py-2">Activo</th>
                                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posiciones.map((posicion) => (
                                        <tr key={posicion.id}>
                                            <td
                                                onMouseEnter={() => setObtenerPosicion(posicion.nombre)}
                                                onMouseLeave={() => setObtenerPosicion(null)}
                                                className="border border-gray-300 hover:bg-gray-50 px-4 py-2"
                                            >
                                                {posicion.nombre}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <button
                                                    onClick={() => toggleActivo(posicion.id, posicion.activo)}
                                                    className={`px-3 py-1 rounded text-white ${posicion.activo ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                                                        }`}
                                                >
                                                    {posicion.activo ? "Activo" : "Inactivo"}
                                                </button>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 flex space-x-2 justify-center">

                                                <Link
                                                    href={route("posiciones.edit", posicion.id)}
                                                    as="button"
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={route("posiciones.destroy", posicion.id)}
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

                        {/* Mini campo visual */}
                        <div
                            className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 rounded overflow-hidden"
                            style={{
                                backgroundImage: "url('/imagenes/campofutbol.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >

                            {posiciones
                                .slice() // hacemos copia para no mutar el array original
                                .sort((a, b) => a.id - b.id)
                                .map((posicion) =>
                                    posicion.x !== null &&
                                    posicion.y !== null && (
                                        <div
                                            key={posicion.id}
                                            className={`absolute w-4 h-4 rounded-full ${obtenerPosicion === posicion.nombre ? "scale-125" : ""}`}
                                            style={{
                                                left: `${posicion.x}%`,
                                                top: `${posicion.y}%`,
                                                transform: "translate(-50%, -50%)",
                                                backgroundColor: obtenerPosicion === posicion.nombre
                                                    ? "red"
                                                    : posicion.activo
                                                        ? "white"
                                                        : "gray",
                                                transition: "transform 0.2s, background-color 0.2s",
                                            }}
                                        ></div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
