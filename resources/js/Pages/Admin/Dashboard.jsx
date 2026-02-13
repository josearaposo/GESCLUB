import React, { useState } from "react";
import { router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function Dashboard({ clubs, users }) {
    const [buscar, setBuscar] = useState("");
    const [clubSeleccionado, setClubSeleccionado] = useState("");
    const [rolSeleccionado, setRolSeleccionado] = useState("");

    const totalClubs = clubs.length;
    const totalUsers = users.length;
    const activosUsers = users.filter(u => u.activo).length;
    const bloqueadosUsers = users.filter(u => !u.activo).length;

    const cambiarEstadoUser = (user) => {
        router.put(route('admin.dashboard.cambiar', user.id));
    };


    const eliminarUser = (id) => {
        router.delete(route("usuarios.destroy", id), {
            preserveScroll: true,
        });
    };

    const usersFiltrados = users.filter((user) => {
        const texto = buscar.toLowerCase();

        const coincideTexto =
            user.name.toLowerCase().includes(texto) ||
            user.email.toLowerCase().includes(texto);

        const coincideClub =
            !clubSeleccionado ||
            (user.clubes || []).some(c => c.id == clubSeleccionado);

        const coincideRol =
            !rolSeleccionado ||
            user.rol?.toLowerCase() === rolSeleccionado.toLowerCase();

        return coincideTexto && coincideClub && coincideRol;
    });
    // Obtener clubes únicos sin repetir
    const clubesUnicos = [
        ...new Map(
            users.flatMap(u => u.clubes || []).map(c => [c.id, c])
        ).values()
    ];

    const rolesUnicos = ["Gestor", "Informador", "Socio"];

    return (
        <>
            <Navigation />
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imagenes/administracion.jpg')",
                }}>
                <div className="container mx-auto p-6 pt-32">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-bold mb-4  sm:text-white">Panel Administrador</h1>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

                            <Control title="Usuarios" value={totalUsers} />
                            <Control title="Activos" value={activosUsers} />
                            <Control title="Bloqueados" value={bloqueadosUsers} />
                            <Control title="Clubes" value={totalClubs} />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            {/* Filtro por club */}
                            <select
                                value={clubSeleccionado}
                                onChange={(e) => setClubSeleccionado(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Todos los clubes</option>
                                {clubesUnicos.map(club => (
                                    <option key={club.id} value={club.id}>
                                        {club.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* Filtro por rol */}
                            <select
                                value={rolSeleccionado}
                                onChange={(e) => setRolSeleccionado(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Todos los roles</option>
                                {rolesUnicos.map(rol => (
                                    <option key={rol} value={rol}>
                                        {rol}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <input
                            type="text"
                            placeholder="Buscar por nombre o email"
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                            className="mb-4 w-full border rounded"
                        />

                        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                            <table className="w-full text-left table-auto min-w-max">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2">Nombre</th>
                                        <th className="p-2">Clubes</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2">Rol</th>
                                        <th className="p-2">Estado</th>
                                        <th className="p-2">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white rounded-lg">
                                    {usersFiltrados.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-200 ">
                                            <td className=" border p-2">{user.name}</td>
                                            <td className=" border p-2">
                                                {user.clubes && user.clubes.length > 0
                                                    ? user.clubes.map(c => c.nombre).join(", ")
                                                    : "Sin clubes"}
                                            </td>
                                            <td className="border p-2 text-center">{user.email}</td>
                                            <td className=" border p-2 capitalize text-center">{user.rol}</td>
                                            <td className=" border p-2 text-center">
                                                <span
                                                    className={`px-2 py-1 rounded font-bold ${user.activo ? 'text-green-600' : 'text-red-600'
                                                        }`}
                                                >
                                                    {user.activo ? 'Activo' : 'Bloqueado'}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => cambiarEstadoUser(user)}
                                                    className={`px-3 py-1 rounded text-white ${user.activo ? 'bg-red-500' : 'bg-green-500'
                                                        }`}
                                                >
                                                    {user.activo ? 'Bloquear' : 'Activar'}
                                                </button>
                                                {user.rol === 'gestor' && (
                                                    <button
                                                        onClick={() => eliminarUser(user.id)}
                                                        disabled={!user.activo}
                                                        title="Eliminar clubes asociados y desactivar usuario"
                                                        className={`px-3 py-1 rounded ml-2 text-white ${user.activo
                                                            ? "bg-gray-800 hover:bg-black"
                                                            : "bg-gray-400 cursor-not-allowed"
                                                            }`}
                                                    >
                                                        Eliminar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {users.length === 0 && (
                                <div className="p-4 text-center text-gray-500">
                                    No hay usuarios
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

function Control({ title, value }) {
    return (
        <div className="bg-white shadow rounded p-4">
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}

