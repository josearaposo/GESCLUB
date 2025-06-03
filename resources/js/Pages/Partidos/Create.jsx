import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Create({ divisiones, equipos, jugadores }) {
    const { data, setData, post, errors } = useForm({
        division_id: '',
        equipo_id: '',
        rival: '',
        fecha: '',
        lugar: 'local',
        titulares: [],
        suplentes: [],
    });

    const toggleSeleccion = (id, rol) => {
        const otroRol = rol === 'titulares' ? 'suplentes' : 'titulares';

        setData({
            ...data,
            [rol]: data[rol].includes(id)
                ? data[rol].filter((x) => x !== id)
                : [...data[rol], id],
            [otroRol]: data[otroRol].filter((x) => x !== id), // quitar del otro grupo
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('partidos.store'));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6">
            <h1 className="text-2xl font-bold">Nuevo Partido</h1>

            <div>
                <label>División</label>
                <select
                    className="w-full p-2 border rounded"
                    value={data.division_id}
                    onChange={(e) => setData('division_id', e.target.value)}
                >
                    <option value="">Selecciona</option>
                    {divisiones.map((d) => (
                        <option key={d.id} value={d.id}>{d.nombre}</option>
                    ))}
                </select>
                {errors.division_id && <div className="text-red-600">{errors.division_id}</div>}
            </div>

            <div>
                <label>Equipo</label>
                <select
                    className="w-full p-2 border rounded"
                    value={data.equipo_id}
                    onChange={(e) => setData('equipo_id', e.target.value)}
                >
                    <option value="">Selecciona</option>
                    {equipos.map((e) => (
                        <option key={e.id} value={e.id}>{e.nombre}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Rival</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={data.rival}
                    onChange={(e) => setData('rival', e.target.value)}
                />
            </div>

            <div>
                <label>Fecha</label>
                <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={data.fecha}
                    onChange={(e) => setData('fecha', e.target.value)}
                />
            </div>

            <div>
                <label>Lugar</label>
                <select
                    className="w-full p-2 border rounded"
                    value={data.lugar}
                    onChange={(e) => setData('lugar', e.target.value)}
                >
                    <option value="local">Local</option>
                    <option value="visitante">Visitante</option>
                </select>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Titulares (11)</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {jugadores.map((j) => (
                        <label key={j.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.titulares.includes(j.id)}
                                onChange={() => toggleSeleccion(j.id, 'titulares')}
                                disabled={
                                    !data.titulares.includes(j.id) && data.titulares.length >= 11
                                }
                            />
                            {j.nombre}
                        </label>
                    ))}
                </div>
                {errors.titulares && <div className="text-red-600">{errors.titulares}</div>}
            </div>

            <div>
                <h2 className="text-xl font-semibold mt-4">Suplentes (máx. 7)</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {jugadores.map((j) => (
                        <label key={j.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.suplentes.includes(j.id)}
                                onChange={() => toggleSeleccion(j.id, 'suplentes')}
                                disabled={
                                    !data.suplentes.includes(j.id) && data.suplentes.length >= 7
                                }
                            />
                            {j.nombre}
                        </label>
                    ))}
                </div>
                {errors.suplentes && <div className="text-red-600">{errors.suplentes}</div>}
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Guardar Partido
            </button>
        </form>
    );
}
