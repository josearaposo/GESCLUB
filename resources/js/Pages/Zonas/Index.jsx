import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Index({ zonas, estadio }) {
    const { flash } = usePage().props;
    const [flashLocal, setFlashLocal] = useState(null);
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

    const handleDelete = (id) => {
        router.delete(route("zonas.destroy", id));

    };

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
            setFlashLocal(null);
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
        if (!validarDNI(socioData.dni)) {
            setFlashLocal({
                type: "error",
                message: "El DNI no es válido",
            });
            return;
        }
        setFlashLocal(null);
        router.post("/reservar", {
            asiento_id: asientoSeleccionado.id,
            estadio: estadio,
            nombre: socioData.nombre,
            dni: socioData.dni,
            numero_socio: socioData.numero_socio,
        }, {
            preserveState: true,
            preserveScroll: true,

            onSuccess: () => {
                setAsientos((prev) =>
                    prev.map((a) =>
                        a.id === asientoSeleccionado.id
                            ? { ...a, estado: "Reservado" }
                            : a
                    )
                );

                setShowFormularioSocio(false);
                setSocioData({ nombre: "", dni: "", numero_socio: "" });
            },
            onError: (errors) => {
                alert(errors.message || "Error al reservar");
            }
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
    const validarDNI = (dni) => {
        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        const dniRegex = /^(\d{8})([A-Z])$/i;

        const match = dni.match(dniRegex);
        if (!match) return false;

        const numero = parseInt(match[1], 10);
        const letra = match[2].toUpperCase();
        const letraCorrecta = letras[numero % 23];

        return letra === letraCorrecta;
    };

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/campogradas.png')",
                }}>
                <div className="container mx-auto p-6">
                    {/* Mensajes flash */}
                    {flash.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-400 rounded">
                            {flash.success}
                        </div>
                    )}

                    {flash.error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                            {flash.error}
                        </div>
                    )}

                    {flashLocal && (
                        <div
                            className={`mb-4 p-4 rounded border ${flashLocal.type === "error"
                                ? "bg-red-100 text-red-800 border-red-400"
                                : "bg-green-100 text-green-800 border-green-400"
                                }`}
                        >
                            {flashLocal.message}
                        </div>
                    )}

                    <h1 className="text-4xl font-bold mb-4 text-white">Venta de Abonos</h1>

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
                            <div
                                key={zona.id}
                                className="flex bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                            >
                                <button
                                    onClick={() => handleZonaClick(zona.id)}
                                    className="flex-1 text-left"
                                >
                                    {zona.nombre} - {zona.precio}€
                                </button>

                                <Link
                                    href={route("zonas.edit", zona.id)}
                                    className="px-2 hover:bg-yellow-500 rounded"
                                >
                                    Editar
                                </Link>

                                <button
                                    onClick={() => handleDelete(zona.id)}
                                    className="px-2 hover:bg-red-600 rounded"
                                >
                                    Borrar
                                </button>
                            </div>

                        ))}
                    </div>
                    {showFormularioSocio && (
                        <div className="my-4 p-4 border border-gray-300 bg-gray-700 rounded-md">
                            <h3 className="text-lg font-bold text-white mb-2">
                                Formulario de Socio
                            </h3>
                            <form onSubmit={handleSubmitSocio}>
                                <div className="mb-4">
                                    <label className="block font-medium text-white">
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
                                    <label className="block font-medium text-white">
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
                                    <label className="block font-medium text-white">
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
                                    onClick={() => {
                                        setShowFormularioSocio(false);
                                        setFlashLocal(null);
                                        setSocioData({ nombre: "", dni: "", numero_socio: "" });

                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                >
                                    Cancelar Reserva
                                </button>
                            </form>
                        </div>
                    )}
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
                                                        onClick={() => handleAsientoClick(asiento.id)}
                                                        disabled={asiento.estado !== "Libre"}
                                                        className="relative flex items-end justify-center text-[9px] font-bold text-white transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                                                        style={{
                                                            width: "28px",
                                                            height: "28px",
                                                            backgroundColor: asiento.estado === "Libre" ? "#22c55e" : "#ef4444",
                                                            borderRadius: "6px 6px 10px 10px",
                                                        }}
                                                    >
                                                        {/* respaldo */}
                                                        <div
                                                            className="absolute top-0 w-full h-3 rounded-t-md"
                                                            style={{
                                                                backgroundColor:
                                                                    asiento.estado === "Libre" ? "#16a34a" : "#dc2626",
                                                            }}
                                                        />

                                                        {/* número */}
                                                        <span className="relative z-10">{asiento.numero}</span>
                                                    </button>

                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div >
        </>
    );
}
