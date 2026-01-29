import React, { useState } from "react";
import Navigation from "@/Components/Navigation";
import { router } from "@inertiajs/react";

export default function Edit({ estadio, club }) {
    const [nombre, setNombre] = useState(estadio.nombre);
    const [direccion, setDireccion] = useState(estadio.direccion);
    const [capacidad, setCapacidad] = useState(estadio.capacidad);

    const handleSubmit = (e) => {
        console.log(route("estadios.update", estadio.id));
        e.preventDefault();

        router.put(route("estadios.update", estadio.id), {
            nombre,
            direccion,
            capacidad,
            club_id: club.id
        });
    };
    return (
        <>
            <Navigation />
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
                >
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Editar Estadio
                    </h2>

                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="numero_equipos"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Direccion:
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="capacidad"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Capacidad:
                        </label>
                        <input
                            type="number"
                            id="capacidad"
                            name="capacidad"
                            value={capacidad}
                            onChange={(e) => setCapacidad(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="club_name" className="block text-gray-700 text-sm font-bold mb-2">
                            Club:
                        </label>
                        <input
                            id="club_id"
                            type="text"
                            value={club.nombre}
                            disabled
                            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-700"
                        />
                        <input type="hidden" name="club_id" value={club.id} />
                    </div>


                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
