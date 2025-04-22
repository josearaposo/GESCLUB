export default function Hero() {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center text-white"
            style={{ backgroundImage: `url('/imagenes/fondo.jpg')` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Scouting Deportivo y <br /> Gestion de Abonados
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                    Gestion total de tu club, controla tus equipos, tus jugadores con informes detallados representantes y jugadores de otros equipos que estas siguiendo. Contro basico de los socios del club.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="#" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
                        Registrarse
                    </a>
                    <a href="#" className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded">
                        Información
                    </a>
                </div>
            </div>
        </section>
    );
}

