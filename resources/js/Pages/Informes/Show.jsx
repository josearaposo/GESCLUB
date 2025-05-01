import React from "react";
import { usePage } from "@inertiajs/react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
//Integracion de rechards en laravel para las graficas

export default function Show({ informe }) {
    const { jugador } = usePage().props;


    const tecnicos = [
        "centros", "regates", "definicion", "primer_toque", "tiro_libre", "pase_largo", "pase", "penalti", "tecnica"
    ];
    const fisicos = [
        "aereo", "larga_distancia", "aceleracion", "agilidad", "balence", "salto", "corpulencia", "cambio_ritmo", "resistencia"
    ];
    const mentales = [
        "agresion", "anticipacion", "compostura", "concentracion", "decisiones", "determinacion", "liderazgo", "sin_balon", "posicionamiento", "en_equipo", "vision", "marca", "tackling"
    ];

    const convertirGrupo = (grupo) =>
        grupo.map(key => ({
            atributo: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            valor: informe[key]
        }));

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Informe de {jugador.nombre}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[["Técnicos", tecnicos], ["Físicos", fisicos], ["Mentales", mentales]].map(([titulo, grupo]) => (
                    <div key={titulo} className="p-4 border rounded shadow bg-white">
                        <h2 className="text-lg font-semibold mb-2 text-center">{titulo}</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={convertirGrupo(grupo, titulo)}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="atributo" />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                                <Radar name={titulo} dataKey="valor" stroke="#4ade80" fill="#4ade80" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-bold mb-2">Pros</h3>
                <p>{informe.pros || "No especificados."}</p>
                <h3 className="text-lg font-bold mt-4 mb-2">Contras</h3>
                <p>{informe.contras || "No especificados."}</p>
            </div>
        </div>
    );
}
