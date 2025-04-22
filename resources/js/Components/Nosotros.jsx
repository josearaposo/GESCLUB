export default function Nosotros() {
    const posts = [
        {
            id: 1,
            title: "Equipos",
            description: "Learn how to build pages with Titan Core components",
            tag: "#themeusage",
            image: "/imagenes/club.jpg"
        },
        {
            id: 2,
            title: "Jugadores",
            description: "Learn how to edit posts in Astro",
            tag: "#themeusage",
            image: "/imagenes/informes.jpg"
        },
        {
            id: 3,
            title: "Representantes",
            description: "Learn how to add/remove categories",
            tag: "#themeusage",
            image: "/imagenes/representantes.png"
        },
        {
            id: 4,
            title: "Informes",
            description: "Learn how to build pages with Titan Core components",
            tag: "#themeusage",
            image: "/imagenes/club.jpg"
        },
        {
            id: 5,
            title: "Socios",
            description: "Learn how to edit posts in Astro",
            tag: "#themeusage",
            image: "/imagenes/informes.jpg"
        },
        {
            id: 6,
            title: "Empleados",
            description: "Learn how to add/remove categories",
            tag: "#themeusage",
            image: "/imagenes/representantes.png"
        }
    ];

    return (
        <section className= "py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado */}
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase text-green-800 mb-2">posibilidades</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todo lo que puedes hacer</h2>

                </div>

                {/* Grid de posts */}
                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm transition hover:shadow-md">
                            <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mt-1">{post.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                                <p className="text-sm text-green-600 mt-2">{post.tag}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
