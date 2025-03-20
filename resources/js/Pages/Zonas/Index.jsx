import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ zonas }) {
    const [selectedZona, setSelectedZona] = useState(null);
    const [asientos, setAsientos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleZonaClick = (zonaId) => {
        setSelectedZona(zonaId);
        setLoading(true);
        fetch(`/zonas/${zonaId}/asientos`)
            .then((response) => {
                if (!response.ok) throw new Error("Error al cargar asientos");
                return response.json();
            })
            .then((data) => setAsientos(data))
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const handleAsientoClick = (asientoId) => {
        if (confirm("¿Desea reservar este asiento?")) {
            Inertia.post("/reservar", { asiento_id: asientoId });
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Venta de Abonos</h1>
            <div className="zonas my-4">
                {zonas.map((zona) => (
                    <button
                        key={zona.id}
                        onClick={() => handleZonaClick(zona.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        {zona.nombre} - ${zona.precio}
                    </button>
                ))}
            </div>
            {selectedZona && (
                <div className="asientos my-4">
                    <h2 className="text-xl font-bold">Asientos en zona seleccionada</h2>
                    {loading ? (
                        <p>Cargando asientos...</p>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(10, 1fr)",
                                gap: "5px",
                            }}
                        >
                            {asientos.map((asiento) => (
                                <button
                                    key={asiento.id}
                                    onClick={() => handleAsientoClick(asiento.id)}
                                    style={{
                                        backgroundColor:
                                            asiento.estado === "Libre"
                                                ? "green"
                                                : "red",
                                        color: "white",
                                    }}
                                    disabled={asiento.estado !== "Libre"}
                                    className="p-2"
                                >
                                    {asiento.numero}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
