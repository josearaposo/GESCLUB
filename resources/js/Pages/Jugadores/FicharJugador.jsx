import { useState } from "react";
import { router } from "@inertiajs/react";

export default function FicharJugador({ jugador, equipos }) {
    const [equipoId, setEquipoId] = useState("");
    const [equipoExterno, setEquipoExterno] = useState("");
    const [tipo, setTipo] = useState("fichaje");

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(`/jugadores/${jugador.id}/fichar`, {
            equipo_id: equipoId || null,
            equipo_destino_externo: equipoExterno || null,
            tipo,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Equipo registrado */}
            <div>
                <label className="block font-medium">Equipo destino (registrado):</label>
                <select
                    className="border rounded px-2 py-1 w-full"
                    value={equipoId}
                    onChange={(e) => setEquipoId(e.target.value)}
                >
                    <option value="">-- Selecciona un equipo --</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Equipo externo */}
            {!equipoId && (
                <div>
                    <label className="block font-medium">Equipo externo:</label>
                    <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={equipoExterno}
                        onChange={(e) => setEquipoExterno(e.target.value)}
                        placeholder="Nombre del equipo externo"
                    />
                </div>
            )}

            <div>
                <label className="block font-medium">Tipo de traspaso:</label>
                <select
                    className="border rounded px-2 py-1 w-full"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="fichaje">Fichaje</option>
                    <option value="cesion">Cesión</option>
                    <option value="libre">Libre</option>
                    <option value="filial">Filial</option>
                </select>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Traspaso
            </button>
        </form>
    );
}
