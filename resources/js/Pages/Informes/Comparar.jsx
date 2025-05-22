import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function Comparar({ jugadores }) {
    const [informe1, setInforme1] = useState("");
    const [informe2, setInforme2] = useState("");

    const handleComparar = () => {
        if (informe1 && informe2) {
            router.get(route("informes.comparacion"), {
                informe1,
                informe2
            });
        }
    };

    const renderSelect = (selected, setSelected, label) => (
        <div className="mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="">Selecciona un informe</option>
                {jugadores.map((jugador) =>
                    jugador.informes.map((informe) => (
                        <option key={informe.id} value={informe.id}>
                            {jugador.nombre} - {informe.created_at}
                        </option>
                    ))
                )}
            </select>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Comparar Informes</h1>

            {renderSelect(informe1, setInforme1, "Informe 1")}
            {renderSelect(informe2, setInforme2, "Informe 2")}

            <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                onClick={handleComparar}
                disabled={!informe1 || !informe2}
            >
                Comparar
            </button>
        </div>
    );
}
