import Navigation from "@/Components/Navigation";
import { router, usePage } from "@inertiajs/react";
import React from "react";



export default function Show({ socio, asientos, filas, abono }) {

    const { auth, flash } = usePage().props;

    // Función para dividir los asientos en filas
    const dividirAsientosPorFilas = (asientos, filas) => {
        const ordenados = [...asientos].sort((a, b) => a.numero - b.numero);
        const resultado = [];
        const porFila = Math.ceil(ordenados.length / filas);

        for (let i = 0; i < filas; i++) {
            const inicio = i * porFila;
            const fin = inicio + porFila;
            resultado.push(ordenados.slice(inicio, fin));
        }

        return resultado;
    };

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/campogradas.png')",
                }}>
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
                <div className="container mx-auto p-6 pt-32">
                    <h1 className="text-4xl mb-4 text-white font-bold">Área del Socio</h1>

                    <div className="bg-white shadow rounded p-4 mb-4">
                        <p><strong>Nombre:</strong> {socio.nombre}</p>
                        <p><strong>Nº Socio:</strong> {socio.numero_socio}</p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded">
                        <h2 className="text-white font-semibold mb-4">
                            Tu asiento
                        </h2>
                        <p className="text-white mb-4">{socio.asiento ? `Zona: ${socio.asiento.zona.nombre}` : "Sin asiento asignado"}</p>

                        <div className="overflow-x-auto max-w-full space-y-[4px]">
                            {dividirAsientosPorFilas(asientos, filas).map((fila, index) => (
                                <div key={index} className="flex gap-[2px] items-center">
                                    {fila.map((asiento) => {
                                        const asientoSocio = asiento.id === socio.asiento_id;
                                        // determinar estado para el color
                                        const color =
                                            asientoSocio
                                                ? "blue"
                                                : asiento.estado === "Libre"
                                                    ? "green"
                                                    : "red";

                                        return (
                                            <div
                                                key={asiento.id}
                                                className=" flex-none relative flex items-end justify-center text-[9px] font-bold text-white"
                                                style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    backgroundColor: color,
                                                    borderRadius: "6px 6px 10px 10px",
                                                }}
                                            >

                                                <div
                                                    className="absolute top-0 w-full h-3 rounded-t-md"
                                                    style={{ backgroundColor: color }}
                                                />
                                                <span className="relative z-10">
                                                    {asiento.numero}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white shadow rounded p-4 mt-4">
                        <h2 className="font-semibold mb-2">Abono de temporada</h2>

                        {!abono?.pagado ? (
                            <>
                                <p className="text-red-600 font-semibold">
                                    Abono pendiente de pago
                                </p>

                                {auth?.user?.rol === "gestor" && (
                                    <button
                                        onClick={() => router.post(route("abonos.pagar", abono.id))}
                                        className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                    >
                                        Cobrar abono
                                    </button>
                                )}

                                <a
                                    href={route("abonos.paypal", abono.id)}
                                    className="m-3 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                >
                                    Pagar con PayPal
                                </a>
                            </>
                        ) : (
                            <>
                                <p className="text-green-600 mb-4 font-semibold">
                                    Abono pagado
                                </p>

                                <a
                                    href={route("abonos.pdf", abono.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white  px-3 py-2 rounded"
                                >
                                    Ver abono PDF
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
