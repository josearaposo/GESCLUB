import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Update({ informe, jugador }) {

    const { data, setData, put, errors } = useForm({
        ...informe
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, name === "pros" || name === "contras" ? value : Math.min(10, Math.max(0, Number(value))));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("informes.update", informe.id));
    };

    const grupos = {
        "Técnicos": [
            "centros", "regates", "definicion", "primer_toque", "tiro_libre", "pase_largo", "pase", "penalti", "tecnica"
        ],
        "Físicos": [
            "aereo", "larga_distancia", "aceleracion", "agilidad", "balence", "salto", "corpulencia", "cambio_ritmo", "resistencia"
        ],
        "Mentales": [
            "agresion", "anticipacion", "compostura", "concentracion", "decisiones", "determinacion", "liderazgo", "sin_balon", "posicionamiento", "en_equipo", "vision", "marca", "tackling"
        ]
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Editar Informe de {jugador.nombre}</h2>

            {Object.entries(grupos).map(([grupo, campos]) => (
                <div key={grupo} className="p-4 rounded border bg-yellow-50 border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{grupo}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {campos.map((key) => (
                            <div key={key} className="w-full">
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                    {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                </label>
                                <input
                                    type="number"
                                    name={key}
                                    min={0}
                                    max={10}
                                    value={data[key]}
                                    onChange={handleChange}
                                    className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
                                />
                                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div>
                <label className="block text-sm font-medium text-gray-700">Pros</label>
                <textarea
                    name="pros"
                    value={data.pros}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Contras</label>
                <textarea
                    name="contras"
                    value={data.contras}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
                Actualizar Informe
            </button>
        </form>
    );
}
