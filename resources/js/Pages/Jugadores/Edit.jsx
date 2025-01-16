import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Navigation from '@/Components/Navigation';

export default function Edit({ jugador, equipos, posiciones, representantes}) {
    const [apodo, setApodo] = useState(jugador.apodo);
    const [nombre, setNombre] = useState(jugador.nombre);
    const [equipo_id, setEquipoId] = useState(jugador.equipo_id);
    const [posicion_id, setPosicionId] = useState(jugador.primera_posicion);
    const [representante_id, setRepresentanteId] = useState(jugador.representante_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/jugadores/${jugador.id}`, { apodo, nombre, equipo_id, posicion_id, representante_id });
    };

    return (
        <>

        <div className="container mx-auto p-6">
                <Navigation />
                <h1 className="text-2xl font-bold mb-6">Editar Jugador</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="apodo"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Apodo:
                        </label>
                        <input
                            type="text"
                            id="apodo"
                            name="apodo"
                            placeholder="Apodo del jugador"
                            value={apodo}
                            onChange={(e) => setApodo(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

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
                            placeholder="Nombre del jugador"
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
                            Equipo:
                        </label>
                        <select
                            id="equipo_id"
                            name="equipo_id"
                            value={equipo_id}
                            onChange={(e) => setEquipoId(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccionar Equipo</option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.id}>
                                    {equipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="club_id"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Posicion:
                        </label>
                        <select
                            id="posicion_id"
                            name="club"
                            value={posicion_id}
                            onChange={(e) => setPosicionId(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccionar Posicion</option>
                            {posiciones.map((posicion) => (
                                <option key={posicion.id} value={posicion.id}>
                                    {posicion.nombre}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="mb-6">
                        <label
                            htmlFor="club_id"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Representante:
                        </label>
                        <select
                            id="posicion_id"
                            name="club"
                            value={representante_id}
                            onChange={(e) => setRepresentanteId(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Seleccionar representante</option>
                            {representantes.map((representante) => (
                                <option key={representante.id} value={representante.id}>
                                    {representante.nombre}
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
