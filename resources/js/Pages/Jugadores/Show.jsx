import Navigation from "@/Components/Navigation";

export default function Show({ jugador, partidos }) {

    //minutos jugados en un partido
    const calcularMinutos = (partido) => {
        const jugador = partido.jugadores?.[0];
        if (!jugador) return 0;

        const rol = jugador.pivot?.rol;
        if (!rol) return 0;

        const estadisticas = partido.estadisticas ?? [];

        const cambio = estadisticas.find(
            (e) => e.tipo === 'cambio'
        );


        //TITULAR
        if (rol === 'titular') {
            // Si sale, juega hasta ese minuto
            if (cambio) {
                return Number(cambio.minuto);
            }

            // Si NO hay cambio, juega todo el partido
            return 90;
        }
        if (rol === 'suplente') {
            // Si entra, juega desde el minuto de entrada
            if (cambio) {
                return 90 - Number(cambio.minuto);
            }

            // Si no entra no juega nada
            return 0;
        }

        return 0;
    };


    return (
        <>
            <Navigation />

            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Partidos de {jugador.nombre}
                </h1>

                {partidos.length === 0 && (
                    <p className="text-gray-500">Este jugador no ha disputado partidos.</p>
                )}

                {partidos.map((partido) => {
                    const minutos = calcularMinutos(partido);

                    return (
                        <div key={partido.id} className="mb-6 p-4 border rounded">
                            <h2 className="font-semibold">
                                vs {partido.rival} · {new Date(partido.fecha).toLocaleDateString()}
                            </h2>

                            <p className="text-sm text-gray-600 mt-1">
                                ⏱ {minutos} minutos jugados
                            </p>

                            <ul className="mt-3 text-sm">
                                {partido.estadisticas.length === 0 && (
                                    <li className="italic text-gray-400">
                                        Sin estadísticas
                                    </li>
                                )}

                                {[...partido.estadisticas]
                                    .sort((a, b) => (a.minuto ?? 0) - (b.minuto ?? 0))
                                    .map((e) => (
                                        <li key={e.id}>
                                            {e.tipo}
                                            {e.minuto && ` (${e.minuto}')`}
                                        </li>
                                    ))}

                            </ul>
                        </div>
                    );
                })}


            </div>
        </>
    );
}
