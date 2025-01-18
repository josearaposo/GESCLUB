import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Navigation from '@/Components/Navigation';

export default function Edit({ equipo, divisiones, clubs}) {
    const [nombre, setNombre] = useState(equipo.nombre);
    const [division_id, setDivisionId] = useState(equipo.division_id);
    const [club_id, setClubId] = useState(equipo.club_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/equipos/${equipo.id}`, { nombre, division_id, club_id });
    };

    return (
        <>

        <div className="container mx-auto p-6">
                <Navigation />
                <h1 className="text-2xl font-bold mb-6">Editar Equipo</h1>

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
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre del equipo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="division_id"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            División:
                        </label>
                        <select
                            id="division_id"
                            name="division_id"
                            value={division_id}
                            onChange={(e) => setDivisionId(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccionar División</option>
                            {divisiones.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="club_id"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Club:
                        </label>
                        <select
                            id="club_id"
                            name="club"
                            value={club_id}
                            onChange={(e) => setClubId(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccionar Club al que pertenece</option>
                            {clubs.map((club) => (
                                <option key={club.id} value={club.id}>
                                    {club.nombre}
                                </option>
                            ))}
                        </select>
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
