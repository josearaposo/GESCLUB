import React, { useState } from "react";
import Navigation from "@/Components/Navigation";
import { Link, router } from "@inertiajs/react";

export default function Edit({ representante }) {
    const [nombre, setNombre] = useState(representante.nombre);
    const [primer_apellido, setPrimerApellido] = useState(
        representante.primer_apellido
    );
    const [segundo_apellido, setSegundoApellido] = useState(
        representante.segundo_apellido
    );
    const [telefono, setTelefono] = useState(representante.telefono);
    const [email, setEmail] = useState(representante.email);
    const [direccion, setDireccion] = useState(representante.direccion);
    const [pais, setPais] = useState(representante.pais);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/representantes/${representante.id}`, {
            nombre,
            primer_apellido,
            segundo_apellido,
            telefono,
            email,
            direccion,
            pais,
        });
    };

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/representantes.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Representante</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-2"
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
                                    htmlFor="primer_apellido"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Primer Apellido:
                                </label>
                                <input
                                    type="text"
                                    id="primer_apellido"
                                    name="primer_apellido"
                                    value={primer_apellido}
                                    onChange={(e) => setPrimerApellido(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="segundo_apellido"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Segundo Apellido:
                                </label>
                                <input
                                    type="text"
                                    id="segundo_apellido"
                                    name="segundo_apellido"
                                    value={segundo_apellido}
                                    onChange={(e) => setSegundoApellido(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="telefono"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Teléfono:
                                </label>
                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="direccion"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Dirección:
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
                                    htmlFor="pais"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    País:
                                </label>
                                <input
                                    type="text"
                                    id="pais"
                                    name="pais"
                                    value={pais}
                                    onChange={(e) => setPais(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                />
                            </div>

                            <div className="justify-end  gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                >
                                    Guardar
                                </button>

                                <Link
                                    href={route("representantes.index")}
                                    className="inline-block bg-gray-700 text-white mx-2 px-4 py-2 rounded hover:bg-gray-800"
                                >
                                    Volver
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
