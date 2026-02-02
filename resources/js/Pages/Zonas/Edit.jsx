import React, { useState } from "react";
import Navigation from "@/Components/Navigation";
import { router } from "@inertiajs/react";

export default function Edit({ zona }) {
    const [nombre, setNombre] = useState(zona.nombre);
    const [precio, setPrecio] = useState(zona.precio);
    const [aforo, setAforo] = useState(zona.aforo);
    const [filas, setFilas] = useState(zona.filas);



    const handleSubmit = (e) => {
        console.log(route("zonas.update", zona.id));
        e.preventDefault();

        router.put(route("zonas.update", zona.id), {
            nombre,
            precio,
            aforo,
            filas
        });
    };
    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/campogradas.png')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
                        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center">Editar Estadio</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
                        >

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
                                    Precio:
                                </label>
                                <input
                                    type="number"
                                    id="precio"
                                    name="precio"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aforo"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Aforo:
                                </label>
                                <input
                                    type="number"
                                    id="aforo"
                                    name="aforo"
                                    value={aforo}
                                    onChange={(e) => setAforo(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="filas"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Filas:
                                </label>
                                <input
                                    type="number"
                                    id="filas"
                                    name="filas"
                                    value={filas}
                                    onChange={(e) => setFilas(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
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
                </div>
            </div>
        </>
    );
}
