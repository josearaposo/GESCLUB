import React, { useState } from "react";
import Navigation from "@/Components/Navigation";
import { usePage, Link, router } from "@inertiajs/react";

export default function Index({ clubs, estado }) {
    const { flash, auth } = usePage().props;

    const handleRestore = (id) => {
        router.post(route("clubs.restore", id));
    };

    const [mostrarPagoClub, setMostrarPagoClub] = useState(false);

    return (
        <>
            <Navigation />

            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/fondo.jpg')",
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

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl sm:text-4xl font-bold text-white">Gestión de Clubs</h1>
                        {auth?.user?.rol === "gestor" && (
                            <button
                                onClick={() => setMostrarPagoClub(true)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Crear Club
                            </button>
                        )}
                    </div>

                    {clubs.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-md text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {estado === 'eliminados'
                                    ? 'No tienes ningún club eliminado'
                                    : '¡No tienes ningún club!'}
                            </h2>

                            {estado !== 'eliminados' && (
                                <p className="text-gray-600 mb-4">
                                    Para comenzar a crear tu club, realiza un pago único de{' '}
                                    <span className="font-bold text-purple-600">100.00€</span>.
                                </p>
                            )}
                        </div>
                    )}
                    {mostrarPagoClub && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
                                <h2 className="text-xl font-bold mb-3">
                                    Crear nuevo club
                                </h2>

                                <p className="text-gray-600 mb-4">
                                    Para poder crear tu nuevo club es neceario el pago unico de
                                    <span className="font-semibold"> 100 €</span>.
                                    <span> Cualquier duda sobre el pago, contacta con nosotros.</span>
                                </p>

                                <div className="flex justify-center gap-3">
                                    {/* Botón PayPal */}
                                    <a
                                        href={route("pago.club")}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Pagar con PayPal
                                    </a>

                                    {/* Cancelar */}
                                    <button
                                        onClick={() => setMostrarPagoClub(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clubs.map((club) => {
                                const isDeleted = !!club.deleted_at;

                                return (
                                    <div
                                        key={club.id}
                                        className={`relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white-700 ${isDeleted ? "opacity-60" : ""}`}
                                    >

                                        {!isDeleted && (auth?.user?.rol === "gestor" || auth?.user?.rol === "superadmin") && (
                                            <Link
                                                href={route("clubs.edit", club.id)}
                                                className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
                                                title="Editar club"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.414 2.586a2 2 0 010 2.828l-1.828 1.828-2.828-2.828 1.828-1.828a2 2 0 012.828 0zM2 13.586V17h3.414l9.9-9.9-2.828-2.828L2 13.586z" />
                                                </svg>
                                            </Link>
                                        )}

                                        <div className="flex flex-col items-center pb-6 pt-2 px-4">
                                            <img
                                                src={`/storage/${club.imagen}`}
                                                alt={`Imagen de ${club.nombre}`}
                                                className="w-full h-48 object-contain"
                                            />
                                            <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                                                {club.nombre} {isDeleted && "(Eliminado)"}
                                            </h5>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Estadio: {club.estadio}
                                            </span>

                                            <div className="flex mt-4 gap-2">
                                                {!isDeleted && (
                                                    <Link
                                                        href={route("equipos.index", { club: club.id })}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        {auth?.user?.rol === "socio" ? "Información" : "Scouting"}

                                                    </Link>
                                                )}
                                                {!isDeleted && (auth?.user?.rol === "gestor" || auth?.user?.rol === "superadmin") && (
                                                    <Link
                                                        href={route("estadios.index", { club: club.id })}
                                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                    >
                                                        Abonados
                                                    </Link>
                                                )}
                                                {isDeleted && (auth?.user?.rol === "gestor" || auth?.user?.rol === "superadmin") && (
                                                    <button
                                                        onClick={() => handleRestore(club.id)}
                                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                    >
                                                        Restaurar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 right-0">
                        {estado === 'activos' && (auth?.user?.rol === "gestor" || auth?.user?.rol === "superadmin") && (
                            <Link
                                href={route('clubs.index', { estado: 'eliminados' })}
                                className="px-4 py-2 rounded bg-red-600 text-white"
                            >
                                Ver eliminados
                            </Link>
                        )}

                        {estado === 'eliminados' && (
                            <Link
                                href={route('clubs.index', { estado: 'activos' })}
                                className="px-4 py-2 rounded bg-blue-600 text-white"
                            >
                                Ver activos
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

