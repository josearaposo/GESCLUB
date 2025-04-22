import { Link, usePage } from "@inertiajs/react";

export default function NavBar() {
    const { auth } = usePage().props;

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md  mt-4 px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold text-green-600">
                    <Link href="/"><img src="/imagenes/logo.svg" alt="Logo" className="h-[100px] object-contain" />
                    </Link>
                </div>

                {/* Secciones de navegación */}
                <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/#inicio" className="hover:text-blue-600">Inicio</Link>
                    <Link href="/#servicios" className="hover:text-blue-600">Servicios</Link>
                    <Link href="/#acerca" className="hover:text-blue-600">Acerca</Link>
                    <Link href="/#contacto" className="hover:text-blue-600">Contacto</Link>
                </div>

                {/* Botones */}
                <div className="flex space-x-4">
                    {auth?.user ? (
                        <>
                            <Link
                                href={route("clubs.index")}
                                className="px-4 py-2 border border-green-600 text-green-800 rounded hover:bg-green-600 hover:text-white transition"
                            >
                                Clubs
                            </Link>
                            <Link
                                href={route("profile.edit")}
                                className="px-4 py-2 border border-green-600 text-green-800 rounded hover:bg-green-600 hover:text-white transition"
                            >
                                Perfil de Usuario
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-4 py-2 border border-green-600 text-green-800 rounded hover:bg-green-600 hover:text-white transition"
                            >
                                Cerrar Sesión
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Espacio para compensar la altura de la nav */}
            <div className="h-20"></div>
        </>
    );
}



