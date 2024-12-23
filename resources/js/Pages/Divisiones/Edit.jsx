import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navigation from "@/Components/Navigation";

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
        Inertia.put(`/representantes/${representante.id}`, {
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
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
                >
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Editar Representante
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
