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
        <Navigation />
        <div>
            <h1>Editar Equipo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <select
                    name="division_id"
                    value={division_id}
                    onChange={(e) => setDivisionId(e.target.value)}
                    required
                >
                    <option value="">Seleccionar División</option>
                    {divisiones.map((division) => (
                        <option key={division.id} value={division.id}>
                            {division.nombre}
                        </option>
                    ))}
                </select>

                <select
                    name="club_id"
                    value={club_id}
                    onChange={(e) => setClubId(e.target.value)}
                    required
                >
                    <option value="">Seleccionar Club</option>
                    {clubs.map((club) => (
                        <option key={club.id} value={club.id}>
                            {club.nombre}
                        </option>
                    ))}
                </select>
                <button type="submit">Actualizar</button>
            </form>
        </div>
        </>
    );
}
