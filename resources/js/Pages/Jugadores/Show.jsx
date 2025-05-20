import React from "react";
import FicharJugador from "./FicharJugador";

export default function Show({ jugador, equipos, traspasos }) {
    return (
        <>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">
                    {jugador.nombre_completo}
                </h1>
                <p>
                    Estado actual: <strong>{jugador.estado}</strong>
                </p>

                {jugador.estado === "ojeado" && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Fichar Jugador
                        </h2>
                        <FicharJugador jugador={jugador} equipos={equipos} />
                    </div>
                )}

                {jugador.estado === "fichado" && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Traspasar Jugador
                        </h2>
                        <FicharJugador jugador={jugador} equipos={equipos} />
                    </div>
                )}
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-4">
                    Historial de Traspasos
                </h1>

                {traspasos.length === 0 ? (
                    <p>No hay traspasos registrados.</p>
                ) : (
                    <ul className="space-y-2">
                        {traspasos.map((traspaso) => (
                            <li
                                key={traspaso.id}
                                className="border p-4 rounded-lg shadow"
                            >
                                <p>
                                    <strong>Fecha:</strong>{" "}
                                    {traspaso.fecha_traspaso}
                                </p>
                                <p>
                                    <strong>Tipo:</strong> {traspaso.tipo}
                                </p>
                                <p>
                                    <strong>Desde:</strong>{" "}
                                    {traspaso.equipo_origen?.nombre || traspaso.equipo_destino_externo}
                                </p>
                                <p>
                                    <strong>Hacia:</strong>{" "}
                                    {traspaso.equipo_destino?.nombre ||
                                        traspaso.equipo_destino_externo ||
                                        "—"}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
