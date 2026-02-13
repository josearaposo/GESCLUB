import React, { useState } from "react";
import { Link, router, usePage } from '@inertiajs/react';
import Navigation from "@/Components/Navigation";

export default function Edit({ division }) {
    const { flash } = usePage().props;
    const [nombre, setNombre] = useState(division.nombre);
    const [numero_equipos, setNumeroEquipos] = useState(
        division.numero_equipos
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/divisiones/${division.id}`, {
            nombre,
            numero_equipos,
        });
    };
    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/divisiones.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32"></div>
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

                <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Equipo</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                            Editar Division
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
                                Numero de Equipos:
                            </label>
                            <input
                                type="text"
                                id="numero_equipos"
                                name="numero_equipos"
                                value={numero_equipos}
                                onChange={(e) => setNumeroEquipos(e.target.value)}
                                required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            />
                        </div>


                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Guardar
                            </button>

                            <Link
                                href={route("divisiones.index", { division: division.id })}
                                className="inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                            >
                                Volver
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
