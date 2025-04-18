import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ equipos, posiciones, representantes }) {
    const [apodo, setApodo] = useState("");
    const [nombre, setNombre] = useState("");
    const [primer_apellido, setPrimerApellido] = useState("");
    const [segundo_apellido, setSegundoApellido] = useState("");
    const [equipo_id, setEquipoId] = useState("");
    const [year, setYear] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [pais, setPais] = useState("");
    const [lateralidad, setLateralidad] = useState("");
    const [altura, setAltura] = useState("");
    const [besoccer, setSoccer] = useState("");
    const [internacional, setInternacional] = useState("");
    const [primera_posicion, setPrimeraPosicion] = useState("");
    const [segunda_posicion, setSegundaPosicion] = useState("");
    const [representante, setRepresentanteId] = useState("");
    const [salario, setSalario] = useState("");
    const [valor_mercado, setValorMercado] = useState("");
    const [fortalezas, setFortalezas] = useState("");
    const [debilidades, setDebilidades] = useState("");
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("apodo", apodo);
        formData.append("nombre", nombre);
        formData.append("primer_apellido", primer_apellido);
        formData.append("segundo_apellido", segundo_apellido || "");
        formData.append("equipo_id", equipo_id);
        formData.append("year", year);
        formData.append("ciudad", ciudad);
        formData.append("provincia", provincia);
        formData.append("pais", pais);
        formData.append("lateralidad", lateralidad);
        formData.append("altura", altura);
        formData.append("besoccer", besoccer);
        formData.append("internacional", internacional ? 1 : 0);
        formData.append("primera_posicion", primera_posicion);
        formData.append("segunda_posicion", segunda_posicion || "");
        formData.append("representante", representante || "");
        formData.append("salario", salario || "");
        formData.append("valor_mercado", valor_mercado || "");
        formData.append("fortalezas", fortalezas || "");
        formData.append("debilidades", debilidades || "");
        formData.append("valoracion", 0.00);
        formData.append("imagen", imagen || "");

        Inertia.post("/jugadores", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Crear Nuevo Jugador
            </h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-6"
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
                        required
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
                    <select
                        id="equipo_id"
                        name="equipo_id"
                        value={equipo_id}
                        onChange={(e) => setEquipoId(e.target.value)}
                        required
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Equipo</option>
                        {equipos.map((equipo) => (
                            <option key={equipo.id} value={equipo.id}>
                                {equipo.nombre}
                            </option>
                        ))}
                    </select>
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
                        value={primera_posicion}
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
                        value={segunda_posicion}
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
                        value={representante}
                        onChange={(e) => setRepresentanteId(e.target.value)}
                        required
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

                <div>
                    <label
                        htmlFor="fortalezas"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Fortalezas
                    </label>
                    <textarea
                        id="fortalezas"
                        value={fortalezas}
                        onChange={(e) => setFortalezas(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label
                        htmlFor="debilidades"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Debilidades
                    </label>
                    <textarea
                        id="debilidades"
                        value={debilidades}
                        onChange={(e) => setDebilidades(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Imagen */}
                <div>
                    <label
                        htmlFor="imagen"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Imagen del Jugador
                    </label>
                    <input
                        type="file"
                        id="imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
