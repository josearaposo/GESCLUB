import Navigation from "@/Components/Navigation";
import React from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

export default function CompararInformes({ informe1, informe2 }) {
    const grupos = {
        Técnicos: [
            "centros",
            "regates",
            "definicion",
            "primer_toque",
            "tiro_libre",
            "pase_largo",
            "pase",
            "penalti",
            "tecnica",
        ],
        Físicos: [
            "aereo",
            "larga_distancia",
            "aceleracion",
            "agilidad",
            "balence",
            "salto",
            "corpulencia",
            "cambio_ritmo",
            "resistencia",
        ],
        Mentales: [
            "agresion",
            "anticipacion",
            "compostura",
            "concentracion",
            "decisiones",
            "determinacion",
            "liderazgo",
            "sin_balon",
            "posicionamiento",
            "en_equipo",
            "vision",
            "marca",
            "tackling",
        ],
    };

    const convertirGrupo = (grupo) =>
        grupo.map((key) => ({
            atributo: key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
            informe1: informe1[key],
            informe2: informe2[key],
        }));

    return (
        <>
        <Navigation />
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Comparación de Informes</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(grupos).map(([titulo, grupo]) => (
                    <div
                        key={titulo}
                        className="p-4 border rounded shadow bg-white"
                    >
                        <h2 className="text-lg font-semibold mb-2 text-center">
                            {titulo}
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={convertirGrupo(grupo)}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="atributo" />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                                <Radar
                                    name={informe1.jugador.nombre}
                                    dataKey="informe1"
                                    stroke="#4ade80"
                                    fill="#4ade80"
                                    fillOpacity={0.4}
                                />
                                <Radar
                                    name={informe2.jugador.nombre}
                                    dataKey="informe2"
                                    stroke="#60a5fa"
                                    fill="#60a5fa"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-100 rounded shadow">
                <h2>Realizado por {informe1.user.name}</h2>
                    <h3 className="font-bold text-lg mb-2">
                        Pros {informe1.jugador.nombre}
                    </h3>
                    <p>{informe1.pros || "No especificados."}</p>
                    <h3 className="font-bold text-lg mt-4 mb-2">Contras</h3>
                    <p>{informe1.contras || "No especificados."}</p>
                </div>

                <div className="p-4 bg-blue-100 rounded shadow">
                    <h2>Realizado por {informe2.user.name}</h2>
                    <h3 className="font-bold text-lg mb-2">
                        Pros {informe2.jugador.nombre}
                    </h3>
                    <p>{informe2.pros || "No especificados."}</p>
                    <h3 className="font-bold text-lg mt-4 mb-2">Contras</h3>
                    <p>{informe2.contras || "No especificados."}</p>
                </div>
            </div>
        </div>
        </>
    );
}

