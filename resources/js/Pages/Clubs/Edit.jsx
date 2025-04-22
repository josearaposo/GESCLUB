import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navigation from "@/Components/Navigation";
import { Link } from "@inertiajs/react";

export default function Edit({ club }) {
    const [nombre, setNombre] = useState(club.nombre);
    const [imagen, setImagen] = useState(club.imagen);
    const [estadio, setEstadio] = useState(club.estadio);
    const [presupuesto, setPresupuesto] = useState(club.presupuesto);
    const [contacto, setContacto] = useState(club.contacto);
    const [web, setWeb] = useState(club.web);
    const [direccion, setDireccion] = useState(club.direccion);
    const [ciudad, setCiudad] = useState(club.ciudad);
    const [pais, setPais] = useState(club.pais);
    const [empleados, setEmpleados] = useState(club.empleados);
    const [fundacion, setFundacion] = useState(club.fundacion);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/clubs/${club.id}`, {
            nombre,
            imagen,
            estadio,
            presupuesto,
            contacto,
            web,
            direccion,
            ciudad,
            pais,
            empleados,
            fundacion,
        });
    };

    return (
        <>
            <Navigation />
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
                >
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Editar Club
                    </h2>
                                    <Link
                                        href={route('clubs.destroy', club.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </Link>
                    <div className="mb-4">
                        <label
                            htmlFor="nombre"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="estadio"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Estadio:
                        </label>
                        <input
                            type="text"
                            id="estadio"
                            name="estadio"
                            value={estadio}
                            onChange={(e) => setEstadio(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="presupuesto"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Presupuesto:
                        </label>
                        <input
                            type="number"
                            id="presupuesto"
                            name="presupuesto"
                            value={presupuesto}
                            onChange={(e) => setPresupuesto(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="contacto"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Contacto:
                        </label>
                        <input
                            type="text"
                            id="contacto"
                            name="contacto"
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="web"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Web:
                        </label>
                        <input
                            type="url"
                            id="web"
                            name="web"
                            value={web}
                            onChange={(e) => setWeb(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="direccion"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Dirección:
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="ciudad"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Ciudad:
                        </label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="pais"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            País:
                        </label>
                        <input
                            type="text"
                            id="pais"
                            name="pais"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                            required
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="empleados"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Número de Empleados
                        </label>
                        <input
                            type="number"
                            id="empleados"
                            value={empleados}
                            onChange={(e) => setEmpleados(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="fundacion"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Fundacion
                        </label>
                        <input
                            type="date"
                            id="fundacion"
                            value={fundacion}
                            onChange={(e) => setFundacion(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
