import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';

export default function Create({ division, equipo, jugadores, posiciones }) {
    const { data, setData, post, errors } = useForm({
        division_id: division.id,
        equipo_id: equipo.id,
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
                ? { ...t, jugador_id: jugador_id ? Number(jugador_id) : '' }
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

    // IDs de titulares seleccionados para deshabilitar en suplentes
    const titularesSeleccionados = data.titulares
        .map(t => t.jugador_id)
        .filter(id => id);

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('partidos.store'));
    };

    //verifica si hay posiciones vacías
    const posicionesIncompletas = data.titulares.some(
        t => !t.jugador_id
    );

    //prioridad por posicion natural
    const jugadoresParaPosicion = (posicionId, titularActualId = null) => {
        //jugadores ya usados en otras posiciones
        const usados = data.titulares
            .map(t => t.jugador_id)
            .filter(id => id && id !== titularActualId);
        //jugadores disponibles
        const disponibles = jugadores.filter(j => !usados.includes(j.id));
        // Los que son naturales para esa posición
        const naturales = disponibles.filter(
            j =>
                j.primera_posicion === posicionId ||
                j.segunda_posicion === posicionId
        );
        // Los que no son naturales para esa posición
        const resto = disponibles.filter(
            j =>
                j.primera_posicion !== posicionId &&
                j.segunda_posicion !== posicionId
        );

        return { naturales, resto };
    };


    return (
        <>
            <Navigation />

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6">
                <h1 className="text-2xl font-bold mb-4">Nuevo Partido</h1>

                <div className="mb-6">
                    <label htmlFor="division_name" className="block text-gray-700 text-sm font-bold mb-2">
                        Division:
                    </label>
                    <input
                        id="division_id"
                        type="text"
                        value={division.nombre}
                        disabled
                        className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-700"
                    />
                    <input type="hidden" name="division_id" value={division.id} />
                </div>

                <div className="mb-6">
                    <label htmlFor="equipo_name" className="block text-gray-700 text-sm font-bold mb-2">
                        Equipo:
                    </label>
                    <input
                        id="equipo_id"
                        type="text"
                        value={equipo.nombre}
                        disabled
                        className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-700"
                    />
                    <input type="hidden" name="equipo_id" value={equipo.id} />
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
                {posicionesIncompletas && (
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-2">
                        Faltan jugadores por asignar en alguna posición
                    </div>
                )}

                <div>
                    <h2 className="text-xl font-semibold mt-4 mb-2">Titulares</h2>
                    <div className="relative w-4/8 h-96"
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

                                        {(() => {
                                            const { naturales, resto } = jugadoresParaPosicion(
                                                p.id,
                                                titular?.jugador_id
                                            );

                                            return (
                                                <>
                                                    {naturales.length > 0 && (
                                                        <optgroup label="Posición Natural">
                                                            {naturales.map(j => (
                                                                <option key={j.id} value={j.id}>
                                                                    {j.apodo}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    )}

                                                    {resto.length > 0 && (
                                                        <optgroup label="Otras opciones">
                                                            {resto.map(j => (
                                                                <option key={j.id} value={j.id}>
                                                                    {j.apodo}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    )}
                                                </>
                                            );
                                        })()}
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
                        {jugadores.map(j => {
                            const esTitular = titularesSeleccionados.includes(j.id);

                            return (
                                <label
                                    key={j.id}
                                    className={`flex items-center gap-2 p-1 rounded transition
                ${esTitular ? 'opacity-50 text-gray-400 cursor-not-allowed' : ''}
            `}
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.suplentes.includes(j.id)}
                                        onChange={() => toggleSuplente(j.id)}
                                        disabled={
                                            esTitular ||
                                            (!data.suplentes.includes(j.id) && data.suplentes.length >= 7)
                                        }
                                    />
                                    <span className={esTitular ? 'line-through' : ''}>
                                        {j.apodo}
                                    </span>
                                </label>
                            );
                        })}

                    </div>
                    {errors.suplentes && <div className="text-red-600">{errors.suplentes}</div>}
                </div>

                <button
                    type="submit"
                    disabled={posicionesIncompletas}
                    className={`px-4 py-2 rounded text-white
        ${posicionesIncompletas
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600'}
    `}
                >
                    Guardar Partido
                </button>

            </form >
        </>
    );
}
