import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

export default function Index({ zonas, estadio }) {
    const [selectedZona, setSelectedZona] = useState(null);
    const [asientos, setAsientos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showFormularioSocio, setShowFormularioSocio] = useState(false);
    const [socioData, setSocioData] = useState({
        nombre: "",
        dni: "",
        numero_socio: "",
    });
    const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);

    const handleZonaClick = (zonaId) => {
        const zona = zonas.find((z) => z.id === zonaId);
        setSelectedZona(zona);
        setLoading(true);

        fetch(`/zonas/${zonaId}/asientos`)
            .then((response) => response.json())
            .then((data) => {
                const ordenados = [...data].sort((a, b) => a.numero - b.numero);
                setAsientos(ordenados);
            })
            .catch(() => alert("Error al cargar asientos"))
            .finally(() => setLoading(false));
    };

    const handleAsientoClick = (asientoId) => {
        const asiento = asientos.find((a) => a.id === asientoId);
        if (asiento.estado === "Libre") {
            setAsientoSeleccionado(asiento);
            setShowFormularioSocio(true);
        }
    };

    const handleFormularioChange = (e) => {
        const { name, value } = e.target;
        setSocioData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitSocio = (e) => {
        e.preventDefault();

        if (!socioData.nombre || !socioData.dni || !socioData.numero_socio) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        Inertia.post("/reservar", {
            asiento_id: asientoSeleccionado.id,
            estadio: estadio,
            nombre: socioData.nombre,
            dni: socioData.dni,
            numero_socio: socioData.numero_socio,
        })
            .then(() => {
                setAsientos((prev) =>
                    prev.map((a) =>
                        a.id === asientoSeleccionado.id
                            ? { ...a, estado: "Reservado" }
                            : a
                    )
                );
                setShowFormularioSocio(false);
                setSocioData({ nombre: "", dni: "", numero_socio: "" });
            })
            .catch((error) => {
                alert(error.response?.data?.message || "Error al reservar");
            });
    };

    const dividirAsientosPorFilas = (asientos, filas) => {
        const resultado = [];
        const porFila = Math.ceil(asientos.length / filas);

        for (let i = 0; i < filas; i++) {
            const inicio = i * porFila;
            const fin = inicio + porFila;
            resultado.push(asientos.slice(inicio, fin));
        }

        return resultado;
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Venta de Abonos</h1>

            <div className="flex justify-end mb-4">
                <Link
                    href={route("zonas.create", { estadio })}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Añadir Nueva Zona
                </Link>
            </div>

            <div className="zonas my-4">
                {zonas.map((zona) => (
                    <button
                        key={zona.id}
                        onClick={() => handleZonaClick(zona.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        {zona.nombre} - {zona.precio}€
                    </button>
                ))}
            </div>

            {selectedZona && (
                <div className="asientos my-4">
                    <h2 className="text-xl font-bold mb-2">
                        Asientos en zona: {selectedZona.nombre}
                    </h2>

                    {loading ? (
                        <p>Cargando asientos...</p>
                    ) : (
                        <div className="overflow-x-auto max-w-full space-y-[4px]">
                            {dividirAsientosPorFilas(
                                asientos,
                                selectedZona.filas
                            ).map((filaAsientos, index) => (
                                <div
                                    key={index}
                                    className="flex gap-[2px] items-center"
                                >
                                    <div className="flex gap-[2px]">
                                        {filaAsientos.map((asiento) => (
                                            <button
                                                key={asiento.id}
                                                onClick={() =>
                                                    handleAsientoClick(
                                                        asiento.id
                                                    )
                                                }
                                                className="rounded-sm text-xs text-white"
                                                style={{
                                                    backgroundColor:
                                                        asiento.estado ===
                                                        "Libre"
                                                            ? "green"
                                                            : "red",
                                                    width: "28px",
                                                    height: "28px",
                                                }}
                                                disabled={
                                                    asiento.estado !== "Libre"
                                                }
                                            >
                                                {asiento.numero}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {showFormularioSocio && (
                <div className="my-4 p-4 border border-gray-300 rounded-md">
                    <h3 className="text-lg font-bold mb-2">
                        Formulario de Socio
                    </h3>
                    <form onSubmit={handleSubmitSocio}>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={socioData.nombre}
                                onChange={handleFormularioChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">
                                DNI
                            </label>
                            <input
                                type="text"
                                name="dni"
                                value={socioData.dni}
                                onChange={handleFormularioChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">
                                Número de Socio
                            </label>
                            <input
                                type="text"
                                name="numero_socio"
                                value={socioData.numero_socio}
                                onChange={handleFormularioChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Confirmar Reserva
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowFormularioSocio(false)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                        >
                            Cancelar Reserva
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
