import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Navigation from '@/Components/Navigation';

export default function Create({ divisiones }) {
    const [nombre, setNombre] = useState('');
    const [division_id, setDivisionId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/equipos', { nombre, division_id });
    };

    return (
        <>
        <div>
            <Navigation />
            <h1>Crear Nuevo Equipo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del equipo"
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
                <button type="submit">Guardar</button>
            </form>
        </div>
        </>
    );
}
