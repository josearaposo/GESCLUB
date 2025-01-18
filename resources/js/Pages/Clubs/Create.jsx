import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Create() {
    const [nombre, setNombre] = useState('');
    const [estadio, setEstadio] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    const [contacto, setContacto] = useState('');
    const [web, setWeb] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [empleados, setEmpleados] = useState('');
    const [fundacion, setFundacion] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('estadio', estadio);
        formData.append('presupuesto', presupuesto);
        formData.append('contacto', contacto);
        formData.append('web', web);
        formData.append('direccion', direccion);
        formData.append('ciudad', ciudad);
        formData.append('pais', pais);
        formData.append('empleados', empleados);
        formData.append('fundacion', fundacion);
        formData.append('imagen', imagen);


        Inertia.post('/clubs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear Nuevo Club</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">

                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre del Club
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="estadio" className="block text-sm font-medium text-gray-700">
                        Estadio
                    </label>
                    <input
                        type="text"
                        id="estadio"
                        value={estadio}
                        onChange={(e) => setEstadio(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700">
                        Presupuesto
                    </label>
                    <input
                        type="number"
                        id="presupuesto"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(e.target.value)}
                        required
                        step="0.01"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="contacto" className="block text-sm font-medium text-gray-700">
                        Contacto
                    </label>
                    <input
                        type="text"
                        id="contacto"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="web" className="block text-sm font-medium text-gray-700">
                        Página Web
                    </label>
                    <input
                        type="url"
                        id="web"
                        value={web}
                        onChange={(e) => setWeb(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                        Dirección
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                        Ciudad
                    </label>
                    <input
                        type="text"
                        id="ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
                        País
                    </label>
                    <input
                        type="text"
                        id="pais"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="empleados" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="fundacion" className="block text-sm font-medium text-gray-700">
                        Año de Fundación
                    </label>
                    <input
                        type="date"
                        id="fundacion"
                        value={fundacion}
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

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

