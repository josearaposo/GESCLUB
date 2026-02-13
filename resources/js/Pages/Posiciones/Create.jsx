import React from "react";
import { useForm } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Create({ equipo }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: "",
        x: "",
        y: "",
        equipo_id: equipo.id,
        activo: true,
    });

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setData({ ...data, x: Math.round(x), y: Math.round(y) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posiciones.store'));
    };

    return (
        <>
            <Navigation />
            <div className="container mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold">Crear Nueva Posición</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Nombre</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="border rounded px-3 py-2 w-full"
                        />
                        {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Selecciona la posición en el campo</label>
                        <div
                            className="relative w-1/2 h-96  rounded cursor-crosshair"
                            onClick={handleClick}
                            style={{
                                backgroundImage: "url('/imagenes/campofutbol.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            {data.x && data.y && (
                                <div
                                    className="absolute w-4 h-4 bg-red-500 rounded-full"
                                    style={{
                                        left: `${data.x}%`,
                                        top: `${data.y}%`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Coordenadas: {data.x}%, {data.y}%</p>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={processing}
                    >
                        Crear
                    </button>
                </form>
            </div>
        </>
    );
}


