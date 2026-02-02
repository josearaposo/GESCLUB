import React from "react";
import { useState } from "react";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { User, LogOut, } from "lucide-react";



export default function Navigation(user) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { club, auth } = usePage().props;
    const existeClub = club !== undefined && club !== null;
    const linkClubs = existeClub ? (
        <>
            <NavLink
                href={route("equipos.index")}
                active={route().current("equipos.index")}
            >
                Equipos
            </NavLink>

            <NavLink
                href={route("representantes.index", { club: club.id })}
                active={route().current("representantes.index")}
            >
                Representantes
            </NavLink>

            <NavLink
                href={route("divisiones.index")}
                active={route().current("divisiones.index")}
            >
                Divisiones
            </NavLink>
            {auth?.user?.rol === "gestor" && (
                <NavLink
                    href={route("usuarios.index", { club: club })}
                    active={route().current("usuarios.index")}
                >
                    Informadores
                </NavLink>
            )}

        </>
    ) : null;
    const linkClubsMovil = existeClub ? (
        <>
            <ResponsiveNavLink
                href={route("equipos.index")}
                active={route().current("equipos.index")}
            >
                Equipos
            </ResponsiveNavLink>

            <ResponsiveNavLink
                href={route("representantes.index", { club: club.id })}
                active={route().current("representantes.index")}
            >
                Representantes
            </ResponsiveNavLink>

            <ResponsiveNavLink
                href={route("divisiones.index")}
                active={route().current("divisiones.index")}
            >
                Divisiones
            </ResponsiveNavLink>

            {auth?.user?.rol === "gestor" && (
                <ResponsiveNavLink
                    href={route("usuarios.index", { club })}
                    active={route().current("usuarios.index")}
                >
                    Informadores
                </ResponsiveNavLink>
            )}
        </>
    ) : null;

    return (
        <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 w-full z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <img
                                    src="/imagenes/logo.svg"
                                    alt="Logo"
                                    className="h-[100px] object-contain"
                                />
                            </Link>
                        </div>

                        <div className="hidden md:flex space-x-8 md:-my-px md:ms-10">
                            <NavLink href={route("clubs.salir")}>Clubs</NavLink>
                            {linkClubs}
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:ms-6">
                        <div className="flex space-x-4">
                            <Link
                                href={route("profile.edit")}
                                className="block text-left px-4 py-2 border border-green-600 text-green-800 rounded
                       hover:bg-green-600 hover:text-white transition"
                            >
                                <User className="w-5 h-5" />
                            </Link>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="block text-left px-4 py-2 border border-green-600 text-green-800 rounded
                       hover:bg-green-600 hover:text-white transition"
                            >
                                <LogOut className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>


                    <div className="-me-2 flex items-center lg:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " lg:hidden"
                }

            >
                <div className="md:hidden pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("clubs.salir")}
                        active={route().current("clubs.index")}
                    >
                        Clubs
                    </ResponsiveNavLink>

                    {linkClubsMovil}
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Perfil de Usuario
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Cerrar Sesión
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
