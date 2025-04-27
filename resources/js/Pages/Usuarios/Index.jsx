import { Link, usePage } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function InformadoresIndex({ informadores, club }) {
    const { auth, flash } = usePage().props;

    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6">
                {/* Mensajes Flash */}
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
                <h1 className="text-2xl font-bold mb-6">
                    Informadores de tu club
                </h1>

                {informadores.length === 0 ? (
                    <p className="text-gray-500">
                        No hay informadores registrados aún.
                    </p>
                ) : (
                    <div className="grid gap-4">
                        {informadores.map((informador) => (
                            <div
                                key={informador.id}
                                className="bg-white p-4 rounded-lg shadow border"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {informador.name}
                                </h2>
                                <p className="text-gray-600">
                                    {informador.email}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {auth.user.rol === "gestor" && (
                    <div className="mt-6">
                        <Link
                            href={route("usuarios.informador.create", {
                                club: club,
                            })}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Nuevo Informador
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
