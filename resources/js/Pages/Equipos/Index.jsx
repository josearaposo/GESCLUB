import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navigation from "@/Components/Navigation";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ equipos }) {
    return (
        <>
            <Navigation />
            <div className=" ml-40">
                <h1>Lista de Equipos</h1>

                {/* Botón para crear un nuevo equipo */}
                <Link
                    href={route("equipos.create")}
                    className="btn btn-primary mb-4 bg-slate-400"
                >
                    Crear Nuevo Equipo
                </Link>

                {/* Lista de Equipos */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre del Equipo</th>
                            <th>División</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.length > 0 ? (
                            equipos.map((equipo) => (
                                <tr key={equipo.id}>
                                    <td>{equipo.nombre}</td>
                                    <td>{equipo.division.nombre}</td>
                                    <td>
                                        {/* Botón para ver los detalles del equipo */}
                                        <Link
                                            href={route(
                                                "equipos.show",
                                                equipo.id
                                            )}
                                            className="btn btn-info btn-sm mr-2"
                                        >
                                            Ver
                                        </Link>

                                        {/* Botón para editar el equipo */}
                                        <Link
                                            href={route(
                                                "equipos.edit",
                                                equipo.id
                                            )}
                                            className="btn btn-warning btn-sm mr-2"
                                        >
                                            Editar
                                        </Link>

                                        {/* Botón para eliminar el equipo */}
                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        "¿Estás seguro de que deseas eliminar este equipo?"
                                                    )
                                                ) {
                                                    // Enviar solicitud de eliminación
                                                    Inertia.delete(
                                                        route(
                                                            "equipos.destroy",
                                                            equipo.id
                                                        )
                                                    );
                                                }
                                            }}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No hay equipos registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
