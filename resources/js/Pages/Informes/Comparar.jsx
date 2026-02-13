import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

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
        <>

            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/informadores.jpg')",
                }}>
                < Navigation />
                <div className="max-w-xl container mx-auto p-6 pt-32">

                    <h1 className="text-2xl text-white font-bold mb-4">Comparar Informes</h1>

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
                    <Link
                        href={route("equipos.index",)}
                        className="inline-block bg-gray-700 m-4 text-white px-4 py-2 rounded hover:bg-gray-800"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </>
    );
}

