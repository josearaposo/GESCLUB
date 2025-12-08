import React, { useState } from 'react';
import Navigation from '@/Components/Navigation';
import { router } from '@inertiajs/react';

export default function Create() {
    const [nombre, setNombre] = useState('');
    const [primer_apellido, setPrimerApellido] = useState('');
    const [segundo_apellido, setSegundoApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [pais, setPais] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/representantes', { nombre, primer_apellido, segundo_apellido, telefono, email, direccion, pais });
    };

    return (
        <>
            <div className="container mx-auto p-6">
                <Navigation />
                <h1 className="text-2xl font-bold mb-6">Crear Nuevo Representante</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="primer_apellido"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Primer Apellido:
                        </label>
                        <input
                            type="text"
                            id="primer_apellido"
                            name="primer_apellido"
                            placeholder="Primer Apellido"
                            value={primer_apellido}
                            onChange={(e) => setPrimerApellido(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="segundo_apellido"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Segundo Apellido:
                        </label>
                        <input
                            type="text"
                            id="segundo_apellido"
                            name="segundo_apellido"
                            placeholder="Segundo Apellido (no obligatorio)"
                            value={segundo_apellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="telefono"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Telefono:
                        </label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            placeholder="Telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Correo electronico:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="direccion"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Direccion:
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            placeholder="Direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="pais"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Pais:
                        </label>
                        <input
                            type="text"
                            id="pais"
                            name="pais"
                            placeholder="Pais"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>



                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            as="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

