import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Navigation from '@/Components/Navigation';
import { router } from '@inertiajs/react';

export default function Edit({ jugador, posiciones, representantes }) {
    const [apodo, setApodo] = useState(jugador.apodo);
    const [nombre, setNombre] = useState(jugador.nombre);
    const [primer_apellido, setPrimerApellido] = useState(jugador.primer_apellido);
    const [segundo_apellido, setSegundoApellido] = useState(jugador.segundo_apellido);
    const [equipo_id, setEquipoId] = useState(jugador.equipo_id);
    const [year, setYear] = useState(jugador.year);
    const [ciudad, setCiudad] = useState(jugador.ciudad);
    const [provincia, setProvincia] = useState(jugador.provincia);
    const [pais, setPais] = useState(jugador.pais);
    const [lateralidad, setLateralidad] = useState(jugador.lateralidad);
    const [altura, setAltura] = useState(jugador.altura);
    const [besoccer, setSoccer] = useState(jugador.besoccer);
    const [internacional, setInternacional] = useState(jugador.internacional);
    const [primera_posicion, setPrimeraPosicion] = useState(jugador.primera_posicion);
    const [segunda_posicion, setSegundaPosicion] = useState(jugador.segunda_posicion);
    const [representante_id, setRepresentanteId] = useState(jugador.representante_id);
    const [salario, setSalario] = useState(jugador.salario);
    const [valor_mercado, setValorMercado] = useState(jugador.valor_mercado);
    const [equipo_externo, setEquipoExterno] = useState(jugador.equipo_externo);
    const [imagen, setImagen] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "put");

        formData.append("apodo", apodo);
        formData.append("nombre", nombre);
        formData.append("primer_apellido", primer_apellido);
        formData.append("segundo_apellido", segundo_apellido || "");
        formData.append("equipo_id", jugador.equipo_id);
        formData.append("equipo_externo", equipo_externo || "");
        formData.append("estado", jugador.estado);
        formData.append("year", year);
        formData.append("ciudad", ciudad || "");
        formData.append("provincia", provincia || "");
        formData.append("pais", pais || "");
        formData.append("lateralidad", lateralidad || "");
        formData.append("altura", altura || "");
        formData.append("besoccer", besoccer || "");
        formData.append("internacional", internacional ? 1 : 0);
        formData.append("primera_posicion", primera_posicion);
        formData.append("segunda_posicion", segunda_posicion || "");
        formData.append("representante_id", representante_id || "");
        formData.append("salario", salario || "");
        formData.append("valor_mercado", valor_mercado || "");

        if (imagen) {
            formData.append("imagen", imagen);
        }

        router.post(route("jugadores.update", jugador.id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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
                    <div>
                        <label
                            htmlFor="apodo"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Apodo
                        </label>
                        <input
                            type="text"
                            id="apodo"
                            value={apodo}
                            onChange={(e) => setApodo(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="primer_apellido"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Primer Apellido
                        </label>
                        <input
                            type="text"
                            id="primer_apellido"
                            value={primer_apellido}
                            onChange={(e) => setPrimerApellido(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="segundo_apellido"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Segundo Apellido
                        </label>
                        <input
                            type="text"
                            id="segundo_apellido"
                            value={segundo_apellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="equipo_id"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Equipo:
                        </label>
                        <input
                            id="equipo_id"
                            type="text"
                            value={jugador.equipo_id}
                            onChange={(e) => setEquipoId(e.target.value)}
                            disabled
                            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-700"
                        />


                        <input type="hidden" name="equipo_id" value={jugador.equipo_id} />
                    </div>

                    <div>
                        <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Año
                        </label>
                        <input
                            type="number"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                            step="0.01"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="ciudad"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ciudad
                        </label>
                        <input
                            type="text"
                            id="ciudad"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="provincia"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Provincia
                        </label>
                        <input
                            type="text"
                            id="provincia"
                            value={provincia}
                            onChange={(e) => setProvincia(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="pais"
                            className="block text-sm font-medium text-gray-700"
                        >
                            País
                        </label>
                        <input
                            type="text"
                            id="pais"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lateralidad"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Lateralidad
                        </label>
                        <input
                            type="text"
                            id="lateralidad"
                            value={lateralidad}
                            onChange={(e) => setLateralidad(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="altura"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Altura
                        </label>
                        <input
                            type="number"
                            id="altura"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="besoccer"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Enlace Besoccer
                        </label>
                        <input
                            type="text"
                            id="besoccer"
                            value={besoccer}
                            onChange={(e) => setSoccer(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="internacional"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Internacional
                        </label>
                        <input
                            type="checkbox"
                            id="internacional"
                            checked={internacional}
                            onChange={(e) => setInternacional(e.target.checked)}
                            className="mt-1 block border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="primera_posicion"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Posicion:
                        </label>

                        <select
                            id="primera_posicion"
                            name="primera_posicion"
                            value={primera_posicion ?? ""}
                            onChange={(e) => setPrimeraPosicion(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Posiciones</option>
                            {posiciones.map((posicion) => (
                                <option key={posicion.id} value={posicion.id}>
                                    {posicion.nombre}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="segunda_posicion"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Segunda Posicion:
                        </label>
                        <select
                            id="segunda_posicion"
                            name="segunda_posicion"
                            value={segunda_posicion ?? ""}
                            onChange={(e) => setSegundaPosicion(e.target.value)}
                            required
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Posiciones</option>
                            {posiciones.map((posicion) => (
                                <option key={posicion.id} value={posicion.id}>
                                    {posicion.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="representante"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Representante:
                        </label>
                        <div className="flex gap-2">
                            <select
                                id="representante"
                                name="representante"
                                value={representante_id ?? ""}
                                onChange={(e) => setRepresentanteId(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Representante</option>
                                {representantes.map((representante) => (
                                    <option
                                        key={representante.id}
                                        value={representante.id}
                                    >
                                        {representante.nombre}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => Inertia.get('/representantes/create')}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="salario"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Salario
                        </label>
                        <input
                            type="number"
                            id="salario"
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="valor_mercado"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Valor Mercado
                        </label>
                        <input
                            type="number"
                            id="valor_mercado"
                            value={valor_mercado}
                            onChange={(e) => setValorMercado(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    {jugador.imagen && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Imagen actual</p>
                            <img
                                src={`/storage/${jugador.imagen}`}
                                className="w-24 h-24 rounded-full object-cover border"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nueva imagen
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setImagen(e.target.files[0])}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
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
