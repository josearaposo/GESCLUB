import React from 'react';
import { router, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Show({ estadistica }) {
    const { data, setData, put, processing } = useForm({
        tipo: estadistica.tipo,
        minuto: estadistica.minuto,
        detalle: estadistica.detalle,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('estadisticas.update', estadistica.id), { preserveScroll: true });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Estadística de {estadistica.jugador.nombre} — {estadistica.tipo}
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    value={data.tipo}
                    onChange={(e) => setData('tipo', e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="gol">Gol</option>
                    <option value="asistencia">Asistencia</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="cambio">Cambio</option>
                </select>

                <input
                    type="number"
                    placeholder="Minuto"
                    value={data.minuto || ''}
                    onChange={(e) => setData('minuto', e.target.value)}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    placeholder="Detalle"
                    value={data.detalle || ''}
                    onChange={(e) => setData('detalle', e.target.value)}
                    className="border rounded p-2"
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Guardar cambios
                </button>
            </form>

            <button
                onClick={() => router.delete(route('estadisticas.destroy', estadistica.id))}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
                Eliminar estadística
            </button>
        </div>
    );
}
