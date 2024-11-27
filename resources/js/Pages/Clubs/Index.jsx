import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";

export default function Index({ clubs }) {
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Clubs</h1>

                <div className="flex justify-end mb-4">
                    <Link
                        href={route("clubs.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Nuevo Club
                    </Link>
                </div>

                <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {clubs.map((club) => (
        <div key={club.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
                src={`/storage/${club.imagen}`}
                alt={`Imagen de ${club.nombre}`}
                className="w-full h-48 object-contain"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{club.nombre}</h2>
                <p className="text-gray-600 mt-2">Estadio: {club.estadio}</p>
                <p className="text-gray-600">Presupuesto: {club.presupuesto}</p>
                <p className="text-gray-600">Ciudad: {club.ciudad}</p>
                <p className="text-gray-600">Pais: {club.pais}</p>
                <div className="mt-4 flex justify-end">
                    <Link
                        href={route("clubs.show", club.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Entrar
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
