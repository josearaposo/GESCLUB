import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Navigation from '@/Components/Navigation';
import { Link, router } from '@inertiajs/react';

export default function Create({ club }) {
    console.log(club);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [club_id] = useState(club.id);



    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/estadios', { nombre, direccion, capacidad, club_id });
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
                        <h1 className="text-2xl font-bold mb-6">Crear nuevo Estadio</h1>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded px-8 pt-6 pb-8 mb-4"
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

                            <div>
                                <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700">
                                    Capacidad
                                </label>
                                <input
                                    type="number"
                                    id="capacidad"
                                    value={capacidad}
                                    onChange={(e) => setCapacidad(e.target.value)}
                                    required
                                    step="0.01"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    as="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar
                                </button>
                            </div>
                            <div className="mt-8">
                                <Link
                                    href={route("estadios.index", {
                                        club: club.club_id,

                                    })}
                                    className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-300"
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

