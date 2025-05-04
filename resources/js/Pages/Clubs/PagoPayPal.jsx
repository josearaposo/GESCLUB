import React from 'react';
import { Link } from '@inertiajs/react';

export default function PagoPayPal() {
    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Crear Club</h2>

            <p className="text-gray-600">
                Para comenzar el proceso de creación de un club, realiza un pago único de:
            </p>

            <div className="text-3xl font-bold text-green-600">100.00€ EUR</div>

            <p className="text-gray-500 text-sm">
                Este pago cubre los costes administrativos de registro del club, y te da derecho a la gestión completa.
            </p>

            <Link
                href={route('payment.club')}
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
            >
                Pagar con PayPal
            </Link>

            <Link
                href={route('clubs.index')}
                className="block text-sm text-gray-500 mt-4 hover:underline"
            >
                Cancelar
            </Link>
        </div>
    );
}

