import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Index({ posiciones }) {
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
                        href={route("partidos.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Ir al Partido
                    </Link>
                    <Link
                        href={route("posiciones.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nueva Posición
                    </Link>
                </div>

                <div className="flex">
                    {/* Tabla de posiciones */}
                    <div className="w-1/2 overflow-x-auto mr-4">
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
                                        <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                            <Link
                                                href={route("posiciones.show", posicion.id)}
                                                as="button"
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Ver
                                            </Link>
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
                        className="relative w-1/2 h-96"
                        style={{
                            backgroundImage: "url('/imagenes/campofutbol.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {posiciones.map(
                            (posicion) =>
                                posicion.x !== null &&
                                posicion.y !== null && (
                                    <div
                                        key={posicion.id}
                                        className={`absolute w-4 h-4 rounded-full ${obtenerPosicion === posicion.nombre
                                            ? "scale-125"
                                            : ""
                                            }`}
                                        style={{
                                            left: `${posicion.x}%`,
                                            top: `${posicion.y}%`,
                                            transform: "translate(-50%, -50%)",
                                            backgroundColor: posicion.activo ? "white" : "gray",
                                            transition: "transform 0.2s, background-color 0.2s",
                                        }}
                                    ></div>
                                )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
