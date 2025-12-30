import React, { useState } from 'react';
import Navigation from '@/Components/Navigation';
import { router } from '@inertiajs/react';

export default function Create() {
    const [nombre, setNombre] = useState('');
    const [numero_equipos, setNumeroEquipo] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/divisiones', { nombre, numero_equipos });
    };

    return (
        <>
            <div className="container mx-auto p-6">
                <Navigation />
                <h1 className="text-2xl font-bold mb-6">Crear Nueva Division</h1>

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
                            htmlFor="numero_equipos"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Numero de equipos:
                        </label>
                        <input
                            type="text"
                            id="numero_equipos"
                            name="numero_equipos"
                            placeholder="Nº de equipos"
                            value={numero_equipos}
                            onChange={(e) => setNumeroEquipo(e.target.value)}
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

