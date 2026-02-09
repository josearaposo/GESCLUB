<?php

namespace App\Http\Controllers;

use App\Models\Abono;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Inertia\Inertia;

class PaypalController extends Controller
{
    public function createPayment(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();
        $provider->setAccessToken($token);

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('payment.success'),
                "cancel_url" => route('payment.cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "EUR",
                        "value" => "100.00",
                    ],
                    "description" => "Pago para crear un club",
                ]
            ]
        ]);

        if (isset($order['links'])) {
            foreach ($order['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return redirect()->away($link['href']);
                }
            }
        }

        return response()->json(['error' => 'No se pudo generar el enlace de pago']);
    }

    public function paymentSuccess(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();
        $provider->setAccessToken($token);

        $response = $provider->capturePaymentOrder($request->get('token'));

        if ($response['status'] === 'COMPLETED') {
            return redirect()->route('clubs.create');
        }

        return Inertia::render('Payment/Error', ['message' => 'El pago no se completó.']);
    }

    public function paymentCancel()
    {
        return redirect()->route('clubs.index');
    }

    public function pagarAbono(Abono $abono)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();
        $provider->setAccessToken($token);

        $order = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('abonos.paypal.success', $abono),
                "cancel_url" => route('abonos.paypal.cancel', $abono),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "EUR",
                        "value" => number_format($abono->importe, 2, '.', ''),
                    ],
                    "description" => "Abono temporada {$abono->temporada}",
                ]
            ]
        ]);

        foreach ($order['links'] ?? [] as $link) {
            if ($link['rel'] === 'approve') {
                return redirect()->away($link['href']);
            }
        }

        return back()->withErrors('No se pudo iniciar el pago.');
    }

    public function pagoAbonoSuccess(Request $request, Abono $abono)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();
        $provider->setAccessToken($token);

        $response = $provider->capturePaymentOrder($request->get('token'));

        if (($response['status'] ?? null) === 'COMPLETED') {
            $abono->marcarComoPagado();

            return redirect()
                ->route('socios.show', $abono->socio_id)
                ->with('success', 'Abono pagado correctamente.');
        }

        return redirect()
            ->route('socios.show', $abono->socio_id)
            ->withErrors('El pago no se completó.');
    }
    public function pagoAbonoCancel(Abono $abono)
    {
        return redirect()
            ->route('socios.show', $abono->socio_id)
            ->with('error', 'Pago cancelado.');
    }
}
