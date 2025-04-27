import { useForm } from "@inertiajs/react";
import Navigation from "@/Components/Navigation";

export default function CreateInformador({ club }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        club: club.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("usuarios.informador.store"));
    };

    return (
        <>
            <Navigation />

            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Crear Informador</h1>

                <form onSubmit={submit} className="space-y-4">
                <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Club
                        </label>
                        <input
                            type="text"
                            value={data.club}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.club && (
                            <div className="text-red-600">{errors.club}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.name && (
                            <div className="text-red-600">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.email && (
                            <div className="text-red-600">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.password && (
                            <div className="text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.password_confirmation && (
                            <div className="text-red-600">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Crear Informador
                    </button>
                </form>
            </div>
        </>
    );
}
