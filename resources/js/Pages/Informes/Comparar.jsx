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

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Comparar Informes</h1>

            {/* primer informe*/}
            <div className="mb-4">
                <label className="block font-medium mb-1">Informe 1</label>
                <select
                    value={informe1}
                    onChange={(e) => setInforme1(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Selecciona un informe</option>

                    {jugadores.map((jugador) =>
                        jugador.informes?.map((informe) => (
                            <option
                                key={informe.id}
                                value={informe.id}
                                disabled={informe2 === String(informe.id)}
                            >
                                {jugador.nombre} –{" "}
                                {new Date(informe.created_at).toLocaleDateString()} –{" "}
                                {informe.user?.name ?? "Sin informador"}
                            </option>
                        ))
                    )}
                </select>
            </div>

            {/* segundo informe*/}
            <div className="mb-4">
                <label className="block font-medium mb-1">Informe 2</label>
                <select
                    value={informe2}
                    onChange={(e) => setInforme2(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Selecciona un informe</option>

                    {jugadores.map((jugador) =>
                        jugador.informes?.map((informe) => (
                            <option
                                key={informe.id}
                                value={informe.id}
                                disabled={informe1 === String(informe.id)}
                            >
                                {jugador.nombre} –{" "}
                                {new Date(informe.created_at).toLocaleDateString()} –{" "}
                                {informe.user?.name ?? "Sin informador"}
                            </option>
                        ))
                    )}
                </select>
            </div>

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

