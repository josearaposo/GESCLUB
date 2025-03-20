import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";

export default function Index({ clubs }) {
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Clubs</h1>

                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clubs.map((club) => (
                            <div
                                key={club.id}
                                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div className="flex flex-col items-center pb-6">
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
                                            href={route("equipos.index", { club: club.id })}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Scouting
                                        </Link>
                                        <Link
                                            href={route("estadios.index", { club: club.id })}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Abonados
                                        </Link>
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

