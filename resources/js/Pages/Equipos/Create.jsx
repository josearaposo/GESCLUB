import React, { useState } from 'react';
import Navigation from '@/Components/Navigation';
import { router } from '@inertiajs/react';

export default function Create({ divisiones, club }) {
    const [nombre, setNombre] = useState('');
    const [division_id, setDivisionId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/equipos', {
            nombre,
            division_id,
            club_id: club.id, // Aseguramos enviar el ID del club
        });
    };

    return (
        <div className="container mx-auto p-6">
            <Navigation />

            <h1 className="text-2xl font-bold mb-6">Crear Nuevo Equipo</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Nombre */}
                <div className="mb-4">
                    <label
                        htmlFor="nombre"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Nombre del Equipo:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre del equipo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* División */}
                <div className="mb-6">
                    <label
                        htmlFor="division_id"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        División:
                    </label>

                    <div className="flex gap-2">
                        <select
                            id="division_id"
                            value={division_id}
                            onChange={(e) => setDivisionId(e.target.value)}
                            required
                            className="block w-full bg-white border border-gray-400 px-4 py-2 rounded shadow"
                        >
                            <option value="">Seleccionar División</option>
                            {divisiones.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.nombre}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => router.get('/divisiones/create')}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Club fijo (solo mostrar, no editable) */}
                <div className="mb-6">
                    <label
                        htmlFor="club_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Club:
                    </label>

                    {/* Mostramos el nombre del club */}
                    <input
                        id="club_id"
                        type="text"
                        value={club.nombre}
                        disabled
                        className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-700"
                    />

                    {/* Enviamos el id */}
                    <input type="hidden" name="club_id" value={club.id} />
                </div>

                {/* Botón */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

