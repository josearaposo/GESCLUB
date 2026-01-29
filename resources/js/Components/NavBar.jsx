import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Building2, User, LogOut, Menu } from "lucide-react";

export default function NavBar() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md mt-4 px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-green-600">
                    <img
                        src="/imagenes/logo.svg"
                        alt="Logo"
                        className="h-[80px] object-contain"
                    />
                </Link>

                {/* SECCIONES (solo desktop) */}
                <div className="hidden lg:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/#inicio" className="hover:text-blue-600">Inicio</Link>
                    <Link href="/#servicios" className="hover:text-blue-600">Servicios</Link>
                    <Link href="/#acerca" className="hover:text-blue-600">Acerca</Link>
                    <Link href="/#contacto" className="hover:text-blue-600">Contacto</Link>
                </div>

                {/* BOTONES DESKTOP */}
                <div className="hidden lg:flex space-x-4">
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
                                <User className="w-5 h-5" />
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="px-4 py-2 border border-green-600 text-green-800 rounded hover:bg-green-600 hover:text-white transition"
                            >
                                <LogOut className="w-5 h-5" />
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

                {/* HAMBURGUESA (móvil + tablet) */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded hover:bg-gray-100"
                >
                    <Menu className="w-7 h-7" />
                </button>
            </nav>

            {/* MENÚ MÓVIL / TABLET */}
            {open && (
                <div className="fixed top-[120px] left-0 w-full bg-white shadow-md lg:hidden z-40">
                    <div className="flex flex-col p-4 space-y-3">
                        <Link href="/#inicio" onClick={() => setOpen(false)}>Inicio</Link>
                        <Link href="/#servicios" onClick={() => setOpen(false)}>Servicios</Link>
                        <Link href="/#acerca" onClick={() => setOpen(false)}>Acerca</Link>
                        <Link href="/#contacto" onClick={() => setOpen(false)}>Contacto</Link>

                        <hr />

                        {auth?.user ? (
                            <>
                                <Link href={route("clubs.index")} onClick={() => setOpen(false)}>Clubs</Link>
                                <Link href={route("profile.edit")} onClick={() => setOpen(false)}>Perfil de Usuario</Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    onClick={() => setOpen(false)}
                                >
                                    Cerrar Sesión
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route("login")} onClick={() => setOpen(false)}>Iniciar Sesión</Link>
                                <Link href={route("register")} onClick={() => setOpen(false)}>Registrarse</Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Spacer */}
            <div className="h-24"></div>
        </>
    );
}



