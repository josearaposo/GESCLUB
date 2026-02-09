import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";
import { LucideAirVent } from "lucide-react";

export default function Show({ zona, asientos }) {
    const [asientoEditando, setAsientoEditando] = useState(null);
    const [buscar, setBuscar] = useState("");

    const [formData, setFormData] = useState({
        nombre: "",
        dni: "",
        numero_socio: "",
        asiento_id: "",
    });

    // Filtrar los asientos ocupados
    const ocupados = asientos.filter(a => a.socio);
    // Filtrar los asientos según la búsqueda
    const ocupadosFiltrados = ocupados.filter((asiento) => {
        const texto = buscar.toLowerCase();

        return (
            asiento.numero.toString().includes(texto) ||
            asiento.socio.nombre.toLowerCase().includes(texto) ||
            asiento.socio.dni.toLowerCase().includes(texto) ||
            asiento.socio.numero_socio.toString().includes(texto) ||
            asiento.socio.asiento_id.toString().includes(texto)
        );
    });



    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/campogradas.png')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-white">Listado de Abonados</h1>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, DNI, nº socio o asiento..."
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                            className="mb-4 w-full p-2 border rounded"
                        />

                        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                            <table className="min-w-[600px] table-auto w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border p-2">Asiento</th>
                                        <th className="border p-2">Nombre</th>
                                        <th className="border p-2">DNI</th>
                                        <th className="border p-2">Nº socio</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white rounded-lg">
                                    {ocupadosFiltrados.map(asiento => (
                                        <tr key={asiento.id}
                                            className="hover:bg-gray-200 ">
                                            <td className="border p-2 text-center">{asiento.numero}</td>
                                            <td className="border p-2 ">{asiento.socio.nombre}</td>
                                            <td className="border p-2 text-center">{asiento.socio.dni}</td>
                                            <td className="border p-2 text-center">{asiento.socio.numero_socio}</td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => {
                                                        router.visit(route("socios.show", asiento.socio.id));
                                                    }}
                                                    className="bg-green-600 text-white px-2 rounded mr-2"
                                                >
                                                    Gestionar
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setAsientoEditando(asiento);
                                                        setFormData({
                                                            nombre: asiento.socio.nombre,
                                                            dni: asiento.socio.dni,
                                                            numero_socio: asiento.socio.numero_socio,
                                                            asiento_id: asiento.id,
                                                        });
                                                    }}
                                                    className="bg-blue-500 text-white px-2 rounded"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => {

                                                        router.delete(route("socios.destroy", asiento.socio.id), {
                                                            preserveScroll: true,
                                                            onSuccess: () => {
                                                                router.reload({ only: ["asientos"] });
                                                                setAsientoEditando(false);
                                                            },


                                                        });
                                                    }
                                                    }
                                                    className="bg-red-500 text-white px-2 rounded ml-2"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {asientoEditando && (
                        <div className="p-4 mt-4 border rounded bg-gray-100">
                            <h3 className="font-bold mb-4">
                                Editar socio con asiento: {asientoEditando.numero}
                            </h3>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    router.put(
                                        route("socios.update", asientoEditando.socio.id),
                                        formData,
                                        {
                                            onSuccess: () => setAsientoEditando(null),
                                        }
                                    );
                                }}
                                className="space-y-4"
                            >
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={(e) =>
                                        setFormData({ ...formData, nombre: e.target.value })
                                    }
                                />

                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="DNI"
                                    value={formData.dni}
                                    onChange={(e) =>
                                        setFormData({ ...formData, dni: e.target.value })
                                    }
                                />
                                <label
                                    htmlFor="nombre"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Numero de socio:
                                </label>
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="Número de socio"
                                    value={formData.numero_socio}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            numero_socio: e.target.value,
                                        })
                                    }
                                />
                                <label htmlFor="asiento_id" className="block text-gray-700 text-sm font-bold mb-2">
                                    Asiento:
                                </label>
                                <input
                                    className="w-full p-2 border rounded"
                                    value={formData.asiento_id}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            asiento_id: e.target.value,
                                        })
                                    }
                                />

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Guardar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setAsientoEditando(null)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>

                    )}
                    <div>
                        <Link
                            href={route("zonas.index", { estadio: zona.estadio_id })}
                            className="inline-block bg-white text-gray-800 px-4 py-2 mt-4 rounded hover:bg-gray-300"                        >
                            Volver
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
}

