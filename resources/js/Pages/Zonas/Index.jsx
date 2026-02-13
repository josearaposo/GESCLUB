import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Index({ zonas, estadio, numero_socio }) {

    const { flash } = usePage().props;
    const [controlFormulario, setControlFormulario] = useState(null);
    const [seleccionZona, setSeleccionZona] = useState(null);
    const [asientos, setAsientos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mostrarFormularioSocio, setMostrarFormularioSocio] = useState(false);
    const [socioDatos, setSocioDatos] = useState({
        nombre: "",
        dni: "",
        email: "",
        numero_socio: numero_socio,
    });
    const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);

    useEffect(() => {
        if (flash?.zona_actualizada) {
            handleZonaClick(flash.zona_actualizada);
        }
    }, [flash]);

    // Eliminar zona
    const handleDelete = (id) => {
        router.delete(route("zonas.destroy", id), {
            onSuccess: () => {
                setSeleccionZona(null);
                setAsientos([]);
            }
        });
    };
    // Cargar asientos de la zona seleccionada
    const handleZonaClick = (zonaId) => {
        const zona = zonas.find((z) => z.id === zonaId);
        setSeleccionZona(zona);
        setLoading(true);
        // Fetch asientos
        fetch(`/zonas/${zonaId}/asientos`, {
            cache: "no-store",
        })
            .then((response) => response.json())
            .then((data) => {
                const ordenados = [...data].sort((a, b) => a.numero - b.numero);
                setAsientos(ordenados);
            })
            .catch(() => alert("Error al cargar asientos"))
            .finally(() => setLoading(false));
    };
    // Manejar click en asiento
    const handleAsientoClick = (asientoId) => {
        const asiento = asientos.find((a) => a.id === asientoId);
        if (asiento.estado === "Libre") {
            setControlFormulario(null);
            setAsientoSeleccionado(asiento);
            setMostrarFormularioSocio(true);
        }
    };

    // Manejar cambios en el formulario de socio
    const handleFormularioChange = (e) => {
        const { name, value } = e.target;
        setSocioDatos((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Manejar envío del formulario de socio
    const handleSubmitSocio = (e) => {
        e.preventDefault();
        // Validaciones
        if (!socioDatos.nombre || !socioDatos.dni || !socioDatos.email || !socioDatos.numero_socio) {
            setControlFormulario({
                type: "error",
                message: "Completa todos los campos",
            });
            return;
        }
        if (!validarDNI(socioDatos.dni)) {
            setControlFormulario({
                type: "error",
                message: "El DNI no es válido",
            });
            return;
        }
        setControlFormulario(null);
        // Enviar datos
        router.post("/reservar", {
            asiento_id: asientoSeleccionado.id,
            estadio: estadio,
            nombre: socioDatos.nombre,
            dni: socioDatos.dni,
            email: socioDatos.email,
            numero_socio: socioDatos.numero_socio,
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

                setMostrarFormularioSocio(false);
                setSocioDatos({ nombre: "", dni: "", email: "", numero_socio: socioDatos.numero_socio + 1 });
            },
            onError: (errors) => {
                setControlFormulario({
                    type: "error",
                    message: errors.dni || errors.email || errors.numero_socio || "Error en el formulario",
                });
            }
        });
    };
    // Dividir asientos en filas
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
    // Validar DNI
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
                <div className="container mx-auto p-6 pt-32">
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



                    <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-white">Venta de Abonos</h1>

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
                                className="bg-blue-500 text-white font-bold rounded m-2 p-3"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                    {/* Botón zona */}
                                    <button
                                        onClick={() => handleZonaClick(zona.id)}
                                        className="text-left text-sm sm:text-base"
                                    >
                                        {zona.nombre} - {zona.precio}€ - {zona.libres_count} Libres
                                    </button>

                                    {/* Acciones */}
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <Link
                                            href={route("zonas.show", zona.id)}
                                            className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded"
                                        >
                                            Socios
                                        </Link>

                                        <Link
                                            href={route("zonas.edit", zona.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            onClick={() => {
                                                handleDelete(zona.id);
                                                setMostrarFormularioSocio(false);
                                                setControlFormulario(null);
                                            }}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {mostrarFormularioSocio && (
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
                                        value={socioDatos.nombre}
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
                                        value={socioDatos.dni}
                                        onChange={handleFormularioChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={socioDatos.email}
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
                                        value={socioDatos.numero_socio}
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
                                        setMostrarFormularioSocio(false);
                                        setControlFormulario(null);
                                        setSocioDatos({ nombre: "", dni: "", email: "", numero_socio: socioDatos.numero_socio });

                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                >
                                    Cancelar Reserva
                                </button>
                                {controlFormulario && (
                                    <div
                                        className={`mb-4 p-4 mt-4 rounded border ${controlFormulario.type === "error"
                                            ? "bg-red-100 text-red-800 border-red-400"
                                            : "bg-green-100 text-green-800 border-green-400"
                                            }`}
                                    >
                                        {controlFormulario.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                    {seleccionZona && (
                        <div className="asientos my-4">
                            <h2 className="text-xl bg-slate-400 rounded font-bold mb-2 text-white">
                                Asientos en zona: {seleccionZona.nombre}
                            </h2>

                            {loading ? (
                                <p>Cargando asientos...</p>
                            ) : (
                                <div className="overflow-x-auto max-w-full space-y-[4px]">
                                    {dividirAsientosPorFilas(
                                        asientos,
                                        seleccionZona.filas
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
                                                            backgroundColor: asiento.estado === "Libre" ? "green" : "red",
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

                    <div className="mt-8">
                        <Link
                            href={route("estadios.index", {
                                club: estadio.id,

                            })}
                            className="inline-block bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Volver
                        </Link>
                    </div>
                </div>

            </div >
        </>
    );
}
