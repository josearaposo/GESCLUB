import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navigation from "@/Components/Navigation";

export default function Edit({ posicion }) {
    const [nombre, setNombre] = useState(posicion.nombre);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/posiciones/${posicion.id}`, {nombre});
    };
    console.log(posicion.nombre);

    return (
        <>

            <Navigation />
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
                >
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Editar Posicion
                    </h2>

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
