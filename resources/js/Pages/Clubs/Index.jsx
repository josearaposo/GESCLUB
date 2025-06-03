import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";
import { usePage } from "@inertiajs/react";

export default function Index({ clubs }) {
    const { flash, auth } = usePage().props;
    return (
        <>
            <Navigation />
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
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Gestión de Clubs</h1>
                    {auth?.user?.rol === "gestor" && (
                        <Link
                            href={route("payment.club")}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Crear Club
                        </Link>
                    )}
                </div>
                {clubs.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-md text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            ¡Aún no has creado ningún club!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Para comenzar a crear tu club, realiza un pago único
                            de{" "}
                            <span className="font-bold text-purple-600">
                                100.00€
                            </span>
                            .
                        </p>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clubs.map((club) => (
                            <div
                                key={club.id}
                                className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <Link
                                    href={route("clubs.edit", club.id)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
                                    title="Editar club"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M17.414 2.586a2 2 0 010 2.828l-1.828 1.828-2.828-2.828 1.828-1.828a2 2 0 012.828 0zM2 13.586V17h3.414l9.9-9.9-2.828-2.828L2 13.586z" />
                                    </svg>
                                </Link>

                                <div className="flex flex-col items-center pb-6 pt-2 px-4">
                                    <img
                                        src={`/storage/${club.imagen}`}
                                        alt={`Imagen de ${club.nombre}`}
                                        className="w-full h-48 object-contain"
                                    />
                                    <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                                        {club.nombre}
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Estadio: {club.estadio}
                                    </span>
                                    <div className="flex mt-4 gap-2">
                                        <Link
                                            href={route("equipos.index", {
                                                club: club.id,
                                            })}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Scouting
                                        </Link>
                                        {auth?.user?.rol === "gestor" && (
                                            <Link
                                                href={route("estadios.index", {
                                                    club: club.id,
                                                })}
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Abonados
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
