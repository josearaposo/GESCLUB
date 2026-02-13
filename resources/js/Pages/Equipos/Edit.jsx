import React, { useState } from 'react';
import Navigation from '@/Components/Navigation';
import { Link, router, useForm, usePage } from '@inertiajs/react';

export default function Edit({ equipo, divisiones, club }) {

    const { flash } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        nombre: equipo.nombre,
        division_id: equipo.division_id,
        club_id: club.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/equipos/${equipo.id}`, data);
    };

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/fondo.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">

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
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="nombre"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Nombre del Equipo:
                                </label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3"
                                />
                                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="division_id"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    División:
                                </label>
                                <select
                                    value={data.division_id}
                                    onChange={(e) => setData('division_id', e.target.value)}
                                    className="block w-full border rounded px-4 py-2"
                                >
                                    {divisiones.map((division) => (
                                        <option key={division.id} value={division.id}>
                                            {division.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.division_id && <p className="text-red-500 text-sm">{errors.division_id}</p>}
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
                                <input type="hidden" value={data.club_id} />
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar
                                </button>

                                <Link
                                    href={route("equipos.index", { club: club.id })}
                                    className="inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
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
