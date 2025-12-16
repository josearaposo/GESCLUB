import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create({ divisiones, equipos, jugadores, posiciones }) {
    const { data, setData, post, errors } = useForm({
        division_id: '',
        equipo_id: '',
        rival: '',
        fecha: '',
        lugar: 'local',
        titulares: [], // [{ jugador_id, posicion_id }]
        suplentes: [], // [jugador_id]
    });

    // Inicializar titulares con las posiciones
    useEffect(() => {
        if (data.titulares.length === 0 && posiciones.length > 0) {
            setData('titulares', posiciones.map(p => ({
                jugador_id: '',
                posicion_id: p.id
            })));
        }
    }, []);

    // Manejar selección de jugador para cada posición
    const handleTitularChange = (posicion_id, jugador_id) => {
        const nuevosTitulares = data.titulares.map(t =>
            t.posicion_id === posicion_id
                ? { ...t, jugador_id }
                : t
        );
        setData('titulares', nuevosTitulares);
    };

    // Manejar selección de suplentes
    const toggleSuplente = (jugador_id) => {
        const nuevosSuplentes = data.suplentes.includes(jugador_id)
            ? data.suplentes.filter(id => id !== jugador_id)
            : [...data.suplentes, jugador_id];

        setData('suplentes', nuevosSuplentes);
    };

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('partidos.store'));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6">
            <h1 className="text-2xl font-bold mb-4">Nuevo Partido</h1>

            {/* Datos del partido */}
            <div>
                <label>División</label>
                <select
                    className="w-full p-2 border rounded"
                    value={data.division_id}
                    onChange={(e) => setData('division_id', e.target.value)}
                >
                    <option value="">Selecciona</option>
                    {divisiones.map(d => (
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
                    {equipos.map(e => (
                        <option key={e.id} value={e.id}>{e.nombre}</option>
                    ))}
                </select>
                {errors.equipo_id && <div className="text-red-600">{errors.equipo_id}</div>}
            </div>

            <div>
                <label>Rival</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={data.rival}
                    onChange={(e) => setData('rival', e.target.value)}
                />
                {errors.rival && <div className="text-red-600">{errors.rival}</div>}
            </div>

            <div>
                <label>Fecha</label>
                <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={data.fecha}
                    onChange={(e) => setData('fecha', e.target.value)}
                />
                {errors.fecha && <div className="text-red-600">{errors.fecha}</div>}
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
                {errors.lugar && <div className="text-red-600">{errors.lugar}</div>}
            </div>

            {/* Titulares */}
            <div>
                <h2 className="text-xl font-semibold mt-4 mb-2">Titulares</h2>
                <div className="relative w-6/8 h-96"
                    style={{
                        backgroundImage: "url('/imagenes/campofutbol.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {posiciones.map(p => {
                        const titular = data.titulares.find(t => t.posicion_id === p.id);
                        return (
                            <div
                                key={p.id}
                                className="absolute"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <select
                                    value={titular?.jugador_id || ''}
                                    onChange={(e) => handleTitularChange(p.id, e.target.value)}
                                    className="text-xs border rounded p-1"
                                >
                                    <option value="">{p.nombre}</option>
                                    {jugadores.map(j => (
                                        <option key={j.id} value={j.id}>
                                            {j.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
                {errors.titulares && <div className="text-red-600">{errors.titulares}</div>}
            </div>

            {/* Suplentes */}
            <div>
                <h2 className="text-xl font-semibold mt-4 mb-2">Suplentes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {jugadores.map(j => (
                        <label key={j.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.suplentes.includes(j.id)}
                                onChange={() => toggleSuplente(j.id)}
                                disabled={
                                    !data.suplentes.includes(j.id) &&
                                    data.suplentes.length >= 7
                                }
                            />
                            {j.nombre}
                        </label>
                    ))}
                </div>
                {errors.suplentes && <div className="text-red-600">{errors.suplentes}</div>}
            </div>

            {/* Botón guardar */}
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-4">
                Guardar Partido
            </button>
        </form >
    );
}
