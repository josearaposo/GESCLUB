
import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";

export default function Index({ posiciones }) {
    const [obtenerPosicion, setObtenerPosicion] = useState(null);


    const posicionCoordenadas = {
        "Portero": { x: 15, y: 50 },
        "Central": { x: 25, y: 50 },
        "Lateral Derecho": { x: 25, y: 80 },
        "Lateral Izquierdo": { x: 25, y: 20 },
        "Carrilero Izquierdo": { x: 35, y: 20 },
        "Carrilero Derecho": { x: 35, y: 80 },
        "Mediocentro": { x: 50, y: 50 },
        "Pivote Defensivo": { x: 40, y: 50 },
        "Interior Izquierdo": { x: 60, y: 20 },
        "Interior Derecho": { x: 60, y: 80 },
        "Extremo Izquierdo": { x: 70, y: 20 },
        "Extremo Derecho": { x: 70, y: 80 },
        "Mediapunta": { x: 70, y: 50 },
        "Delantero": { x: 80, y: 50 },
    };

    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Posiciones</h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href={route('posiciones.create')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nueva Posición
                    </Link>
                </div>

                <div className="flex">

                    <div className="w-1/2 overflow-x-auto mr-4">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                    <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posiciones.map((posicion) => (
                                    <tr
                                        key={posicion.id}
                                        onMouseEnter={() => setObtenerPosicion(posicion.nombre)}
                                        onMouseLeave={() => setObtenerPosicion(null)}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">
                                            {posicion.nombre}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                            <Link
                                                href={route('posiciones.show', posicion.id)}
                                                as="button"
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={route('posiciones.edit', posicion.id)}
                                                as="button"
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route('posiciones.destroy', posicion.id)}
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


                    <div className="relative w-1/2 h-96"
    style={{
        backgroundImage: "url('/imagenes/campofutbol.jpg')",
        backgroundSize:  "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}>
                        {Object.entries(posicionCoordenadas).map(([nombre, coords]) => (
                            <div
                                key={nombre}
                                className={`absolute w-4 h-4 rounded-full ${
                                    obtenerPosicion === nombre
                                        ? "bg-red-500 scale-125"
                                        : "bg-white"
                                }`}
                                style={{
                                    left: `${coords.x}%`,
                                    top: `${coords.y}%`,
                                    transform: "translate(-50%, -50%)",
                                    transition: "transform 0.2s, background-color 0.2s",
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
