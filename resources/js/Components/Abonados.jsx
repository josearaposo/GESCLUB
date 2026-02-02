export default function Abonados() {
    return (
        <section className="bg-[#f4f6ff] py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">

                <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
                    <img
                        src="/imagenes/club.jpg"
                        alt="Consistent components"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Texto */}
                <div>
                    <p className="text-sm uppercase font-semibold text-green-800 mb-2">Abonados</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Control de Club <br />
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Control de socios del club, venta de abonos con sus asientos y precios correspondientes.

                    </p>
                    <a
                        href="#"
                        className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded"
                    >
                        Registrarse
                    </a>
                </div>
            </div>
        </section>
    );
}
