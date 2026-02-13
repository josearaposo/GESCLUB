import React, { useState } from "react";
import Navigation from "@/Components/Navigation";
import { Link, router } from "@inertiajs/react";

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
        router.put(`/clubs/${club.id}`, {
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

    // Obtener el año actual para validación del campo fundación
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/fondo.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Club</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >


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
                                    type="number"
                                    id="fundacion"
                                    value={fundacion}
                                    min={1900}
                                    max={currentYear}
                                    onChange={(e) => setFundacion(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
                                    Imagen del Club
                                </label>
                                <input
                                    type="file"
                                    id="imagen"
                                    onChange={(e) => setImagen(e.target.files[0])}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white font-medium py-2 px-4  m-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                >
                                    Actualizar
                                </button>

                                <Link
                                    href={route('clubs.destroy', club.id)}
                                    method="delete"
                                    as="button"
                                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600"
                                >
                                    Eliminar
                                </Link>
                            </div>
                            <div className="text-center">
                                <Link
                                    href={route("clubs.index", { club: club.id })}
                                    className=" bg-gray-700 text-white px-4 mt-4 py-2 rounded hover:bg-gray-800"
                                >
                                    Volver
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
